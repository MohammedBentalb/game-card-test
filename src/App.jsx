import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import Winner from './components/Winner'

const cardImages = [
  {src: '../img/helmet-1.png', matched : false},
  {src: '../img/potion-1.png', matched : false},
  {src: '../img/ring-1.png', matched : false},
  {src: '../img/scroll-1.png', matched : false},
  {src: '../img/shield-1.png', matched : false},
  {src: '../img/sword-1.png', matched : false},
]

function App() {
  
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null) 
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [winner, setWinner] = useState(false)
  const [bodyOverflow, setBodyOverflow] = useState('auto')
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}))


    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setCards(shuffled)
  }
  
  const handleClick= (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  const resetCards = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns(prev => prev + 1)
  }

  const winnerFunction = () => {
    shuffleCards()
    setWinner(false)
    setBodyOverflow('auto')
  }

useEffect(()=> {
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
      setCards(card => 
        card.map( item => { if(item.src === choiceOne.src){
          return {...item, matched: true}
        }
        return item
      }
      ))
      resetCards()
      console.log("Cards matched")
    } else{
      setTimeout(() => {
        resetCards()
      }, 1000)
      console.log("Cards did not matched")
    }
  }      
},[choiceOne, choiceTwo])




useEffect(()=>{
  shuffleCards()
},[])

useEffect(() => {
  let matchedCount = 0;

  for (const card of cards) {
    if (card.matched) {
      matchedCount++;
    }
  }
  
  if (matchedCount === cards.length && matchedCount > 0) {
    setTimeout(()=>{
      setWinner(true)
      setBodyOverflow('hidden')
    }, 500)
  }
}, [cards]);

    return (
    <>
    <div className="App">
    <h1>Magic Match</h1>
    <button onClick={shuffleCards}>New Game</button>
    <div className='cardGrid'>
        {
          cards.map( card => (
            <Card key={card.id} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            card={card} 
            handleClick={handleClick}
            disabled={disabled} 
            />
          ))
        }
      </div>

      <h4 className='turns'>{`Turns: ${turns}`}</h4>
  </div>
  { winner && <Winner winner={winnerFunction} /> }
  <style>
      {`
        body {
          overflow: ${bodyOverflow};
        }
      `}
    </style>
    </>
  )
}

export default App
