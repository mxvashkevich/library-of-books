import { useState } from 'react'
import { BOOK_STORE } from './constants'

import type { BookProps } from './constants.ts'

import './styles.scss'

const BookCard = ({
  image,
  title,
  description,
  countStorage,
  author,
  onClick,
}: BookProps & { onClick: () => void }) => (
  <div className="book-item" onClick={onClick}>
    <div className="book-img">
      <img
        src={image}
        alt={`book-image-named: ${title}`}
        className="book-img"
      />
    </div>
    <div className="book-info">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{author}</p>
      <p>Цена: {countStorage}</p>
    </div>
  </div>
)

export const Main = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <div className="main-container">
        {BOOK_STORE.map(
          ({ image, title, description, countStorage, author }, idx) => (
            <BookCard
              key={idx}
              author={author}
              countStorage={countStorage}
              description={description}
              image={image}
              title={title}
              onClick={() => {
                setActiveIndex(idx)
                setIsDisplayModal(true)
              }}
            />
          ),
        )}
      </div>
      {isDisplayModal && (
        <div
          className="overlay"
          onClick={() => {
            setIsDisplayModal(false)
          }}
        >
          <div>
            <BookCard onClick={() => {}} {...BOOK_STORE[activeIndex]} />
          </div>
        </div>
      )}
    </>
  )
}
