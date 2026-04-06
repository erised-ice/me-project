import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import { useParams } from 'react-router-dom';
import {
  selectFetchRecipesLoadingStatus,
  selectRecipes,
} from '@/entities/recipe/model/selectors.ts';
import { useEffect } from 'react';
import { fetchRecipes } from '@/entities/recipe/model/thunks.ts';
import { Paper, List, ThemeIcon } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';
import { LoadingStatus } from '../shared/constants/constants.ts';
import { LoaderBlock, Text, Title } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/store/store.ts';

export const RecipePage = () => {
  const dispatch = useAppDispatch();
  //TODO: Сделать отдельный эндпоинт для отдельного рецепта. Соответственно тут переделать логику тоже.

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout>
      <RecipePageComponent />
    </Layout>
  );
};

const RecipePageComponent = () => {
  const recipeId = useParams().id;
  const recipes = useAppSelector(selectRecipes);
  const fetchRecipesLoadingStatus = useAppSelector(selectFetchRecipesLoadingStatus);
  const recipe = recipes.find((item) => item.id === Number(recipeId));

  if (
    fetchRecipesLoadingStatus === LoadingStatus.INITIAL ||
    fetchRecipesLoadingStatus === LoadingStatus.LOADING
  ) {
    return <LoaderBlock />;
  }

  if (fetchRecipesLoadingStatus === LoadingStatus.ERROR) {
    return <>Произошла ошибка загрузки, попробуйте перезагрузить страницу</>;
  }

  if (!recipe) {
    return <>"Кажется вы пытаетесь найти несуществующий рецепт"</>;
  }

  return (
    <>
      <Title order={1} mb="md">
        {recipe.name}
      </Title>
      {recipe.ingredients && (
        <Paper withBorder radius="md" p="md" mb="lg">
          <Title order={3} mb="sm">
            Ингредиенты
          </Title>
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
            {recipe.ingredients.map((item, index) => (
              <List.Item key={`${item.text}-${index}`}>
                {item.text} {item.tip && `(${item.tip})`}
              </List.Item>
            ))}
          </List>
        </Paper>
      )}
      {/*
        TODO: Заметки в скобках сделать как туллтипы
        */}
      <div>
        <Title order={3} mb="xs">
          Приготовление
        </Title>
        <Text textMode="accent">{recipe.description}</Text>
        {recipe.author && (
          <Text textMode="note" mb="md">
            Добавил(а): {recipe.author}
          </Text>
        )}
      </div>
    </>
  );
};
