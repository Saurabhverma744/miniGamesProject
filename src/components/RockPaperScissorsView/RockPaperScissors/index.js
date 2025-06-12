import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BiArrowBack} from 'react-icons/bi'

import {RiCloseLine} from 'react-icons/ri'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import GameOptions from '../GameOptions'
import './index.css'

const choicesList = [
  {
    id: 'rock',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'scissor',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'paper',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const gameStatusConstant = {
  notInProgress: 'NOT_IN_PROGRESS',
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  loss: 'LOSS',
  draw: 'DRAW',
}

class RockPaperScissors extends Component {
  state = {
    score: 0,
    gameStatus: gameStatusConstant.notInProgress,
    userChoice: '',
    gameChoice: '',
  }

  onClickSetUserChoice = id => {
    this.setState(
      {
        userChoice: id,
        gameChoice: this.getGameChoice(),
      },
      this.evaluateGame,
    )
  }

  onClickGoToGameView = () => {
    this.setState({
      gameStatus: gameStatusConstant.inProgress,
    })
  }

  getGameChoice = () => {
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoicesList[randomIndex]
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state
    if (userChoice === gameChoice) {
      this.setState({
        gameStatus: gameStatusConstant.draw,
      })
    } else if (userChoice === 'rock') {
      if (gameChoice === 'scissor') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.loss,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'paper') {
      if (gameChoice === 'rock') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.loss,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'scissor') {
      if (gameChoice === 'paper') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.loss,
          score: prevState.score - 1,
        }))
      }
    }
  }

  onStartGame = () => {
    this.setState({
      gameStatus: gameStatusConstant.inProgress,
    })
  }

  renderGameInProgressView = () => (
    <ul className="GameOptionsList">
      {choicesList.map(eachOption => (
        <GameOptions
          key={eachOption.id}
          optionDetails={eachOption}
          onClickSetUserChoice={this.onClickSetUserChoice}
        />
      ))}
    </ul>
  )

  renderGameNotInProgressView = () => (
    <div className="rock-paper-rules">
      <Link to="/" className="rps-active-state-link-styling">
        <button type="button" className="rps-back-button-styling">
          {' '}
          <BiArrowBack /> Back
        </button>
      </Link>
      <h1 className="rps-heading-styling">ROCK PAPER SCISSOR</h1>
      <img
        src="https://res.cloudinary.com/dvptfc0ji/image/upload/v1729656991/Group_7469_1_rijazz.png"
        alt="rock paper scissor"
        className="rps-image"
      />
      <h1 className="rules-text">Rules</h1>
      <ul className="rps-rules-unordered-styling">
        <li className="list-item-styling">
          The game result should be based on user and user opponent choices
        </li>
        <li className="list-item-styling">
          When the user choice is rock and his opponent choice is rock then the
          result will be <span className="span-styling">IT IS DRAW</span>
        </li>
        <li className="list-item-styling">
          When the user choice is paper and his opponent choice is rock then the
          result will be <span className="span-styling">YOU WON</span>
        </li>
        <li className="list-item-styling">
          When the user choice is a scissor and his opponent choice is rock then
          the result will be
          <span className="span-styling">YOU LOSE</span>
        </li>
        <li className="list-item-styling">
          When the user choice is paper and his opponent choice is paper then
          the result will be <span className="span-styling">IT IS DRAW</span>
        </li>
        <li className="list-item-styling">
          When the user choice is scissors and his opponent choice is paper then
          the result will be <span className="span-styling">YOU WON</span>
        </li>
        <li className="list-item-styling">
          When the user choice is rock and his opponent choice is scissors then
          the result will be <span className="span-styling">YOU WON</span>
        </li>
        <li className="list-item-styling">
          When the user choice is paper and his opponent choice is scissors then
          the result will be <span className="span-styling">YOU LOSE</span>
        </li>
        <li className="list-item-styling">
          When the user choice is scissors and his opponent choice is scissors
          then the result will be{' '}
          <span className="span-styling">IT IS DRAW</span>
        </li>
        <li className="list-item-styling">
          When the result is <span className="span-styling">YOU WON</span>, then
          the count of the score should be incremented by 1
        </li>
        <li className="list-item-styling">
          When the result is <span className="span-styling">IT IS DRAW</span>,
          then the count of the score should be the same
        </li>
        <li className="list-item-styling">
          When the result is <span className="span-styling">YOU LOSE</span>,
          then the count of the score should be decremented by 1.
        </li>
      </ul>
      <button
        className="rps-start-button"
        type="button"
        onClick={this.onStartGame}
      >
        Start Playing
      </button>
    </div>
  )

  renderGameWonView = () => {
    const {gameChoice, userChoice} = this.state
    const userChoiceObjectList = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectList[0]
    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectList[0]

    return (
      <div className="GameResultViewContainer">
        <div className="SelectedOptionsContainer">
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">You</p>
            <img
              className="GameParticipantChoiceImage"
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </div>
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">Other</p>
            <img
              className="GameParticipantChoiceImage"
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>

        <p className="ResultText">You Won</p>
        <button
          className="PlayAgainButton"
          type="button"
          onClick={this.onClickGoToGameView}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameLostView = () => {
    const {gameChoice, userChoice} = this.state

    const userChoiceObjectList = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectList[0]
    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectList[0]

    return (
      <div className="GameResultViewContainer">
        <div className="SelectedOptionsContainer">
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">You</p>
            <img
              className="GameParticipantChoiceImage"
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </div>
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">Other</p>
            <img
              className="GameParticipantChoiceImage"
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="ResultText">You Lose</p>
        <button
          className="PlayAgainButton"
          type="button"
          onClick={this.onClickGoToGameView}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameDrawView = () => {
    const {gameChoice, userChoice} = this.state
    const userChoiceObjectList = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectList[0]
    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectList[0]

    return (
      <div className="GameResultViewContainer">
        <div className="SelectedOptionsContainer">
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">You</p>
            <img
              className="GameParticipantChoiceImage"
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </div>
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">Other</p>
            <img
              className="GameParticipantChoiceImage"
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="ResultText">IT IS DRAW</p>
        <button
          className="PlayAgainButton"
          type="button"
          onClick={this.onClickGoToGameView}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConstant.inProgress:
        return this.renderGameInProgressView()
      case gameStatusConstant.win:
        return this.renderGameWonView()
      case gameStatusConstant.loss:
        return this.renderGameLostView()
      case gameStatusConstant.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    const {score, gameStatus} = this.state
    return (
      <div className="AppContainer">
        {gameStatus === 'NOT_IN_PROGRESS' ? (
          this.renderGameNotInProgressView()
        ) : (
          <>
            <Link to="/" className="rps-active-state-link-styling two">
              <button type="button" className="rps-back-button-styling">
                {' '}
                <BiArrowBack /> Back
              </button>
            </Link>
            <div className="ResultContainer">
              <div className="OptionsContainer">
                <div className="Option">
                  ROCK
                  <br />
                  <br />
                  PAPER
                  <br />
                  <br />
                  SCISSOR
                </div>
              </div>
              <div className="ScoreContainer">
                <p className="ScorePhrase">Score</p>
                <p className="ScoreNumber">{score}</p>
              </div>
            </div>
            <div className="GameViewContainer">{this.renderGameView()}</div>
            <div className="PopUpContainer">
              <Popup
                modal
                trigger={
                  <button className="TriggerButton" type="button">
                    Rules
                  </button>
                }
                closeOnEscape
                window
              >
                {close => (
                  <div className="PopUpBody">
                    <img
                      className="PopUpImage"
                      src="https://assets.ccbp.in/frontend/content/react-js/rock-paper-scissor-rules-v2.jpg"
                      alt="rules"
                    />
                    <button
                      aria-label="Close"
                      data-testid="close"
                      className="CloseButton"
                      type="button"
                      onClick={() => close()}
                    >
                      <RiCloseLine />
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default RockPaperScissors
