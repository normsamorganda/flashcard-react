import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect , useRef } from 'react';
import FlashcardList from './components/FlashcardList';
import './App.css'
import axios from 'axios'
function App() {

  const [flashcards, setflasCards] = useState([]);
  const [categories, setCategories] = useState([])
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios
    .get('https:/opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories);
    })

  },[])






  // useEffect(() => {
  //   axios.get('https://opentdb.com/api.php?amount=10').then(res => {
     
  //   setflasCards(res.data.results.map((questionItem, index) => {
  //     const answer = deCode(questionItem.correct_answer);
  //       const options = [
  //         ...questionItem.incorrect_answers.map(a => deCode(a)),
  //         answer]
  //     return {
  //       id:`${index}-${Date.now()}`,
  //       question:deCode(questionItem.question),
  //       answer:answer,
  //       options:options.sort(() => Math.random()-5)
  //     }
  //   }))
  //   })
  // },[]) 

  const deCode = (str) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }


  const handleSubmit = (e) => {
e.preventDefault();
axios.get('https://opentdb.com/api.php', {
  params: {
    amount:amountEl.current.value,
    category:categoryEl.current.value

  }
}).then(res => {
     
setflasCards(res.data.results.map((questionItem, index) => {
  const answer = deCode(questionItem.correct_answer);
    const options = [
      ...questionItem.incorrect_answers.map(a => deCode(a)),
      answer]
  return {
    id:`${index}-${Date.now()}`,
    question:deCode(questionItem.question),
    answer:answer,
    options:options.sort(() => Math.random()-5)
  }
}))
})
  }

 


  return (
    <>
    <form className='header' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>

          {categories.map((category) => {
            return <option value={category.id} key={category.id}>{category.name}</option>
          })}
        </select>
        <div className='form-group'>
          <label htmlFor="amount">Number of questions</label>
            <input type='number'  
            id='amount' 
            min="1" step="1" 
            defaultValue={10}
            ref={amountEl}>
            </input>
        </div>
        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>

      </div>

    </form>
     <div className="container">
      <FlashcardList flashCards={flashcards}/>
    
    </div>
    </>
   
  );
}


export default App;
