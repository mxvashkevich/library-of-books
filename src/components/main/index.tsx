import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Modal } from '../modal/index.tsx'
import { baseUrl } from '../constants.ts'

import type { Book, BookProps, User } from './constants.ts'

import './styles.scss'

const BookCard = ({
  name,
  author,
  year,
  image,
  onClick,
}: BookProps & { onClick: () => void }) => (
  <div className="book-item" onClick={onClick}>
    <div className="book-img">
      <img
        src={`http://localhost:3001/books/${image}`}
        alt={`book-image-named: ${name}`}
        className="book-img"
      />
    </div>
    <div className="book-info">
      <h3>{name}</h3>
      <p>{year}</p>
      <p>{author}</p>
      <p>Художественная литература</p>
    </div>
  </div>
)

export const Main = () => {
  const [isDisplayModal, setIsDisplayModal] = useState(false)
  const [isAddBook, setIsAddBook] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [books, setBooks] = useState<Book[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isFetchBooks, setIsFetch] = useState(false)
  const [isSuccessAdd, setIsSuccessAdd] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const bookNameRef = useRef<HTMLInputElement>(null)
  const bookAuthorRef = useRef<HTMLInputElement>(null)
  const bookYearRef = useRef<HTMLInputElement>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(
      'submitted ',
      image &&
        file &&
        bookNameRef.current?.value &&
        bookAuthorRef.current?.value &&
        bookYearRef.current?.value,
    )
    if (
      image &&
      file &&
      bookNameRef.current?.value &&
      bookAuthorRef.current?.value &&
      bookYearRef.current?.value
    ) {
      const formData = new FormData()
      formData.append('book_name', bookNameRef.current?.value)
      formData.append('book_author', bookAuthorRef.current?.value)
      formData.append('book_year', bookYearRef.current?.value)
      formData.append('file', image)
      formData.append('file', file)

      fetch(baseUrl + `book/create`, {
        // запрос для создания объекта книга в БД
        method: 'POST',
        body: formData,
      })
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (!data) return
          setIsFetch(true)
          setIsAddBook(false)
          setIsSuccessAdd(true)
        })
        .catch((error) => console.error(error))
    }
  }

  const handleAddBook = () => {
    setIsAddBook(true)
  }

  const onImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target

    if (target.files?.[0]) {
      setImage(target.files?.[0])
    }
  }

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target

    if (target.files?.[0]) {
      setFile(target.files?.[0])
    }
  }

  useEffect(() => {
    if (!user) {
      const storageUser = JSON.parse(localStorage.getItem('user') || '{}')

      setUser(storageUser)
    }

    fetch(baseUrl + 'book/all', {
      method: 'GET',
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return
        setBooks(data.books)
        // setIsFetch(false)
      })
  }, [isFetchBooks])

  return (
    <div className="all-wrap">
      {(
          <div className="toolbar">
            <button onClick={handleAddBook}>Добавить книгу</button>
          </div>
        )}
      <div className="main-container">
        <div className="main-content">
          {books.length ? (
            books.map((book, idx) => (
              <BookCard
                key={idx}
                author={book.book_author}
                name={book.book_name}
                image={book.image}
                year={book.book_year}
                onClick={() => {
                  setActiveIndex(idx)
                  setIsDisplayModal(true)
                }}
              />
            ))
          ) : (
            <div className="empty-books">Нет книг к показу</div>
          )}
        </div>
      </div>

      <Modal
        className=""
        opened={isDisplayModal}
        onClick={() => {
          setIsDisplayModal(false)
        }}
      >
        {!!books.length && (
          <div className="book-opened">
            <div className="book-info">
              <h3>{books[activeIndex].book_name}</h3>
              <p>{books[activeIndex].book_year}</p>
              <p>{books[activeIndex].book_author}</p>
              <p>Художественная литература</p>
            </div>
            <a
              href={`http://localhost:3001/books/${books[activeIndex].book_link}`}
              target="_blank"
            >
              <img
                src="/src/assets/download.png"
                className="download-mg"
                alt="img-description"
              />
            </a>
          </div>
        )}
      </Modal>

      <Modal
        className=""
        opened={isAddBook}
        onClick={() => {
          setIsAddBook(false)
        }}
      >
        <form onSubmit={handleSubmit} className="add-book-form">
          <label htmlFor="book_name">
            <p>Название книги</p>
            <input
              id="book_name"
              type="text"
              name="book_name"
              ref={bookNameRef}
            />
          </label>
          <label htmlFor="book_author">
            <p>Автор книги</p>
            <input
              id="book_author"
              type="text"
              name="book_author"
              ref={bookAuthorRef}
            />
          </label>
          <label htmlFor="book_year">
            <p>Год выпуска книги</p>
            <input
              id="book_year"
              type="number"
              name="book_year"
              ref={bookYearRef}
            />
          </label>
          <input
            id="image"
            type="file"
            name="image"
            style={{ display: 'none' }}
            onChange={onImageChange}
            accept="image/*"
          />
          <label htmlFor="image">
            <span>Обложка</span>
            <img src={'src/assets/download.png'} className="image-download" />
          </label>
          <input
            id="file"
            type="file"
            name="file"
            style={{ display: 'none' }}
            onChange={onFileChange}
            accept="pdf/*"
          />
          <label htmlFor="file">
            <span>Книга</span>
            <img src={'src/assets/download.png'} className="image-download" />
          </label>
          <button type="submit" className="add-button">
            Добавить
          </button>
        </form>
      </Modal>
      <Modal
        className=""
        opened={isSuccessAdd}
        onClick={() => {
          setIsSuccessAdd(false)
        }}
      >
        <div
          style={{
            width: '50%',
            height: '50%',
            borderRadius: '32px',
            background: '#fef',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h3>Книга успешно добавлена</h3>
        </div>
      </Modal>
    </div>
  )
}
