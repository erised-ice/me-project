import { ActionIcon, Group, List } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { deleteRecipe } from '@/entities/recipe/model/thunks.ts';
import type { Recipe } from '@/entities/recipe/model/types.ts';
import { Link } from '@/shared/components';
import { getRoute, ROUTE } from '@/shared/constants/routes.ts';
import { useAppDispatch } from '@/shared/store/store.ts';

type RecipeListProps = {
  recipes: Recipe[];
};

export const RecipeList = ({ recipes }: RecipeListProps) => {
  const dispatch = useAppDispatch();

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

  return (
    <List listStyleType="none" spacing="sm" withPadding fz="lg">
      {/*TODO: убрать логику с особым обращением с первым и вторым рецептом, когда будет другая защита от удаления */}
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
  );
};
