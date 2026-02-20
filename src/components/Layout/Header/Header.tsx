import { Link } from "react-router-dom";
/*TODO: Создать компонент линк */

export const Header = () => {
  return (
    <header>
      Навигация, логотип
      {/*
      Здесь будет навигация, логотип и тому подобное. Он будет одинаковый на всех страницах
      */}
      <Link to="/">Main page</Link>
      <Link to="/recipes">Recipes</Link>
      {/*TODO: Сделать так, чтобы подсвечивались нужные ссылки когда находимся на нужной странице */}
    </header>
  )
}