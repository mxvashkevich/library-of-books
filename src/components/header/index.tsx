import { useNavigate } from "react-router-dom";
import { chatLink, siteLink } from "./constants";

import "./styles.scss";

export const Header = () => {

  const navigate = useNavigate();

  const handleAuthNavigate = () => {
    navigate("auth");
  }

  const handleContactsClick = () => {
    navigate("contacts")
  }

  return (
    <div className="header-container">
      <div className="logo">
        <img src="/src/assets/logo.png" alt="#" />
        <h1>{"Цифровая\u00A0бибилиотека им.\u00A0Софии\u00A0Великой"}</h1>
      </div>
      <div className="header-content">
        <div className="nav">
          <button onClick={handleContactsClick}>КОНТАКТЫ</button>
          <button><a href={siteLink} target="_blank">САЙТ ВУЗА</a></button>
          <button><a href={chatLink} target="_blank">ЧАТ</a></button>
        </div>
        <div className="auth">
          <button onClick={handleAuthNavigate}>Войти</button>
          <button onClick={handleAuthNavigate}>Регистрация</button>
        </div>
      </div>
    </div>
  );
}