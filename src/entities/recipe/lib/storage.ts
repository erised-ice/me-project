const RECIPE_TOKENS_LS_KEY = 'recipeTokens' as const;
const ADMIN_TOKEN_LS_KEY = 'adminToken' as const;

export const getRecipeTokens = () => {
  const raw = localStorage.getItem(RECIPE_TOKENS_LS_KEY);

  return raw ? JSON.parse(raw) : null;
};

export const getAdminToken = () => {
  const raw = localStorage.getItem(ADMIN_TOKEN_LS_KEY);

  return raw ? raw : undefined;
};

export const hasAdminToken = () => {
  return Boolean(getAdminToken());
};

export const getRecipeToken = (id: number) => {
  const value = getRecipeTokens();
  return hasRecipeToken(id) ? value[id] : undefined;
};

export const hasRecipeToken = (id: number) => {
  const value = getRecipeTokens();

  return value !== null && String(id) in value;
};

export const setRecipeToken = (id: number, token: string) => {
  const previousValues = getRecipeTokens();
  const result = {
    [id]: token,
  };

  if (!previousValues) {
    localStorage.setItem(RECIPE_TOKENS_LS_KEY, JSON.stringify(result));
  } else {
    localStorage.setItem(RECIPE_TOKENS_LS_KEY, JSON.stringify({ ...previousValues, ...result }));
  }
};
