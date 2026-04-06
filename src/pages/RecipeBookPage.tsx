import { Layout } from '@/pages/_shared/Layout/Layout.tsx';
import { getRoute, ROUTE } from '../shared/constants/routes.ts';
import { type SubmitEvent, useEffect, useState } from 'react';
import {
  selectCreateRecipeLoadingStatus,
  selectFetchRecipesLoadingStatus,
  selectRecipes,
} from '@/entities/recipe/model/selectors.ts';
// TODO настроить линтер, чтобы был порядок импортов simple-import-sort/imports eslint (react всегда в начале, относительные пути в конце (но лучше узнать еще у ИИ)
import { createRecipe, deleteRecipe, fetchRecipes } from '@/entities/recipe/model/thunks.ts';
import { List, Paper, Stack, TextInput, Textarea, Group, ActionIcon } from '@mantine/core';
import { LoadingStatus } from '../shared/constants/constants.ts';
import { IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { Button, Link, LoaderBlock, Title } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/store/store.ts';

export const RecipeBookPage = () => {
  const dispatch = useAppDispatch();

  const recipes = useAppSelector(selectRecipes);
  const fetchRecipesLoadingStatus = useAppSelector(selectFetchRecipesLoadingStatus);
  const createRecipeLoadingStatus = useAppSelector(selectCreateRecipeLoadingStatus);

  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
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

    /*TODO: Сделать проверку на пустые строки ингридиентов (чтобы пустые строки не рендерелись) */
    //TODO: Отрпавку рецепта тоже по такому же образу как делит сделать через промисы и трай кэтч (соотв. и нотификации)
    dispatch(createRecipe(newRecipe));

    /*TODO: Убрать автоматическую очистку формы, сделать по-другому, чтобы можно было отредактировать в случае неудачи */
    setRecipeName('');
    setIngredients('');
    setInstructions('');
    setAuthor('');
  };

  //TODO: Разобраться почему мы это все тут объединили, вместо привязки к лоадерам через юз эффект, особенно про анврап. Но тут происходит вот что: (как я поняла на первый раз) делит ресипе запускается асинхронно, и дальше если успех то показываем зеленую, если ошибка, то красную (тут все дело в промисах)
  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteRecipe(id)).unwrap();

      notifications.show({
        color: 'green',
        title: 'Готово',
        message: 'Рецепт успешно удалён',
      });
    } catch {
      notifications.show({
        color: 'red',
        title: 'Ошибка',
        message: 'Не удалось удалить рецепт. Попробуйте ещё раз.',
      });
    }
  };

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (createRecipeLoadingStatus === LoadingStatus.LOADED) {
      notifications.show({
        color: 'green',
        title: 'Готово',
        message: 'Рецепт успешно добавлен',
      });
    }

    if (createRecipeLoadingStatus === LoadingStatus.ERROR) {
      notifications.show({
        color: 'red',
        title: 'Ошибка',
        message: 'Не удалось сохранить рецепт. Попробуйте ещё раз.',
      });
    }
  }, [createRecipeLoadingStatus]);
  /*TODO: форму со всей ее логикой вынести в папку виджеты. Список рецептов со страницы рецепта тоже туда. */
  return (
    <Layout>
      <Title mb="md" order={1}>
        Книга рецептов
      </Title>
      <Paper withBorder radius="md" p="md" mb="lg">
        <Title order={2}>Добавить рецепт</Title>
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
            <Button type="submit" loading={createRecipeLoadingStatus === LoadingStatus.LOADING}>
              Добавить
            </Button>
          </Stack>
        </form>
      </Paper>
      {/* TODO: сделать возможность добавлять ингредиенты с подсказками */}
      {(fetchRecipesLoadingStatus === LoadingStatus.INITIAL ||
        fetchRecipesLoadingStatus === LoadingStatus.LOADING) && <LoaderBlock />}
      {fetchRecipesLoadingStatus === LoadingStatus.ERROR && (
        <>Произошла ошибка загрузки, попробуйте перезагрузить страницу</>
      )}
      {fetchRecipesLoadingStatus === LoadingStatus.LOADED && (
        <List listStyleType="none" spacing="sm" withPadding fz="lg">
          <List.Item>
            <Link to={getRoute(ROUTE.RECIPES, 1)}>{recipes[0].name}</Link>
          </List.Item>
          <List.Item>
            <Link to={getRoute(ROUTE.RECIPES, 2)}>{recipes[1].name}</Link>
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
