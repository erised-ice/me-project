import { useEffect } from 'react';
import { Paper } from '@mantine/core';
import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import { CreateRecipeForm } from '@/widgets/CreateRecipeForm/CreateRecipeForm.tsx';
import { RecipeList } from '@/widgets/RecipeList/RecipeList.tsx';
import {
  selectFetchRecipesLoadingStatus,
  selectRecipes,
} from '@/entities/recipe/model/selectors.ts';
import { fetchRecipes } from '@/entities/recipe/model/thunks.ts';
import { LoaderBlock, Title } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/store/store.ts';
import { LoadingStatus } from '../shared/constants/constants.ts';

export const RecipeBookPage = () => {
  const dispatch = useAppDispatch();

  const recipes = useAppSelector(selectRecipes);
  const fetchRecipesLoadingStatus = useAppSelector(selectFetchRecipesLoadingStatus);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout>
      <Title mb="md" order={1}>
        Книга рецептов
      </Title>
      <Paper withBorder radius="md" p="md" mb="lg">
        <Title order={2}>Добавить рецепт</Title>
        <CreateRecipeForm />
      </Paper>
      {(fetchRecipesLoadingStatus === LoadingStatus.INITIAL ||
        fetchRecipesLoadingStatus === LoadingStatus.LOADING) && <LoaderBlock />}
      {fetchRecipesLoadingStatus === LoadingStatus.ERROR && (
        <>Произошла ошибка загрузки рецептов, попробуйте перезагрузить страницу</>
      )}
      {fetchRecipesLoadingStatus === LoadingStatus.LOADED && <RecipeList recipes={recipes} />}
    </Layout>
  );
};
