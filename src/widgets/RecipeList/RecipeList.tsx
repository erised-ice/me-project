import { useState } from 'react';
import { Group, Modal, SimpleGrid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { RecipeCard } from '@/widgets/RecipeCard';
import {
  getAdminToken,
  getRecipeToken,
  hasAdminToken,
  hasRecipeToken,
} from '@/entities/recipe/lib/storage.ts';
import { deleteRecipe } from '@/entities/recipe/model/deleteRecipeSlice.ts';
import type { Recipe } from '@/entities/recipe/model/types.ts';
import { Button } from '@/shared/components';
import { getRoute, ROUTE } from '@/shared/constants/routes.ts';
import { useAppDispatch } from '@/shared/store/store.ts';

type RecipeListProps = {
  recipes: Recipe[];
};

export const RecipeList = ({ recipes }: RecipeListProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

  const handleOpenDeleteModal = (recipe: Recipe) => {
    setRecipeToDelete(recipe);
    open();
  };

  const handleCloseDeleteModal = () => {
    setRecipeToDelete(null);
    close();
  };

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

      handleCloseDeleteModal();
    } catch {
      notifications.show({
        color: 'red',
        title: t('common.error'),
        message: t('recipeList.deleteErrorMessage'),
      });
    }
  };

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {recipes.map((item) => (
          <RecipeCard
            key={item.id}
            link={getRoute(ROUTE.RECIPES, item.slug)}
            title={item.name}
            instruction={item.description}
            canDelete={hasRecipeToken(item.id) || hasAdminToken()}
            onDelete={() => handleOpenDeleteModal(item)}
            deleteAriaLabel={t('recipeList.deleteAriaLabel')}
          />
        ))}
      </SimpleGrid>
      <Modal
        opened={isModalOpen}
        onClose={handleCloseDeleteModal}
        title={t('recipeList.deleteConfirmTitle')}
      >
        <Text mb="md">
          {recipeToDelete
            ? t('recipeList.deleteConfirmMessage', { name: recipeToDelete.name })
            : t('recipeList.deleteConfirmFallbackMessage')}
        </Text>
        <Group justify="flex-end">
          <Button onClick={handleCloseDeleteModal}>{t('common.cancel')}</Button>
          <Button
            color="red"
            onClick={() => {
              if (recipeToDelete) {
                handleDelete(recipeToDelete.id, getRecipeToken(recipeToDelete.id), getAdminToken());
              }
            }}
          >
            {t('common.delete')}
          </Button>
        </Group>
      </Modal>
    </>
  );
};
