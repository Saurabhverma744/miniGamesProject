import './index.css'

const CardList = props => {
  const {each, flippedCardImage} = props
  const {name, image, isFlipped, isMatched, id} = each
  const defaultImg =
    'https://res.cloudinary.com/dvptfc0ji/image/upload/v1729879910/foot-print_1_sut6kl.png'
  const displayImage = isFlipped ? image : defaultImg
  const displayImageClass = isFlipped ? 'card-image' : 'default-image'

  return (
    <li className="card-list">
      <button
        type="button"
        className="flip-button"
        onClick={() => flippedCardImage(id)}
        disabled={isFlipped || isMatched}
      >
        <img src={displayImage} alt={name} className={displayImageClass} />
      </button>
    </li>
  )
}

export default CardList
