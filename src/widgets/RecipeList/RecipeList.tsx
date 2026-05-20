import { ActionIcon, Group, List } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import {
  getAdminToken,
  getRecipeToken,
  hasAdminToken,
  hasRecipeToken,
} from '@/entities/recipe/lib/storage.ts';
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

  const handleDelete = async (
    recipeId: number,
    creatorToken: string | undefined,
    adminToken: string | undefined,
  ) => {
    try {
      await dispatch(
        deleteRecipe({
          recipeId,
          creatorToken,
          adminToken,
        }),
      ).unwrap();

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
      {recipes.map((item) => (
        <List.Item key={item.id}>
          <Group justify="space-between" gap="sm">
            <Link to={getRoute(ROUTE.RECIPES, item.slug)}>{item.name}</Link>
            {(hasRecipeToken(item.id) || hasAdminToken()) && (
              <ActionIcon
                onClick={() => handleDelete(item.id, getRecipeToken(item.id), getAdminToken())}
                color="red"
                variant="light"
                aria-label={t('recipeList.deleteAriaLabel')}
              >
                <IconTrash size={18} />
              </ActionIcon>
            )}
          </Group>
        </List.Item>
      ))}
    </List>
  );
};
