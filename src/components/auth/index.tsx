import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../modal'

import './styles.scss'
import { baseUrl } from '../constants'

type FormValues =
  | {
      student_number: string // as login
      password: string
      first_name: string
      second_name: string
      last_name: string
      user_type: string
    }
  | {
      student_number: string // as login
      password: string
    }

type TypeActions = 'login' | 'register' | null

export const Auth = () => {
  const navigate = useNavigate() // хук для навигации внутри SPA (фронта)

  const [isModalDisplay, setIsModalDisplay] = useState(false)
  const [hasToken, setHasToken] = useState<boolean>(
    !!localStorage.getItem('accessToken'),
  )

  const initialState = {
    student_number: undefined,
    password: undefined,
    first_name: undefined,
    second_name: undefined,
    last_name: undefined,
    user_type: undefined,
  }

  const [typeAction, setTypeAction] = useState<TypeActions>(null)
  const [formValues, setFormValues] =
    useState<Partial<FormValues>>(initialState)

  const buttonSubmitRef = useRef<HTMLButtonElement>(null)
  const studentNumberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const secondNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const userTypeRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isRegister =
      studentNumberRef.current?.value &&
      passwordRef.current?.value &&
      firstNameRef.current?.value &&
      secondNameRef.current?.value &&
      lastNameRef.current?.value &&
      userTypeRef.current?.value

    if (isRegister) {
      const resultFormObject = {
        student_number: studentNumberRef.current?.value,
        password: passwordRef.current?.value,
        first_name: firstNameRef.current?.value,
        second_name: secondNameRef.current?.value,
        last_name: lastNameRef.current?.value,
        user_type:
          userTypeRef.current?.value === 'студент' ? 'student' : 'teacher',
      }

      setFormValues(resultFormObject)
      return
    }

    if (studentNumberRef.current && passwordRef.current) {
      const resultFormObject = {
        student_number: studentNumberRef.current?.value,
        password: passwordRef.current?.value,
      }

      setFormValues(resultFormObject)
    }
  }

  const handleRegistrationClick = () => {
    setTypeAction('register')
  }

  const handleLoginClick = () => {
    setTypeAction('login')
  }

  const handleBackClick = () => {
    setTypeAction(null)
  }

  const handleUnauth = () => {
    localStorage.removeItem('accessToken')
    setHasToken(false)
  }

  const handleMainNavigate = () => {
    navigate('/')
  }

  useEffect(() => {
    fetch(baseUrl + `auth/${typeAction}`, {
      // запрос для регистрации или авторизации
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data) return
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        setHasToken(true)
        setIsModalDisplay(true)
      })
      .catch((error) => console.error(error))
  }, [formValues])

  return (
    <>
      <div className="container">
        <div className="auth-content">
          {hasToken ? (
            <div className="info">
              <h1>Вы авторизованы!</h1>
              <p>Хотите выйти?</p>
              <div className="info-buttons">
                <button onClick={handleUnauth}>Да</button>
                <button onClick={handleMainNavigate}>Нет</button>
              </div>
            </div>
          ) : !typeAction ? (
            <div className="select-action">
              <button onClick={handleRegistrationClick}>Регистрация</button>
              <button onClick={handleLoginClick}>Вход</button>
            </div>
          ) : typeAction === 'login' ? (
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <label htmlFor="student_number">
                  <span>Номер студенческого</span>
                  <input
                    id="student_number"
                    type="text"
                    name="login"
                    ref={studentNumberRef}
                  />
                </label>
                <label htmlFor="password">
                  <span>Пароль</span>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    ref={passwordRef}
                  />
                </label>
                <div className="auth-buttons">
                  <button type="submit" ref={buttonSubmitRef}>
                    Войти
                  </button>
                  <button type="button" onClick={handleBackClick}>
                    Назад
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">
                  <span>Имя</span>
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    ref={firstNameRef}
                  />
                </label>
                <label htmlFor="second_name">
                  <span>Фамилия</span>
                  <input
                    id="second_name"
                    type="text"
                    name="second_name"
                    ref={secondNameRef}
                  />
                </label>
                <label htmlFor="last_name">
                  <span>Отчество</span>
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    ref={lastNameRef}
                  />
                </label>
                <label htmlFor="user_type">
                  <span>Тип пользователя</span>
                  <input
                    id="user_type"
                    type="text"
                    defaultValue={'студент'}
                    name="user_type"
                    ref={userTypeRef}
                  />
                </label>
                <label htmlFor="student_number">
                  <span>Номер студенческого</span>
                  <input
                    id="student_number"
                    type="text"
                    name="student_number"
                    ref={studentNumberRef}
                  />
                </label>
                <label htmlFor="password">
                  <span>Пароль</span>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    ref={passwordRef}
                  />
                </label>
                <div className="auth-buttons">
                  <button type="submit" ref={buttonSubmitRef}>
                    Регистрация
                  </button>
                  <button type="button" onClick={handleBackClick}>
                    Назад
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Modal
        className=""
        opened={isModalDisplay}
        onClick={() => {
          navigate('/')
          setIsModalDisplay(false)
        }}
      >
        <div className="modal-children">
          <h1>{`Вы ${typeAction === 'login' ? 'авторизовались' : 'зарегистрировались'} успешно!`}</h1>
        </div>
      </Modal>
    </>
  )
}
