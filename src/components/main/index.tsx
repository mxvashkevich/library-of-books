import { BOOK_STORE } from "./constants"

import "./styles.scss";

export const Main = () => {
  return <div className="main-container">
    {BOOK_STORE.map((book) => (
      <div className="book-item">
        <div className="book-img">
          <img src={book.image} alt={`book-image-named: ${book.title}`} className="book-img" />
        </div>
        <div className="book-info">
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <p>{book.author}</p>
          <p>Цена: {book.countStorage}</p>
        </div>
      </div>
    ))}
  </div>
}