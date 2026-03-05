import {Layout} from "../shared/components/Layout/Layout.tsx";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux.tsx";
import {selectRecipes} from "../features/recipes/selectors.ts";
import {useEffect} from "react";
import {fetchRecipes} from "../features/recipes/thunks.ts";
import {Title, Text, Paper, List, ThemeIcon } from "@mantine/core";
import { IconChefHat } from "@tabler/icons-react";

export const RecipePage = () => {
  const dispatch = useAppDispatch();
  const recipeId = useParams().id;
  const recipes = useAppSelector(selectRecipes);
  const recipe = recipes.find(item => item.id === Number(recipeId));

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout>
      {recipe ? (
        <>
          <Title order={1} mb="md" c="cyan.8">{recipe.name}</Title>
          {recipe.ingredients && (
            <Paper withBorder radius="md" p="md" mb="lg">
              <Title order={3} mb="sm">Ингредиенты</Title>
              <List
                spacing="sm"
                withPadding
                listStyleType="none"
                fz="lg"
                icon={
                  <ThemeIcon color="cyan" variant="light" size={20} radius="xl">
                    <IconChefHat size={14} />
                  </ThemeIcon>
                }
              >
                {recipe.ingredients.map(item => (
                  <List.Item key={item.id}>{item.text} {item.tip && `(${item.tip})`}</List.Item>
                ))}
              </List>
            </Paper>
          )}
            {/*
        Заметки в скобках сделать как туллтипы
        */}
          <div>
            <Title order={3} mb="xs">Приготовление</Title>
            <Text size="lg" lh={1.6} c="cyan.9">
              {recipe.description}
            </Text>
          </div>
        </>
      ) : (
        <>
          "Кажется вы пытаетесь найти несуществующий рецепт"
        </>
      )}
    </Layout>
  )
}