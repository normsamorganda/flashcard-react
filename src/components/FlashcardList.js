import React from 'react'
import Flashcard from './Flashcard'

const FlashcardList = ({flashCards}) => {
  return (
    <div className='card-grid'>

        {flashCards.map(flashcard => {
            return <Flashcard flashcard={flashcard} key={flashcard.id}/>
        })}
      
    </div>
  )
}

export default FlashcardList
