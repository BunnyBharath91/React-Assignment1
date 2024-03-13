import {Component} from 'react'
import Popup from 'reactjs-popup'
import MainContainer from '../MainContainer'
// import {IoIosClose} from 'react-icons/io'

import './index.css'

class GameContainer extends Component {
  constructor(props) {
    super(props)
    const {choicesList} = this.props
    this.state = {
      score: 0,
      selectedChoiceId: choicesList[0].id,
      opponentsChoiceId: choicesList[Math.floor(Math.random() * 3)].id,
      showResult: false,
      finalResult: 'DRAW',
      popupOpen: false,
    }
  }

  updateScore = () => {
    const {selectedChoiceId, opponentsChoiceId} = this.state
    let result

    if (selectedChoiceId === 'ROCK') {
      if (opponentsChoiceId === 'SCISSORS') {
        result = 'WON'
      } else if (opponentsChoiceId === 'PAPER') {
        result = 'LOSE'
      } else {
        result = 'DRAW'
      }
    } else if (selectedChoiceId === 'PAPER') {
      if (opponentsChoiceId === 'ROCK') {
        result = 'WON'
      } else if (opponentsChoiceId === 'SCISSORS') {
        result = 'LOSE'
      } else {
        result = 'DRAW'
      }
    } else if (selectedChoiceId === 'SCISSORS') {
      if (opponentsChoiceId === 'PAPER') {
        result = 'WON'
      } else if (opponentsChoiceId === 'ROCK') {
        result = 'LOSE'
      } else {
        result = 'DRAW'
      }
    }
    if (result === 'WON') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        finalResult: result,
      }))
    } else if (result === 'LOSE') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        finalResult: result,
      }))
    } else {
      this.setState(prevState => ({
        score: prevState.score,
      }))
    }
  }

  selectChoice = id => {
    this.setState(
      {
        showResult: true,
        selectedChoiceId: id,
      },
      this.updateScore,
    )
  }

  playAgain = () => {
    const {choicesList} = this.props
    this.setState({
      showResult: false,
      opponentsChoiceId: choicesList[Math.floor(Math.random() * 3)].id,
      finalResult: 'PLAYING',
    })
  }

  togglePopup = () => {
    this.setState(prevState => ({
      popupOpen: !prevState.popupOpen,
    }))
  }

  render() {
    const {
      score,
      showResult,
      selectedChoiceId,
      opponentsChoiceId,
      finalResult,
      popupOpen,
    } = this.state
    const {choicesList} = this.props
    console.log(opponentsChoiceId)

    return (
      <div className="game-container">
        <div className="score-container">
          <ul className="game-elements-container">
            <h1 className="main-heading">
              Rock <br /> Paper <br /> Scissors
            </h1>
          </ul>
          <div className="score-card">
            <p className="score-heading">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        <div className="main-container">
          <MainContainer
            choicesList={choicesList}
            showResult={showResult}
            playAgain={this.playAgain}
            selectChoice={this.selectChoice}
            selectedChoiceId={selectedChoiceId}
            opponentsChoiceId={opponentsChoiceId}
            result={finalResult}
          />
        </div>
        <button
          type="button"
          className="rules-button"
          onClick={this.togglePopup} // Toggle popup on button click
        >
          RULES
        </button>
        {popupOpen && (
          <Popup
            open={popupOpen} // Pass state to manage popup open/close
            onClose={this.togglePopup} // Close popup on overlay click
            closeOnDocumentClick={false} // Prevent closing on document click
          >
            <div className="popup-container">
              <button
                type="button"
                className="close-icon"
                onClick={this.togglePopup}
              >
                &times;
              </button>
              <img
                alt="rules"
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                className="rules-image"
              />
            </div>
          </Popup>
        )}
      </div>
    )
  }
}

export default GameContainer
