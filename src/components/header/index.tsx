import { useNavigate } from 'react-router-dom'
import { chatLink, siteLink } from './constants'

import './styles.scss'
import { useEffect, useState } from 'react'

export type User = {
  userId: string
  first_name: string
  second_name: string
  last_name: string
  student_number: number
  user_type: string
}

export const Header = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | ''>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : ''
  })

  const handleAuthNavigate = () => {
    navigate('auth', { replace: true })
  }

  const handleContactsClick = () => {
    navigate('contacts', { replace: true })
  }

  const handleMainNavigate = () => {
    navigate('/')
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser('')
  }

  useEffect(() => {
    if (!user && localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user') || ''))
    }
  }, [user])

  return (
    <div className="header-container">
      <div className="logo">
        <img src="/src/assets/logo.png" alt="#" />
        <h1>{'Цифровая\u00A0бибилиотека им.\u00A0Софии\u00A0Великой'}</h1>
      </div>
      <div className="header-content">
        <div className="nav">
          <button onClick={handleMainNavigate}>ГЛАВНАЯ</button>
          <button onClick={handleContactsClick}>КОНТАКТЫ</button>
          <button>
            <a href={siteLink} target="_blank">
              САЙТ ВУЗА
            </a>
          </button>
          <button>
            <a href={chatLink} target="_blank">
              ЧАТ
            </a>
          </button>
        </div>
        <div className="auth">
          {!user ? (
            <>
              <button onClick={handleAuthNavigate}>Войти</button>
              <button onClick={handleAuthNavigate}>Регистрация</button>
            </>
          ) : (
            <>
              <p>{user.first_name}</p>
              <button onClick={handleLogout}>Выйти</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
