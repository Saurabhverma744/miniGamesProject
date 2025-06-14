import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {RiCloseLine} from 'react-icons/ri'
import Modal from 'react-modal'

import GameOptions from '../GameOptions'
import './index.css'

// Set accessibility root
Modal.setAppElement('#root')

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
    isRulesOpen: false,
  }

  openRulesModal = () => {
    this.setState({isRulesOpen: true})
  }

  closeRulesModal = () => {
    this.setState({isRulesOpen: false})
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
    this.setState({gameStatus: gameStatusConstant.inProgress})
  }

  getGameChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3)
    return choicesList[randomIndex].id
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state
    if (userChoice === gameChoice) {
      this.setState({gameStatus: gameStatusConstant.draw})
    } else if (
      (userChoice === 'rock' && gameChoice === 'scissor') ||
      (userChoice === 'paper' && gameChoice === 'rock') ||
      (userChoice === 'scissor' && gameChoice === 'paper')
    ) {
      this.setState(prev => ({
        gameStatus: gameStatusConstant.win,
        score: prev.score + 1,
      }))
    } else {
      this.setState(prev => ({
        gameStatus: gameStatusConstant.loss,
        score: prev.score - 1,
      }))
    }
  }

  onStartGame = () => {
    this.setState({gameStatus: gameStatusConstant.inProgress})
  }

  renderGameInProgressView = () => (
    <ul className="GameOptionsList">
      {choicesList.map(each => (
        <GameOptions
          key={each.id}
          optionDetails={each}
          onClickSetUserChoice={this.onClickSetUserChoice}
        />
      ))}
    </ul>
  )

  renderGameResultView = resultText => {
    const {gameChoice, userChoice} = this.state
    const userChoiceObj = choicesList.find(choice => choice.id === userChoice)
    const gameChoiceObj = choicesList.find(choice => choice.id === gameChoice)

    return (
      <div className="GameResultViewContainer">
        <div className="SelectedOptionsContainer">
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">You</p>
            <img
              className="GameParticipantChoiceImage"
              src={userChoiceObj.imageUrl}
              alt="your choice"
            />
          </div>
          <div className="GameUserOptionContainer">
            <p className="GameParticipantText">Other</p>
            <img
              className="GameParticipantChoiceImage"
              src={gameChoiceObj.imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="ResultText">{resultText}</p>
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
        return this.renderGameResultView('You Won')
      case gameStatusConstant.loss:
        return this.renderGameResultView('You Lose')
      case gameStatusConstant.draw:
        return this.renderGameResultView('IT IS DRAW')
      default:
        return null
    }
  }

  renderGameNotInProgressView = () => (
    <div className="rock-paper-rules">
      <Link to="/" className="rps-active-state-link-styling">
        <button type="button" className="rps-back-button-styling">
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
        {/* Keep your rules list here */}
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

  render() {
    const {score, gameStatus, isRulesOpen} = this.state
    return (
      <div className="AppContainer">
        {gameStatus === gameStatusConstant.notInProgress ? (
          this.renderGameNotInProgressView()
        ) : (
          <>
            <Link to="/" className="rps-active-state-link-styling two">
              <button type="button" className="rps-back-button-styling">
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
              <button
                className="TriggerButton"
                type="button"
                onClick={this.openRulesModal}
              >
                Rules
              </button>
              <Modal
                isOpen={isRulesOpen}
                onRequestClose={this.closeRulesModal}
                className="ModalContent"
                overlayClassName="ModalOverlay"
                contentLabel="Game Rules"
              >
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
                    onClick={this.closeRulesModal}
                  >
                    <RiCloseLine />
                  </button>
                </div>
              </Modal>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default RockPaperScissors
