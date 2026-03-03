export type recipe = {
  id: number,
  name: string,
  ingredients: ingredient[],
  description: string,
}

export type ingredient = {
  id: number,
  text: string,
  tip: string | null,
}