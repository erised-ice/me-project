import { ActionIcon, Group, List } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { deleteRecipe } from '@/entities/recipe/model/deleteRecipeSlice.ts';
import type { Recipe } from '@/entities/recipe/model/types.ts';
import { Link } from '@/shared/components';
import { getRoute, ROUTE } from '@/shared/constants/routes.ts';
import { useAppDispatch } from '@/shared/store/store.ts';

type RecipeListProps = {
  recipes: Recipe[];
};

export const RecipeList = ({ recipes }: RecipeListProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteRecipe(id)).unwrap();

      notifications.show({
        color: 'green',
        title: t('common.success'),
        message: t('recipeList.deleteSuccessMessage'),
      });
    } catch {
      notifications.show({
        color: 'red',
        title: t('common.error'),
        message: t('recipeList.deleteErrorMessage'),
      });
    }
  };

  return (
    <List listStyleType="none" spacing="sm" withPadding fz="lg">
      {/*TODO: убрать логику с особым обращением с первым и вторым рецептом, когда будет другая защита от удаления */}
      <List.Item>
        <Link to={getRoute(ROUTE.RECIPES, recipes[0].slug)}>{recipes[0].name}</Link>
      </List.Item>
      <List.Item>
        <Link to={getRoute(ROUTE.RECIPES, recipes[1].slug)}>{recipes[1].name}</Link>
      </List.Item>
      {recipes.slice(2).map((item) => (
        <List.Item key={item.id}>
          <Group justify="space-between" gap="sm">
            <Link to={getRoute(ROUTE.RECIPES, item.slug)}>{item.name}</Link>
            <ActionIcon
              onClick={() => handleDelete(item.id)}
              color="red"
              variant="light"
              aria-label={t('recipeList.deleteAriaLabel')}
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
