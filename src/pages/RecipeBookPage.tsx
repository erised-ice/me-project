import {Layout} from "../components/Layout/Layout.tsx";
import {Link} from "react-router-dom";

export const RecipeBookPage = () => {
  return (
    <Layout>
      <h1>Книга рецептов</h1>
      <ul>
        <li>
          <Link to={`/recipes/pancakes`}>
            Блинчики
          </Link>
        </li>
      </ul>
    </Layout>
  )
}