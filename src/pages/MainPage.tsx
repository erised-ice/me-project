import {Layout} from "../shared/components/Layout/Layout.tsx";
import {Link} from "../shared/components/Link/Link.tsx";
import {getRoute, ROUTE} from "../shared/constants/routes.ts";

export const MainPage = () => {
  return (
    <Layout>
      <h1>Обо мне</h1>
      Меня зовут Александра. Это главная страничка сайта, который я делаю, чтобы разобраться в некоторых технологиях. Для начала
      я решила создать каталог рецептов, которые использую в повседневной жизни или по особым случаям. Вот недавно я ела <Link to={getRoute(ROUTE.RECIPES, 1)}>рис</Link> с курицей, запеченной в духовке, а так же <Link to={getRoute(ROUTE.RECIPES, 0)}>блинчики со сгущенкой</Link>.
    </Layout>
  )
}

/* TODO: обращение к рецептам не напрямую по id, а по продукту */