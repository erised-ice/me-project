import {Layout} from "../shared/components/Layout/Layout.tsx";
import {Link} from "../shared/components/Link/Link.tsx";
import {getRoute, ROUTE} from "../shared/constants/routes.ts";
import {type SyntheticEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux.tsx";
import {selectRecipes} from "../features/recipes/selectors.ts";
import {addRecipe} from "../features/recipes/recipesSlice.ts";

export const RecipeBookPage = () => {
  const dispatch = useAppDispatch();
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const recipes = useAppSelector(selectRecipes);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const newRecipe = {
      id: Date.now(),/* TODO: Сделать более правильный вариант присвоения ID */
      name: recipeName,
      ingredients: ingredients.split("\n").map((line, index) => ({
        id: index,
        text: line.trim(),
        tip: null,
        }),),
      description: instructions
    };
    dispatch(addRecipe(newRecipe));
    setRecipeName("");
    setIngredients("");
    setInstructions("");
  }

  return (
    <Layout>
      <h1>Книга рецептов</h1>
      <h2>Добавить рецепт</h2>
      {/* TODO: сделать возможность добавлять ингредиенты с подсказками */}
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
          recipes.map(item => (
            <li key={item.id}>
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
