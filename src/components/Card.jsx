export default function Card({card, handleClick, flipped, disabled}) {
  
  const fire = (card) => {
   if(!disabled){
      handleClick(card)
    }
  }
  
  return (
    <div className="card">
         <div className={flipped ? "flipped" : ''}>
        <img src={card.src} alt="front card" className="front" />
        <img src='../../img/cover.png' alt="back card" className="back"  onClick={() => fire(card)}/>
         </div>
    </div>
  )
}

