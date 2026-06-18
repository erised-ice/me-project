import { useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import { CreateRecipeForm } from '@/widgets/CreateRecipeForm/CreateRecipeForm.tsx';
import { RecipeList } from '@/widgets/RecipeList/RecipeList.tsx';
import {
  fetchRecipes,
  selectFetchRecipesLoadingStatus,
  selectRecipes,
} from '@/entities/recipe/model/recipesSlice.ts';
import { Button, Link, LoaderBlock, Text, Title } from '@/shared/components';
import { getRoute, ROUTE } from '@/shared/constants/routes.ts';
import { useAppDispatch, useAppSelector } from '@/shared/store/store.ts';
import { LoadingStatus } from '../shared/constants/constants.ts';

export const RecipeBookPage = () => {
  const dispatch = useAppDispatch();

  const [isModalOpen, { open, close }] = useDisclosure(false);

  const { t } = useTranslation();

  const recipes = useAppSelector(selectRecipes);
  const fetchRecipesLoadingStatus = useAppSelector(selectFetchRecipesLoadingStatus);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout>
      <Title mb="40px" order={1}>
        {t('recipeBookPage.title')}
      </Title>
      <Text mb="md">
        {t('mainPage.heroDescriptionStart')}{' '}
        <Link to={getRoute(ROUTE.RECIPES, 'ris')} isText>
          {t('mainPage.riceRecipeLink')}
        </Link>{' '}
        {t('mainPage.heroDescriptionMiddle')}{' '}
        <Link to={getRoute(ROUTE.RECIPES, 'bliny')} isText>
          {t('mainPage.pancakesRecipeLink')}
        </Link>
        .
      </Text>
      <Text mb="40px">{t('mainPage.heroContributionText')}</Text>
      <Button mb="80px" onClick={() => open()}>
        {t('recipeBookPage.createNewRecipe')}
      </Button>
      <Modal opened={isModalOpen} onClose={close} title={t('recipeBookPage.addRecipeTitle')}>
        <CreateRecipeForm />
      </Modal>
      {(fetchRecipesLoadingStatus === LoadingStatus.INITIAL ||
        fetchRecipesLoadingStatus === LoadingStatus.LOADING) && <LoaderBlock />}
      {fetchRecipesLoadingStatus === LoadingStatus.ERROR && <>{t('recipeBookPage.loadError')}</>}
      {fetchRecipesLoadingStatus === LoadingStatus.LOADED && <RecipeList recipes={recipes} />}
    </Layout>
  );
};
