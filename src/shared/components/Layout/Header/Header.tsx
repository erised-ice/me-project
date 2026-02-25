import {Link} from "../../Link/Link.tsx";
import {ROUTE} from "../../../constants/routes.ts";
/*TODO: добавить алиасы чтобы писать сокращенные пути (а может и не надо)*/
export const Header = () => {
  return (
    <header>
      Навигация, логотип
      {/*
      Здесь будет навигация, логотип и тому подобное. Он будет одинаковый на всех страницах
      */}
      <Link to={ROUTE.HOME}>Main page</Link>
      <Link to={ROUTE.RECIPES}>Recipes</Link>
      {/*TODO: Сделать так, чтобы подсвечивались нужные ссылки когда находимся на нужной странице */}
    </header>
  )
}
