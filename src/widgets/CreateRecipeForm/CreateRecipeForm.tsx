import { type SubmitEvent, useState } from 'react';
import { Stack, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
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
      await dispatch(createRecipe(newRecipe)).unwrap();

      notifications.show({
        color: 'green',
        title: 'Готово',
        message: 'Рецепт успешно добавлен',
      });

      setRecipeName('');
      setIngredients('');
      setInstructions('');
      setAuthor('');
    } catch {
      notifications.show({
        color: 'red',
        title: 'Ошибка',
        message: 'Не удалось сохранить рецепт. Попробуйте ещё раз.',
      });
    }
  };

  return (
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
  );
};
