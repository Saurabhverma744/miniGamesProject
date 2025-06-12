import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {BiArrowBack} from 'react-icons/bi'
import {RiCloseLine} from 'react-icons/ri'

import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

const gameState = {
  rules: 'RULES',
  active: 'ACTIVE',
  result: 'RESULT',
}

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    topScore: 0,
    view: gameState.rules,
  }

  resetGame = () => {
    this.setState({
      clickedEmojisList: [],
      view: gameState.active,
    })
  }

  finishGame = () => {
    const {clickedEmojisList, topScore} = this.state
    const currentScore = clickedEmojisList.length
    const newTopScore = currentScore > topScore ? currentScore : topScore

    this.setState({
      topScore: newTopScore,
      view: gameState.result,
    })
  }

  clickEmoji = id => {
    const {clickedEmojisList} = this.state
    const isClicked = clickedEmojisList.includes(id)

    if (isClicked) {
      this.finishGame()
    } else {
      const newClickedList = [...clickedEmojisList, id]
      if (newClickedList.length === emojisList.length) {
        this.setState({clickedEmojisList: newClickedList}, this.finishGame)
      } else {
        this.setState({clickedEmojisList: newClickedList})
      }
    }
  }

  getShuffledEmojis = () => emojisList.sort(() => Math.random() - 0.5)

  renderRules = () => (
    <div className="back-popup-container">
      <Link to="/" className="link-styling">
        <button type="button" className="back-button-styling">
          <BiArrowBack /> Back
        </button>
      </Link>
      <h2 className="rules-heading">Rules</h2>
      <ul className="unordered-list-styling-interface">
        <li>User should be able to see the list of Emojis.</li>
        <li>
          When the user clicks any one of the Emoji for the first time, then the
          count of the score should be incremented by 1 and the List of emoji
          cards should be shuffled.
        </li>
        <li>
          This process should be repeated every time the user clicks on an emoji
          card.
        </li>
        <li>
          When the user clicks on all Emoji cards without clicking any of it
          twice, then the user will win the game.
        </li>
        <li>
          When the user clicks on the same Emoji for the second time, then the
          user will lose the game.
        </li>
        <li>
          Once the game is over, the user will be redirected to the results
          page.
        </li>
      </ul>
      <button
        className="rps-start-button"
        type="button"
        onClick={() => this.setState({view: gameState.active})}
      >
        Start Playing
      </button>
    </div>
  )

  renderEmojis = () => {
    const shuffled = this.getShuffledEmojis()
    return (
      <div className="link-container">
        <Link to="/" className="link-styling">
          <button type="button" className="back-button-styling">
            <BiArrowBack /> Back
          </button>
        </Link>
        <ul className="emojis-list-container">
          {shuffled.map(emoji => (
            <EmojiCard
              key={emoji.id}
              emojiDetails={emoji}
              clickEmoji={this.clickEmoji}
            />
          ))}
        </ul>
        <Popup
          modal
          trigger={
            <button className="TriggerButton" type="button">
              Rules
            </button>
          }
        >
          {close => (
            <div className="PopUpBody">
              <img
                className="PopUpImage"
                src="https://assets.ccbp.in/frontend/content/react-js/emoji-game-rules-v2.jpg"
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
    )
  }

  render() {
    const {clickedEmojisList, topScore, view} = this.state

    return (
      <div className="app-container">
        {view === gameState.active && (
          <NavBar
            currentScore={clickedEmojisList.length}
            isGameInProgress={view === gameState.active}
            topScore={topScore}
          />
        )}
        <div className="emoji-game-body">
          {view === gameState.rules && this.renderRules()}
          {view === gameState.active && this.renderEmojis()}
          {view === gameState.result && (
            <WinOrLoseCard
              isWon={clickedEmojisList.length === emojisList.length}
              score={clickedEmojisList.length}
              onClickPlayAgain={this.resetGame}
            />
          )}
        </div>
      </div>
    )
  }
}

export default EmojiGame
