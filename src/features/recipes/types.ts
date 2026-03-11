export type recipe = {
  id: number;
  name: string;
  ingredients: ingredient[];
  description: string;
  author: string | null;
};

export type ingredient = {
  text: string;
  tip: string | null;
};
