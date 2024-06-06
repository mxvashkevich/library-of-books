import { useEffect, useRef, useState } from "react";
import  "./styles.scss"

export const Auth = () => {

  const [hasToken, setHasToken] = useState(false);

  const [typeAction, setTypeAction] = useState<"login" | "registration" | null>(null);

  const buttonSubmitRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e, buttonSubmitRef.current?.innerText);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setHasToken(true);
    }
  }, [])

  const handleRegistrationClick = () => {
    setTypeAction("registration")
  }

  const handleLoginClick = () => {
    setTypeAction("login")
  }

  return <div className="container">
    <div className="auth-content">
      {
        hasToken
          ? 
            <>
              <h1>Вы уже зарегистрированы</h1>
              <span> Выйти? </span>
              <button>Выход</button>
            </>
          :
            <div className="buttons">
              <button onClick={handleRegistrationClick}>Регистрация</button>
              <button onClick={handleLoginClick}>Войти</button>
            </div>
      }

      {typeAction && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="login">
            <span>Логин</span>
          </label>
          <input id="login" type="text" />
          <label htmlFor="pass">
            <span>Пароль</span>
          </label>
          <input id="pass" type="text" />
          <button type="submit" ref={buttonSubmitRef}>
            {typeAction === "login" ? "Войти" : "Регистрация"}
          </button>
        </form>
      )}
    </div>
  </div>
}