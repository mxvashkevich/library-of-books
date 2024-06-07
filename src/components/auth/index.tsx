import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from './constants'

import './styles.scss'

type FormValues = {
  student_number: string // as login
  password: string
  first_name: string
  second_name: string
  last_name: string
  user_type: string
}

type TypeActions = 'login' | 'registration' | null

export const Auth = () => {
  const navigate = useNavigate()
  const [hasToken, setHasToken] = useState<boolean>(
    !!localStorage.getItem('accessToken'),
  )
  const [typeAction, setTypeAction] = useState<TypeActions>(null)
  const [formValues, setFormValues] = useState<FormValues>({
    student_number: '', // as login
    password: '',
    first_name: '',
    second_name: '',
    last_name: '',
    user_type: '',
  })

  const buttonSubmitRef = useRef<HTMLButtonElement>(null)
  const studentNumberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const secondNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const userTypeRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (studentNumberRef.current && passwordRef.current) {
      const resultFormObject = {
        student_number: studentNumberRef.current?.value,
        password: passwordRef.current?.value,
      }

      setFormValues(resultFormObject)
    }
  }

  const handleRegistrationClick = () => {
    setTypeAction('registration')
  }

  const handleLoginClick = () => {
    setTypeAction('login')
  }

  const handleUnauth = () => {
    localStorage.removeItem('accessToken')
    setHasToken(false)
  }

  const handleMainNavigate = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!formValues.student_number && !formValues.password) return

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        setHasToken(true)
        localStorage.setItem('accessToken', data.accessToken)
      })
      .catch((error) => console.error(error))
    setHasToken(true)
  }, [formValues])

  return (
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
              <button type="submit" ref={buttonSubmitRef}>
                Войти
              </button>
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
                  ref={passwordRef}
                />
              </label>
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
              <button type="submit" ref={buttonSubmitRef}>
                Регистрация
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
