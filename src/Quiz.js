import React, { useEffect, useState } from 'react';
import './Quiz.css';
import { listQuestionModels }from './graphql/queries'
import { generateClient } from '@aws-amplify/api'


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [stressLevel, setStressLevel] = useState(0);
  const [reversed, setReversed] = useState(false);
  const [dataLength, setDataLength] = useState(0);


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

    async function loadQuiz(){
      deselectAnswers()

      const client = generateClient();

      console.log(currentQuestion)
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
      
      const currentQuizData = result.data.listQuestionModels.items[0]; // Assuming there's only one question with the number 7
      console.log(currentQuizData);

      //const currentQuizData = quizData[currentQuestion]
  
      questionEl.innerText = currentQuizData?.text
      a_text.innerText = currentQuizData?.a
      b_text.innerText = currentQuizData?.b
      c_text.innerText = currentQuizData?.c
      d_text.innerText = currentQuizData?.d
      e_text.innerText = currentQuizData?.e
      setReversed(currentQuizData?.reversed)
      setDataLength(10)
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
      console.log("Id is "+ answer)
      return answer
    }

    function handleSubmit(){
      const answer = getSelected()
      if (answer){
        if(reversed === false){
          setScore(prevScore => prevScore + Number(answer))
        }
        else{
          setScore(prevScore => prevScore + (4 - Number(answer)))
        }
          
        if(score > 14){
            setStressLevel(1)
        }
        if(score > 27){
            setStressLevel(2)
        }
      }
      const nextQuestion = currentQuestion + 1
      if(nextQuestion < dataLength){
        setCurrentQuestion(nextQuestion)
      } else {
        setShowScore(true);
      }
    }

    submitBtn.addEventListener('click',handleSubmit)
    loadQuiz()

    return () => {
      submitBtn.removeEventListener('click', handleSubmit)
    }
  },[currentQuestion, score, dataLength, reversed]);
  

  return (
    <div className='quiz-container' id='quiz'>
      {showScore ? (
       <div className='quiz-header'>
         <h2>You score is {score}. This means that you're level of stress is {stressLevel}.</h2>
         <button onClick={() => window.location.reload()}>Reload</button>
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