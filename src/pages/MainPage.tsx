import { useEffect } from 'react';
import { SimpleGrid } from '@mantine/core';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import { RecipeCard } from '@/widgets/RecipeCard';
import {
  fetchRecipes,
  selectFetchRecipesLoadingStatus,
  selectRecipes,
} from '@/entities/recipe/model/recipesSlice.ts';
import { Button, LoaderBlock, Text, Title } from '@/shared/components';
import { LoadingStatus } from '@/shared/constants/constants.ts';
import { useAppDispatch, useAppSelector } from '@/shared/store/store.ts';
import { getRoute, ROUTE } from '../shared/constants/routes.ts';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const recipes = useAppSelector(selectRecipes);
  const fetchRecipesLoadingStatus = useAppSelector(selectFetchRecipesLoadingStatus);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout>
      <section className={styles.heroBlock}>
        <Title className={styles.heroTitle}>{t('mainPage.heroTitle')}</Title>
        <Button component={RouterLink} to={ROUTE.RECIPES}>
          {t('mainPage.heroButton')}
        </Button>
      </section>
      <Text className={styles.text}>{t('mainPage.introText')}</Text>
      {(fetchRecipesLoadingStatus === LoadingStatus.INITIAL ||
        fetchRecipesLoadingStatus === LoadingStatus.LOADING) && <LoaderBlock />}
      {fetchRecipesLoadingStatus === LoadingStatus.ERROR && <>{t('recipeBookPage.loadError')}</>}
      {fetchRecipesLoadingStatus === LoadingStatus.LOADED && (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: '20px', md: '50px' }}>
          {recipes.slice(0, 6).map((item) => (
            <RecipeCard
              className={cx(styles.card)}
              key={item.id}
              link={getRoute(ROUTE.RECIPES, item.slug)}
              title={item.name}
              instruction={item.description}
              canDelete={false}
              deleteAriaLabel={t('recipeList.deleteAriaLabel')}
            />
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
};
