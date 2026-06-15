import { Box, Container, Stack } from '@mantine/core';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import { RecipeCard } from '@/widgets/RecipeCard';
import {fetchRecipes, selectRecipes} from '@/entities/recipe/model/recipesSlice.ts';
import { Button, Link, Text, Title } from '@/shared/components';
import {useAppDispatch, useAppSelector} from '@/shared/store/store.ts';
import { getRoute, ROUTE } from '../shared/constants/routes.ts';
import styles from './MainPage.module.scss';
import {useEffect} from "react";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const recipes = useAppSelector(selectRecipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout withContainer={false}>
      <Box bg="cyan.6" py={{ base: 56, sm: 120 }}>
        <Container size="xl" px="md">
          <Title order={1} c="cyan.0" mb="lg">
            {t('mainPage.heroTitle')}
          </Title>
          <Stack align="flex-start" gap="lg" maw={720}>
            <Text textMode="default" c="cyan.0">
              {t('mainPage.heroDescriptionStart')}{' '}
              <Link to={getRoute(ROUTE.RECIPES, 'ris')} isText variant="light">
                {t('mainPage.riceRecipeLink')}
              </Link>{' '}
              {t('mainPage.heroDescriptionMiddle')}{' '}
              <Link to={getRoute(ROUTE.RECIPES, 'bliny')} isText variant="light">
                {t('mainPage.pancakesRecipeLink')}
              </Link>
              .
            </Text>
            <Text textMode="default" c="cyan.0">
              {t('mainPage.heroContributionText')}
            </Text>
            <Button component={RouterLink} to={ROUTE.RECIPES} variant="white" color="cyan">
              {t('mainPage.heroButton')}
            </Button>
          </Stack>
        </Container>
      </Box>
      <section className={cx(styles.recipes)}>
        {recipes.map((item) => (
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
      </section>
    </Layout>
  );
};
