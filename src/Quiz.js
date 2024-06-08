import React, { useEffect, useState } from 'react'
import './Quiz.css'
import { listQuestionModels }from './graphql/queries'
import { generateClient } from '@aws-amplify/api'
import { fetchUserAttributes } from 'aws-amplify/auth'
import * as mutations from './graphql/mutations'
import { useNavigate } from 'react-router-dom';


function Quiz({ resetQuizFlag, setResetQuizFlag }) {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(1);  //keeps track of the question that has to be displayed
  const [score, setScore] = useState(0);                      //sets the score
  const [showScore, setShowScore] = useState(false);          //it is set on true when all the quiz is finished and the score will be displayed
  const [stressLevel, setStressLevel] = useState(0);          //the final stress level (0,1,2)
  const [reversed, setReversed] = useState(false);            //if the question score has to be reversed
  const [dataLength, setDataLength] = useState(0);            //the number of question from the quiz
  const [email, setEmail] = useState('');                     //the email of the current user
  const [first, setFirst] = useState(true);                   //if we are on the first question of the quiz

  const resetQuiz = () => {
    console.log("here");
    setCurrentQuestion(1);
    setScore(0);
    setShowScore(false);
    setStressLevel(0);
    setReversed(false);
    setDataLength(0);
    setEmail('');
    setFirst(true);
  };

  useEffect(() => {
    if (resetQuizFlag) {
      resetQuiz();
      setResetQuizFlag(false);
      navigate('/');
    }
  }, [resetQuizFlag, setResetQuizFlag, navigate]);

  useEffect(() =>{
    const quiz = document.getElementById('quiz')
    const answerEls = document.querySelectorAll('.answer')
    const questionEl = document.getElementById('question')
    const a_text = document.getElementById('a_text')
    const b_text = document.getElementById('b_text')
    const c_text = document.getElementById('c_text')
    const d_text = document.getElementById('d_text')
    const e_text = document.getElementById('e_text')
    const submitBtn = document.getElementById('submit')

    if(!quiz || !submitBtn || !questionEl || !a_text || !b_text || !c_text || !d_text || !e_text){
      return;
    }

    //the function retrieves the email of the authenticated user
    async function getEmailFromUser() {
      try {
        const userAttributes = await fetchUserAttributes()
        setEmail(userAttributes?.email)
        console.log(email)
      } catch (error) {
        console.log(error)
      }
    }

    getEmailFromUser()

    //the function loads the quiz with the current question
    async function loadQuiz(){
      setFirst(false)
      deselectAnswers()

      const client = generateClient();

      const questionNumber = Number(currentQuestion);

      const result = await client.graphql({
        query: listQuestionModels,
        variables: {
          filter: {
            number: {
              eq: questionNumber
            }
          }
        }
      });
      
      const currentQuizData = result.data.listQuestionModels.items[0];
  
      questionEl.innerText = currentQuizData?.text
      a_text.innerText = currentQuizData?.a
      b_text.innerText = currentQuizData?.b
      c_text.innerText = currentQuizData?.c
      d_text.innerText = currentQuizData?.d
      e_text.innerText = currentQuizData?.e
      setReversed(currentQuizData?.reversed)
      setDataLength(11)
    }
    
    //deselect the question that was selected in the previous answer
    function deselectAnswers(){                               
      answerEls.forEach(answerEl => answerEl.checked = false)
    }
    
    //retrieves the answer that was chosen
    function getSelected(){
      let answer
      answerEls.forEach(answerEl => {
        if(answerEl.checked){
          answer = answerEl.id
        }
      })
      return answer
    }

    //adds the score of the current answer to the final score and sets the next question or sets the variable to print the score
    function handleSubmit(){
      const answer = getSelected()
      if (answer){
        if(reversed === false){
          setScore(score + Number(answer))
        }
        else{
          setScore(score + (4 - Number(answer)))
        }
        console.log(`the intermediate score is ${score} at the question ${currentQuestion}`)
        const nextQuestion = currentQuestion + 1
        if(nextQuestion < dataLength){
          setCurrentQuestion(nextQuestion)
        } 
        else {
          setShowScore(true);
        }
      }
    }

    submitBtn.addEventListener('click',handleSubmit)
    if(getSelected() || first)
      loadQuiz()

    return () => {
      submitBtn.removeEventListener('click', handleSubmit)
    }
  },[currentQuestion, score, dataLength, reversed, stressLevel, email, first]);

  //handle the last step, when the score is shown and the data will be saved in the database
  useEffect(() => {
    if(showScore) {

      console.log(`score ${score}`)
      if(score > 14){
        setStressLevel(1)
      }
      if(score > 27){
        setStressLevel(2)
      }

      function updateStressLevel(newLevel) {  //function to update the progress bar
        const progressBar = document.querySelector('.progress-bar');
        const progressLabel = document.querySelector('.progress-label');
        
        progressBar.className = 'progress-bar'; 
        
        if (newLevel === 0) {
            progressBar.classList.add('stress-level-0');
            progressLabel.textContent = 'No Stress';
        } else if (newLevel === 1) {
            progressBar.classList.add('stress-level-1');
            progressLabel.textContent = 'Low Stress';
        } else if (newLevel === 2) {
            progressBar.classList.add('stress-level-2');
            progressLabel.textContent = 'High Stress';
        }
      }
      updateStressLevel(stressLevel);

      const finishBtn = document.getElementById('finish');
      
      //saves the stess level in the database and reloads the page
      async function handleFinish(){
        const currentDateTime = new Date().toISOString();
        console.log(`handleFinish called at: ${currentDateTime}`)
        console.log(`the email of the user at: ${email}`)
        console.log(`the stress level of the quiz is: ${stressLevel}`)

        const client = generateClient()
        const scoreDetails = {
          email: email,
          score: stressLevel,
          time: currentDateTime
        }
        const newScore = await client.graphql({
          query: mutations.createScore,
          variables: {input: scoreDetails}
        })

        if(newScore){
          navigate('/results');
        }
        
      }

      if (finishBtn) {
        finishBtn.addEventListener('click', handleFinish)
      }

      return () => {
        if(finishBtn) {
          finishBtn.removeEventListener('click',handleFinish)
        }
      }
    }
  }, [showScore, email, stressLevel, score, navigate])
  

  return (
    <div className='quiz-container' id='quiz'>
      {showScore ? (
       <div className='quiz-header'>
         <h2>Your score is {score}. This means that you're level of stress is {stressLevel}/2.</h2>
         <div className="progress-bar-container">
            <div className="progress-bar stress-level-1"></div>
            <div className="progress-label">Low Stress</div>
         </div>
         <button id='finish'>Submit your score</button>
       </div>
      ):(
        <div className='quiz-header'>
        <h2 id='question'>Loading...</h2>
        <ul>
          <li>
            <input type='radio' name='answer' id='0' className='answer'/>
            <label htmlFor='a' id='a_text'></label>
          </li>

          <li>
            <input type='radio' name='answer' id='1' className='answer'/>
            <label htmlFor='b' id='b_text'></label>
          </li>

          <li>
            <input type='radio' name='answer' id='2' className='answer'/>
            <label htmlFor='c' id='c_text'></label>
          </li>

          <li>
            <input type='radio' name='answer' id='3' className='answer'/>
            <label htmlFor='d' id='d_text'></label>
          </li>

          <li>
            <input type='radio' name='answer' id='4' className='answer'/>
            <label htmlFor='e' id='e_text'></label>
          </li>

        </ul>
      </div>
      )}
        {!showScore && <button id='submit'>Submit</button>}
    </div>
  );
}

export default Quiz;