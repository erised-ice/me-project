import {Layout} from "../shared/components/Layout/Layout.tsx";
import {useParams} from "react-router-dom";
import {recipes} from "../shared/data/data.ts";

export const RecipePage = () => {
  const recipeId = useParams().id;
  const recipe = recipes.find(item => item.id === Number(recipeId));

  return (
    <Layout>
      {recipe ? (
        <>
          <h1>{recipe.name}</h1>
          {recipe.ingredients && (
            <ul>
              {recipe.ingredients.map(item => (
                <li key={item.id}>{item.text} {item.tip && `(${item.tip})`}</li>
              ))}
            </ul>
          )}
            {/*
        Заметки в скобках сделать как туллтипы
        */}
          {recipe.description}
        </>
      ) : (
        <>
          "Кажется вы пытаетесь найти несуществующий рецепт"
        </>
      )}
    </Layout>
  )
}