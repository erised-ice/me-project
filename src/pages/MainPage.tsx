import { Box, Container, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import { Button, Link, Text, Title } from '@/shared/components';
import { getRoute, ROUTE } from '../shared/constants/routes.ts';

export const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Layout withContainer={false}>
      <Box bg="cyan.6" py={{ base: 56, sm: 120 }}>
        <Container size="lg" px="md">
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
    </Layout>
  );
};
