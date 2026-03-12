import { Layout } from '../shared/components/Layout/Layout.tsx';
import { Link } from '../shared/components/Link/Link.tsx';
import { getRoute, ROUTE } from '../shared/constants/routes.ts';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux.tsx';
import {
  selectCreateRecipeLoadingStatus,
  selectFetchRecipesLoadingStatus,
  selectRecipes,
} from '../features/recipes/selectors.ts';
import { createRecipe, deleteRecipe, fetchRecipes } from '../features/recipes/thunks.ts';
import {
  Title,
  List,
  Paper,
  Stack,
  TextInput,
  Textarea,
  Button,
  Center,
  Loader,
  Alert,
  Group,
  ActionIcon,
} from '@mantine/core';
import { LoadingStatus } from '../shared/constants/constants.ts';
import { IconTrash } from '@tabler/icons-react';

export const RecipeBookPage = () => {
  const dispatch = useAppDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [author, setAuthor] = useState('');
  const recipes = useAppSelector(selectRecipes);
  const fetchRecipesLoadingStatus = useAppSelector(selectFetchRecipesLoadingStatus);
  const createRecipeLoadingStatus = useAppSelector(selectCreateRecipeLoadingStatus);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const newRecipe = {
      name: recipeName,
      ingredients: ingredients.split('\n').map((line) => ({
        text: line.trim(),
        tip: null,
      })),
      description: instructions,
      author: author,
    };
    dispatch(createRecipe(newRecipe));
    setRecipeName('');
    setIngredients('');
    setInstructions('');
    setAuthor('');
  };

  const handleDelete = (id: number) => {
    dispatch(deleteRecipe(id));
    console.log('delete');
  };

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Layout>
      <Title order={1} mb="md" c="cyan.8">
        Книга рецептов
      </Title>
      <Paper withBorder radius="md" p="md" mb="lg">
        <Title order={2} mb="md" c="cyan.7">
          Добавить рецепт
        </Title>
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Название"
              value={recipeName}
              onChange={(e) => setRecipeName(e.currentTarget.value)}
              required
            />
            <Textarea
              label="Ингредиенты"
              description="Каждый ингредиент с новой строки"
              minRows={6}
              value={ingredients}
              onChange={(e) => setIngredients(e.currentTarget.value)}
              resize="vertical"
              required
            />
            <Textarea
              label="Инструкции"
              minRows={5}
              value={instructions}
              onChange={(e) => setInstructions(e.currentTarget.value)}
              required
              resize="vertical"
            />
            <TextInput
              label="Ваше имя"
              description="Представьтесь, пожалуйста =)"
              value={author}
              onChange={(e) => setAuthor(e.currentTarget.value)}
            />
            <Button
              color="cyan"
              type="submit"
              loading={createRecipeLoadingStatus === LoadingStatus.LOADING}
            >
              Добавить
            </Button>
            {createRecipeLoadingStatus === LoadingStatus.LOADED && (
              <Alert color="green" title="Готово">
                Рецепт успешно добавлен.
              </Alert>
            )}
            {createRecipeLoadingStatus === LoadingStatus.ERROR && (
              <Alert color="red" title="Ошибка">
                Не удалось сохранить рецепт. Попробуйте ещё раз.
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
      {/* TODO: сделать возможность добавлять ингредиенты с подсказками */}
      {(fetchRecipesLoadingStatus === LoadingStatus.INITIAL ||
        fetchRecipesLoadingStatus === LoadingStatus.LOADING) && (
        <Center py="xl">
          <Loader color="cyan" />
        </Center>
      )}
      {fetchRecipesLoadingStatus === LoadingStatus.ERROR && (
        <>Произошла ошибка загрузки, попробуйте перезагрузить страницу</>
      )}
      {fetchRecipesLoadingStatus === LoadingStatus.LOADED && (
        <List listStyleType="none" spacing="sm" withPadding fz="lg">
          <List.Item>
            <Link to={getRoute(ROUTE.RECIPES, 0)}>{recipes[0].name}</Link>
          </List.Item>
          <List.Item>
            <Link to={getRoute(ROUTE.RECIPES, 1)}>{recipes[1].name}</Link>
          </List.Item>
          {recipes.slice(2).map((item) => (
            <List.Item key={item.id}>
              <Group justify="space-between" gap="sm">
                <Link to={getRoute(ROUTE.RECIPES, item.id)}>{item.name}</Link>
                <ActionIcon
                  onClick={() => handleDelete(item.id)}
                  color="red"
                  variant="light"
                  aria-label="Удалить рецепт"
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </List.Item>
          ))}
          <li>
            <Link to={getRoute(ROUTE.RECIPES, 100)}>Тестовый пустой рецепт</Link>
          </li>
        </List>
      )}
    </Layout>
  );
};
