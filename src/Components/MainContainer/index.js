import './index.css'

const MainContainer = props => {
  const {
    choicesList,
    selectChoice,
    showResult,
    playAgain,
    selectedChoiceId,
    opponentsChoiceId,

    result,
  } = props

  const renderSelectedChoice = id =>
    choicesList.filter(eachItem => eachItem.id === id)[0]

  const onSelectChoice = event => {
    selectChoice(event.target.id)
  }

  const onPlayAgain = () => {
    playAgain()
  }

  let resultStatement
  switch (result) {
    case 'WON':
      resultStatement = 'YOU WON'

      break
    case 'LOSE':
      resultStatement = 'YOU LOSE'
      break

    default:
      resultStatement = 'IT IS DRAW'
      break
  }

  return (
    <>
      {showResult ? (
        <div className="result-container">
          <ul className="players-choices-list">
            <li className="choice-item">
              <p className="name">YOU</p>
              <img
                alt="your choice"
                src={renderSelectedChoice(selectedChoiceId).imageUrl}
                className="choice-img"
              />
            </li>
            <li className="choice-item">
              <p className="name">OPPONENT</p>
              <img
                alt="opponent choice"
                src={renderSelectedChoice(opponentsChoiceId).imageUrl}
                className="choice-img"
              />
            </li>
          </ul>
          <p className="result">{resultStatement}</p>
          <button
            type="button"
            className="play-again-button"
            onClick={onPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      ) : (
        <div className="choices-container">
          <button
            type="button"
            className="choice-button"
            id={choicesList[0].id}
            onClick={onSelectChoice}
            data-testid="rockButton"
          >
            <img
              alt={choicesList[0].id}
              src={choicesList[0].imageUrl}
              className="choice-img"
              data-testid="paperButton"
            />
          </button>
          <button
            type="button"
            className="choice-button"
            id={choicesList[1].id}
            onClick={onSelectChoice}
            data-testid="scissorsButton"
          >
            <img
              alt={choicesList[1].id}
              src={choicesList[1].imageUrl}
              className="choice-img"
            />
          </button>
          <button
            type="button"
            className="choice-button"
            id={choicesList[2].id}
            onClick={onSelectChoice}
          >
            <img
              alt={choicesList[2].id}
              src={choicesList[2].imageUrl}
              className="choice-img"
            />
          </button>
        </div>
      )}
    </>
  )
}

export default MainContainer
