import { useEffect } from 'react';
import { List, Paper, ThemeIcon } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import {
  fetchRecipe,
  selectRecipe,
  selectRecipeLoadingStatus,
} from '@/entities/recipe/model/recipeSlice.ts';
import { LoaderBlock, Text, Title } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/store/store.ts';
import { LoadingStatus } from '../shared/constants/constants.ts';

export const RecipePage = () => {
  const dispatch = useAppDispatch();
  const recipeId = useParams().id;

  useEffect(() => {
    if (recipeId != null) {
      dispatch(fetchRecipe(recipeId));
    }
  }, [dispatch, recipeId]);

  return (
    <Layout>
      <RecipePageComponent />
    </Layout>
  );
};

const RecipePageComponent = () => {
  const recipe = useAppSelector(selectRecipe);
  const fetchRecipeLoadingStatus = useAppSelector(selectRecipeLoadingStatus);
  const { t } = useTranslation();

  if (
    fetchRecipeLoadingStatus === LoadingStatus.INITIAL ||
    fetchRecipeLoadingStatus === LoadingStatus.LOADING
  ) {
    return <LoaderBlock />;
  }

  if (fetchRecipeLoadingStatus === LoadingStatus.ERROR) {
    return <>{t('recipePage.loadError')}</>;
  }

  if (!recipe) {
    return <>{t('recipePage.notFound')}</>;
  }

  return (
    <>
      <Title order={1} mb="md">
        {recipe.name}
      </Title>
      {recipe.ingredients && (
        <Paper withBorder radius="md" p="md" mb="lg">
          <Title order={3} mb="sm">
            {t('recipePage.ingredients')}
          </Title>
          <List
            spacing="sm"
            withPadding
            listStyleType="none"
            fz="lg"
            icon={
              <ThemeIcon color="#AFA7CB" variant="light" size={20} radius="xl">
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
          {t('recipePage.cooking')}
        </Title>
        <Text textMode="accent">{recipe.description}</Text>
        {recipe.author && (
          <Text textMode="note" mb="md">
            {t('recipePage.author')}: {recipe.author}
          </Text>
        )}
      </div>
    </>
  );
};
