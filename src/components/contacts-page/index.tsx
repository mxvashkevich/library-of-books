import { Footer, Header } from "../index"
import "./styles.scss"

export const ContactsPage = () => {
  return (
    <>
      <Header />
      <div className="contacts-container">
        <div className="contacts-card">
          <h2>{"Цифровая\u00A0бибилиотека им.\u00A0Софии\u00A0Великой"}</h2>
          <h2>О нас</h2>
          <p>Цифровая библиотека "Таганрогская книга" - это проект, созданный в 2022 году студентом Таганрогского государственного радиотехнического университета (ТГРТУ) в рамках курсовой работы.</p>
          <h4>Миссия</h4>
          <p>Наша миссия - создать доступную и удобную платформу для хранения, поиска и распространения цифровых ресурсов, связанных с культурой, историей и наукой Таганрога и Ростовской области. Мы стремимся к тому, чтобы наша библиотека стала центром притяжения для всех, кто интересуется региональной историей и культурой.</p>
          <h4>Цели</h4>
          <ul>
            <li>Создать открытую и доступную платформу для хранения и распространения цифровых ресурсов</li>
            <li>Собрать и систематизировать информацию о культурном и научном наследии Таганрога и Ростовской области</li>
            <li>Способствовать развитию образования и науки в регионе</li>
            <li>Создать сообщество пользователей, заинтересованных в развитии цифровой библиотеки</li>
          </ul>
          <h4>Лицензия</h4>
          <p>Все материалы, размещенные в нашей библиотеке, распространяются по открытой лицензии Creative Commons Attribution 4.0 International (CC BY 4.0). Это означает, что вы можете свободно использовать, распространять и модифицировать наши материалы, при условии указания авторства и соблюдения условий лицензии.</p>
          <h4>Контакты</h4>
          <p>Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами по адресу <a href="#">sofia-library@fail.ru</a> или через форму обратной связи на нашем сайте. Мы будем рады hearing from you!</p>
        </div>
      </div>
      <Footer />
    </>
  )
}