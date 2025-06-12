import {Switch, Route, Redirect} from 'react-router-dom'
import RockPaperScissors from './components/RockPaperScissorsView/RockPaperScissors'
import EmojiGame from './components/EmojiGameView/EmojiGame'
import CardFlipGameWrapper from './components/CardFlipMemoryGame/CardFlipGameWrapper'
import MemoryMatrixRoute from './components/MemoryMatrixRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/emoji-game" component={EmojiGame} />
    <Route exact path="/rock-paper-scissor" component={RockPaperScissors} />
    <Route exact path="/memory-matrix" component={MemoryMatrixRoute} />
    <Route
      exact
      path="/card-flip-memory-game"
      component={CardFlipGameWrapper}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
