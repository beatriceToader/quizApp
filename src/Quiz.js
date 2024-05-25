import React, { useEffect, useState } from 'react'
import './Quiz.css'
import { listQuestionModels }from './graphql/queries'
import { generateClient } from '@aws-amplify/api'
import { fetchUserAttributes } from 'aws-amplify/auth'
import * as mutations from './graphql/mutations'


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [stressLevel, setStressLevel] = useState(0);
  const [reversed, setReversed] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [email, setEmail] = useState('');
  const [first, setFirst] = useState(true);

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

    async function loadQuiz(){
      setFirst(false)
      deselectAnswers()

      const client = generateClient();

      const questionNumber = Number(currentQuestion); // Define the question number you want to retrieve

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
  
    function deselectAnswers(){
      answerEls.forEach(answerEl => answerEl.checked = false)
    }
  
    function getSelected(){
      let answer
      answerEls.forEach(answerEl => {
        if(answerEl.checked){
          answer = answerEl.id
        }
      })
      return answer
    }

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
      }
      const nextQuestion = currentQuestion + 1
      if(nextQuestion < dataLength){
        setCurrentQuestion(nextQuestion)
      } 
      else {
        setShowScore(true);
      }
    }

    submitBtn.addEventListener('click',handleSubmit)
    if(getSelected() || first)
      loadQuiz()

    return () => {
      submitBtn.removeEventListener('click', handleSubmit)
    }
  },[currentQuestion, score, dataLength, reversed, stressLevel, email, first]);

  useEffect(() => {
    if(showScore) {

      console.log(`score ${score}`)
      if(score > 14){
        setStressLevel(1)
      }
      if(score > 27){
        setStressLevel(2)
      }

      const finishBtn = document.getElementById('finish');

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
          window.location.reload()
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
  }, [showScore, email, stressLevel, score])
  

  return (
    <div className='quiz-container' id='quiz'>
      {showScore ? (
       <div className='quiz-header'>
         <h2>Your score is {score}. This means that you're level of stress is {stressLevel}.</h2>
         <button id='finish'>Finish & Reload</button>
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