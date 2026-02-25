import {Layout} from "../components/Layout/Layout.tsx";
import {Link} from "../components/shared/Link/Link.tsx";

export const RecipeBookPage = () => {
  return (
    <Layout>
      <h1>Книга рецептов</h1>
      <ul>
        <li>
          <Link to={`/recipes/11`}>
            Блинчики
          </Link>
        </li>
      </ul>
    </Layout>
  )
}