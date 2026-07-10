export type Recipe = {
  id: number;
  name: string;
  ingredients: Ingredient[];
  description: string;
  author: string | null;
  slug: string;
  category: string | null;
};

export type Ingredient = {
  text: string;
  tip: string | null;
};
