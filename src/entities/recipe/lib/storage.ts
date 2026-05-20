const RECIPE_TOKENS_LS_KEYS = 'recipeTokens' as const;

export const getRecipeTokens = () => {
  const raw = localStorage.getItem(RECIPE_TOKENS_LS_KEYS);

  return raw ? JSON.parse(raw) : null;
};

export const getRecipeToken = (id: number) => {
  const value = getRecipeTokens();
  return hasRecipeToken(id) ? value[id] : null;
};

export const hasRecipeToken = (id: number) => {
  const value = getRecipeTokens();

  return String(id) in value;
};

export const setRecipeToken = (id: number, token: string) => {
  const previousValues = getRecipeTokens();
  const result = {
    [id]: token,
  };

  if (!previousValues) {
    localStorage.setItem(RECIPE_TOKENS_LS_KEYS, JSON.stringify(result));
  } else {
    localStorage.setItem(RECIPE_TOKENS_LS_KEYS, JSON.stringify({ ...previousValues, ...result }));
  }
};
