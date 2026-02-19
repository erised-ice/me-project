import {MainPage} from "../../../pages/MainPage.tsx";

export const Header = () => {
  return (
    <header>
      Навигация, логотип
      {/*
      Здесь будет навигация, логотип и тому подобное. Он будет одинаковый на всех страницах
      */}
      <link href={MainPage}>Main page</link>
    </header>
  )
}