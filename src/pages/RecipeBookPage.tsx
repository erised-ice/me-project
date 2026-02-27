import {Layout} from "../shared/components/Layout/Layout.tsx";
import {Link} from "../shared/components/Link/Link.tsx";
import {getRoute, ROUTE} from "../shared/constants/routes.ts";
import {useState} from "react";
import {recipes} from "../shared/data/data.ts";

export const RecipeBookPage = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [newRecipes, setNewRecipes] = useState(recipes);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRecipe = {
      id: Date.now(),
      name: recipeName,
      ingredients: ingredients.split("\n").map((line, index) => ({
        id: index,
        name: line.trim(),
        tip: null,
        }),),
      description: instructions
    };
    setNewRecipes((prev) => [...prev, newRecipe]);/*TODO: поправить типы*/
    setRecipeName("");
    setIngredients("");
    setInstructions("");
  }

  return (
    <Layout>
      <h1>Книга рецептов</h1>
      <h2>Добавить рецепт</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Название
          <input onChange={(e) => setRecipeName(e.target.value)} value={recipeName} />
        </label>
        <label>
          Ингредиенты
          <textarea onChange={(e) => setIngredients(e.target.value)} value={ingredients} />
        </label>
        <label>
          Инструкции
          <textarea onChange={(e) => setInstructions(e.target.value)} value={instructions} />
        </label>
        <button type="submit">Добавить</button>
      </form>
      <ul>
        {
          newRecipes.map(item => (
            <li>
              <Link to={getRoute(ROUTE.RECIPES, item.id)}>
                {item.name}
              </Link>
            </li>
          ))
        }
        <li>
          <Link to={getRoute(ROUTE.RECIPES, 2)}>
            Тест
          </Link>
        </li>
      </ul>
    </Layout>
  )
}
