import { Layout } from '../shared/components/Layout/Layout.tsx';
import { getRoute, ROUTE } from '../shared/constants/routes.ts';
import { Link, Text, Title } from '@/shared/components';

export const MainPage = () => {
  return (
    <Layout>
      <Title mb="md">Обо мне</Title>
      {/* TODO: check Text after modifying Text component for RecipePage */}
      <Text textMode="default">
        Меня зовут Александра. Это главная страничка сайта, который я делаю, чтобы разобраться в
        некоторых технологиях. Для начала я решила создать каталог рецептов, которые использую в
        повседневной жизни или по особым случаям. Вот недавно я ела{' '}
        <Link to={getRoute(ROUTE.RECIPES, 1)} isText>
          рис
        </Link>{' '}
        с курицей, запеченной в духовке, а так же{' '}
        <Link to={getRoute(ROUTE.RECIPES, 0)} isText>
          блинчики со сгущенкой
        </Link>
        .
      </Text>
    </Layout>
  );
};

/* TODO: обращение к рецептам не напрямую по id, а по продукту */
