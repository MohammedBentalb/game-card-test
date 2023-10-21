export default function Winner({winner}) {
 
    return (
    <div className="container">
      <div className="winner">
        <img src="../../img/trophee.png" alt="winner" />
        <h2>Good joob champ</h2>
        <pre onClick={winner}>An other round ?</pre>
      </div>
    </div>
  )
}
