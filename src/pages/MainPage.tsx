import {Layout} from "../shared/components/Layout/Layout.tsx";
import {Link} from "../shared/components/Link/Link.tsx";
import {getRoute, ROUTE} from "../shared/constants/routes.ts";

export const MainPage = () => {
  return (
    <Layout>
      <h1>Обо мне</h1>
      Меня зовут Александра. Я родилась в поселке Берёзово в 11 мая 1990 года.
      Сейчас я живу в Херцег-Нови, в Черногории.
      Сегодня я ела <a >рис</a> с <a>курицей, запеченной в духовке</a>, а так же <Link to={getRoute(ROUTE.RECIPES, 0)}>блинчики со сгущенкой</Link>.
    </Layout>
  )
}