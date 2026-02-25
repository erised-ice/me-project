import {Layout} from "../shared/components/Layout/Layout.tsx";
import {Link} from "../shared/components/Link/Link.tsx";
import {getRoute, ROUTE} from "../shared/constants/routes.ts";

export const RecipeBookPage = () => {
  return (
    <Layout>
      <h1>Книга рецептов</h1>
      <ul>
        {/*TODO: генерировать по массиву */}
        <li>
          <Link to={getRoute(ROUTE.RECIPES, 0)}>
            Блинчики
          </Link>
        </li>
        <li>
          <Link to={getRoute(ROUTE.RECIPES, 1)}>
            Рис
          </Link>
        </li>
        <li>
          <Link to={getRoute(ROUTE.RECIPES, 2)}>
            Тест
          </Link>
        </li>
      </ul>
    </Layout>
  )
}
