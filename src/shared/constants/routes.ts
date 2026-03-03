export const ROUTE = {
  HOME: "/",
  RECIPES: "/recipes",
} as const;

type RouteValue = (typeof ROUTE)[keyof typeof ROUTE];

export const getRoute = (route: RouteValue, id: number | string): string => `${route}/${id}`;
