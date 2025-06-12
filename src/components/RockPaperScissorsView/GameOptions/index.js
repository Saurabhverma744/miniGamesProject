import './index.css'

const GameOptions = props => {
  const {optionDetails, onClickSetUserChoice} = props
  const {imageUrl, id} = optionDetails
  const userChoice = () => {
    onClickSetUserChoice(id)
  }
  return (
    <li className="OptionListItem">
      <button
        className="GameOptionButton"
        type="button"
        onClick={userChoice}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <img className="OptionImage" src={imageUrl} alt={id} />
      </button>
    </li>
  )
}
export default GameOptions
