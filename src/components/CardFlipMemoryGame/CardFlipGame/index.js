import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BiArrowBack} from 'react-icons/bi'

import {v4 as uuidv4} from 'uuid'

import CardList from '../CardList'

import './index.css'

const cardsData = [
  {
    name: 'tiger',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    name: 'lion',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    name: 'rat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    name: 'hen',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    name: 'elephant',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    name: 'buffalo',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    name: 'goat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    name: 'zebra',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    name: 'duck',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    name: 'pigeon',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

class CardFlipGame extends Component {
  state = {
    cardsList: [],
    flippedCards: [],
    score: 0,
    isBoardLocked: false,
    timeLeft: 120,
    isGameOn: true,
  }

  componentDidMount() {
    const duplicated = [...cardsData, ...cardsData]
    const shuffled = duplicated.sort(() => Math.random() - 0.5)
    const finalArr = shuffled.map(each => ({
      ...each,
      id: uuidv4(),
      isFlipped: false,
      isMatched: false,
    }))
    this.setState({cardsList: finalArr})
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      const {timeLeft} = this.state
      if (timeLeft > 0) {
        this.setState({timeLeft: timeLeft - 1})
      } else {
        clearInterval(this.timerId)
        this.setState({
          isGameOn: false,
        })
      }
    }, 1000)
  }

  formatTime = () => {
    const {timeLeft} = this.state
    const minute = Math.floor(timeLeft / 60)
    const second = timeLeft - minute * 60
    const formattedSecond = second > 9 ? second : `0${second}`
    const formattedMinute = minute > 9 ? minute : `0${minute}`
    return `${formattedMinute}: ${formattedSecond}`
  }

  onPlayAgainButton = () => {
    clearInterval(this.timerId) // Clear any existing timer

    const duplicated = [...cardsData, ...cardsData]
    const shuffled = duplicated.sort(() => Math.random() - 0.5)
    const finalArr = shuffled.map(each => ({
      ...each,
      id: uuidv4(),
      isFlipped: false,
      isMatched: false,
    }))

    this.setState(
      {
        cardsList: finalArr,
        flippedCards: [],
        score: 0,
        isBoardLocked: false,
        timeLeft: 120,
        isGameOn: true,
      },
      this.startTimer, // Start the timer again after resetting
    )
  }

  shouldGameContinue = score => score !== 10

  flippedCardImage = id => {
    const {isBoardLocked} = this.state
    if (isBoardLocked) return

    const {cardsList, flippedCards, score} = this.state

    const clickedCard = cardsList.find(card => card.id === id)
    if (clickedCard.isFlipped || clickedCard.isMatched) return

    const updatedCardsList = cardsList.map(card =>
      card.id === id ? {...card, isFlipped: true} : card,
    )
    const updatedFlipped = [...flippedCards, {...clickedCard, isFlipped: true}]

    if (updatedFlipped.length === 2) {
      const [first, second] = updatedFlipped

      if (first.name === second.name) {
        const newScore = score + 1
        const matchedList = updatedCardsList.map(card =>
          card.name === first.name
            ? {...card, isFlipped: true, isMatched: true}
            : card,
        )

        this.setState(
          {
            cardsList: matchedList,
            flippedCards: [],
            score: newScore,
            isGameOn: newScore !== 10,
          },
          () => {
            if (newScore === 10) {
              clearInterval(this.timerId)
            }
          },
        )
      } else {
        //  No match: flip back after timeout
        this.setState({
          cardsList: updatedCardsList,
          flippedCards: updatedFlipped,
          isBoardLocked: true,
        })

        setTimeout(() => {
          this.setState(prev => ({
            cardsList: prev.cardsList.map(card =>
              card.id === first.id || card.id === second.id
                ? {...card, isFlipped: false}
                : card,
            ),
            flippedCards: [],
            isBoardLocked: false,
          }))
        }, 1000)
      }
    } else {
      // Only one card flipped
      this.setState({
        cardsList: updatedCardsList,
        flippedCards: updatedFlipped,
      })
    }
  }

  rulesContainer = () => (
    <Link to="/" className="link-styling">
      <button type="button" className="cfm-initial-Back-button">
        <BiArrowBack color="#ffffff" /> Back
      </button>
    </Link>
  )

  renderGameResultView = () => {
    const {score} = this.state

    const happyEmoji =
      'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729927729/2x_csj9y0.png'
    const sadEmoji =
      'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729927830/thfj8loqatlejhcjmh0q.png'
    const happyEmojiAlt = 'grinning face with big eyes'
    const sadEmojiAlt = 'neutral face'
    const image = score === 10 ? happyEmoji : sadEmoji
    const altText = score === 10 ? happyEmojiAlt : sadEmojiAlt

    return (
      <div className="result-container">
        <img src={image} alt={altText} />
        <h1 className="congratulation-response-text">
          {score > 9 ? 'Congratulations' : 'Better luck next time'}
        </h1>
        <p className="response-description">
          {score > 9
            ? 'You matched all of the cards in record time'
            : 'You did not match all of the cards in record time'}
        </p>
        <h1 className="no-of-flips-text">{score}</h1>
        <button
          type="button"
          className="cfm-response-button"
          onClick={this.onPlayAgainButton}
        >
          Play Again
        </button>
      </div>
    )
  }

  renderCardView = () => {
    const {cardsList, score} = this.state
    const remainingTime = this.formatTime()

    return (
      <div className="score-container">
        <div className="score-card">
          <h2>Score: {score}</h2>
          <h2>{remainingTime}</h2>
        </div>
        <div className="game-view">
          <ul className="ul-cards-data">
            {cardsList.map(each => (
              <CardList
                key={each.id}
                each={each}
                flippedCardImage={this.flippedCardImage}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isGameOn} = this.state
    return (
      <div className="flip-game-container">
        {this.rulesContainer()}
        <h1>Card Flip Memory Game</h1>
        {isGameOn ? this.renderCardView() : this.renderGameResultView()}
      </div>
    )
  }
}

export default CardFlipGame
