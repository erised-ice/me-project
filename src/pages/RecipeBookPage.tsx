import {Layout} from "../shared/components/Layout/Layout.tsx";
import {Link} from "../shared/components/Link/Link.tsx";
import {getRoute, ROUTE} from "../shared/constants/routes.ts";
import {type SyntheticEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux.tsx";
import {selectRecipes} from "../features/recipes/selectors.ts";
import {createRecipe, fetchRecipes} from "../features/recipes/thunks.ts";
import { Title, List, Paper, Stack, TextInput, Textarea, Button} from "@mantine/core";

export const RecipeBookPage = () => {
  const dispatch = useAppDispatch();
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [author, setAuthor] = useState("");
  const recipes = useAppSelector(selectRecipes);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const newRecipe = {
      name: recipeName,
      ingredients: ingredients.split("\n").map((line, index) => ({
        id: index,
        text: line.trim(),
        tip: null,
        }),),
      description: instructions,
      author: author,
    };
    dispatch(createRecipe(newRecipe));
    setRecipeName("");
    setIngredients("");
    setInstructions("");
    setAuthor("");
  }

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout>
      <Title order={1} mb="md" c="cyan.8">Книга рецептов</Title>
      <Paper withBorder radius="md" p="md" mb="lg">
          <Title order={2} mb="md" c="cyan.7">Добавить рецепт</Title>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
            <TextInput label="Название"
                       value={recipeName}
                       onChange={(e) => setRecipeName(e.currentTarget.value)}
                       required
            />
            <Textarea
              label="Ингредиенты"
              description="Каждый ингредиент с новой строки"
              minRows={4}
              value={ingredients}
              onChange={(e) => setIngredients(e.currentTarget.value)}
              required
            />
            <Textarea
              label="Инструкции"
              minRows={5}
              value={instructions}
              onChange={(e) => setInstructions(e.currentTarget.value)}
              required
            />
            <TextInput label="Ваше имя"
                       description="Представьтесь, пожалуйста =)"
                         value={author}
                         onChange={(e) => setAuthor(e.currentTarget.value)}
            />
            <Button color="cyan" type="submit" >Добавить</Button>
            </Stack>
          </form>
      </Paper>
      {/* TODO: сделать возможность добавлять ингредиенты с подсказками */}
      <List
        listStyleType="none"
        spacing="sm"
        withPadding
        fz="lg"
      >
        {
          recipes.map(item => (
            <li key={item.id}>
              <Link to={getRoute(ROUTE.RECIPES, item.id)}>
                {item.name}
              </Link>
            </li>
          ))
        }
      </List>
    </Layout>
  )
}
