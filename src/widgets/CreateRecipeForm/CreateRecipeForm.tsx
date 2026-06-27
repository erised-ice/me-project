import { type SubmitEvent, useState } from 'react';
import { Stack, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { setRecipeToken } from '@/entities/recipe/lib/storage.ts';
import {
  createRecipe,
  selectCreateRecipeLoadingStatus,
} from '@/entities/recipe/model/createRecipeSlice.ts';
import { Button } from '@/shared/components';
import { LoadingStatus } from '@/shared/constants/constants.ts';
import { useAppDispatch, useAppSelector } from '@/shared/store/store.ts';
{
  /* TODO: сделать возможность добавлять ингредиенты с подсказками */
}
export const CreateRecipeForm = () => {
  const dispatch = useAppDispatch();

  const createRecipeLoadingStatus = useAppSelector(selectCreateRecipeLoadingStatus);

  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [author, setAuthor] = useState('');

  const { t } = useTranslation();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingredientLines = ingredients.split('\n');
    const trimmedIngredientLines = ingredientLines.map((line) => line.trim());
    const nonEmptyIngredientLines = trimmedIngredientLines.filter((line) => line !== '');
    const recipeIngredients = nonEmptyIngredientLines.map((line) => ({
      text: line,
      tip: null,
    }));

    const newRecipe = {
      name: recipeName,
      ingredients: recipeIngredients,
      description: instructions,
      author,
    };

    try {
      const createdRecipeResponse = await dispatch(createRecipe(newRecipe)).unwrap();
      setRecipeToken(createdRecipeResponse.recipe.id, createdRecipeResponse.creatorToken);

      notifications.show({
        color: 'green',
        title: t('common.success'),
        message: t('createRecipeForm.successMessage'),
      });

      setRecipeName('');
      setIngredients('');
      setInstructions('');
      setAuthor('');
    } catch {
      notifications.show({
        color: 'red',
        title: t('common.error'),
        message: t('createRecipeForm.errorMessage'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label={t('createRecipeForm.nameLabel')}
          value={recipeName}
          onChange={(e) => setRecipeName(e.currentTarget.value)}
          required
        />
        <Textarea
          label={t('createRecipeForm.ingredientsLabel')}
          description={t('createRecipeForm.ingredientsDescription')}
          minRows={6}
          value={ingredients}
          onChange={(e) => setIngredients(e.currentTarget.value)}
          required
          autosize
        />
        <Textarea
          label={t('createRecipeForm.instructionsLabel')}
          minRows={5}
          value={instructions}
          onChange={(e) => setInstructions(e.currentTarget.value)}
          required
          autosize
        />
        <TextInput
          label={t('createRecipeForm.authorLabel')}
          description={t('createRecipeForm.authorDescription')}
          value={author}
          onChange={(e) => setAuthor(e.currentTarget.value)}
        />
        <Button type="submit" loading={createRecipeLoadingStatus === LoadingStatus.LOADING}>
          {t('createRecipeForm.submit')}
        </Button>
      </Stack>
    </form>
  );
};
