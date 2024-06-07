import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "./constants";

import  "./styles.scss"

type FormValues = {
  login: string;
  password: string;
}

type TypeActions = "login" | "registration" | null;

export const Auth = () => {

  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState<boolean>(!!localStorage.getItem("accessToken"));
  const [typeAction, setTypeAction] = useState<TypeActions>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    login: "",
    password: "",
  });

  const buttonSubmitRef = useRef<HTMLButtonElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      loginRef.current &&
      passwordRef.current
    ) {

      const resultFormObject = {
        login: loginRef.current?.value,
        password: passwordRef.current?.value,
      }

      setFormValues(resultFormObject);
    }
  }

  const handleRegistrationClick = () => {
    setTypeAction("registration")
  }

  const handleLoginClick = () => {
    setTypeAction("login")
  }

  const handleUnauth = () => {
    localStorage.removeItem("accessToken");
    setHasToken(false);
  }

  const handleMainNavigate = () => {
    navigate("/");
  }

  useEffect(() => {
    if (!formValues.login && !formValues.password) return;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(response => response.json())
    .then(data => {
      setHasToken(true);
      localStorage.setItem("accessToken", data.accessToken)
    })
    .catch(error => console.error(error));
    setHasToken(true);
  }, [formValues])

  return <div className="container">
    <div className="auth-content">
      {hasToken
        ? ( 
          <div className="info">
            <h1>Вы авторизованы!</h1>
            <p>Хотите выйти?</p>
            <div className="info-buttons">
              <button onClick={handleUnauth}>Да</button>
              <button onClick={handleMainNavigate}>Нет</button>
            </div>
          </div>
        ) : (
          !typeAction
            ? (
              <div className="select-action">
                <button onClick={handleRegistrationClick}>Регистрация</button>
                <button onClick={handleLoginClick}>Вход</button>
              </div>
            ) : (
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="login">
                    <span>Логин</span>
                    <input id="login" type="text" name="login" ref={loginRef}/>
                  </label>
                  <label htmlFor="pass">
                    <span>Пароль</span>
                    <input id="pass" type="password" name="password" ref={passwordRef}/>
                  </label>
                  <button type="submit" ref={buttonSubmitRef}>
                    {typeAction === "login" ? "Войти" : "Регистрация"}
                  </button>
                </form>
              </div>
          )
        )
      }
    </div>
  </div>
}