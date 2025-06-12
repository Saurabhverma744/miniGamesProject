import {Component} from 'react'
import CardFlipGame from '../CardFlipGame' // your current game component
import './index.css'

class CardFlipGameWrapper extends Component {
  state = {
    showRules: true, // initially show rules
  }

  onStartGame = () => {
    this.setState({showRules: false})
  }

  renderRules = () => (
    <div className="rules-container">
      <h1>Card Flip Memory Game Rules</h1>
      <ul>
        <li>Match pairs of cards by flipping them.</li>
        <li>You have 2 minutes to match all pairs.</li>
        <li>Score increases for every matched pair.</li>
        <li>Try to match all cards before time runs out!</li>
      </ul>
      <button
        type="button"
        onClick={this.onStartGame}
        className="start-game-button"
      >
        Play
      </button>
    </div>
  )

  render() {
    const {showRules} = this.state
    return <div>{showRules ? this.renderRules() : <CardFlipGame />}</div>
  }
}

export default CardFlipGameWrapper
