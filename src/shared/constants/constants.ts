export const LoadingStatus = {
  ERROR: 'error',
  INITIAL: 'initial',
  LOADED: 'loaded',
  LOADING: 'loading',
} as const;

export type LoadingStatusType = (typeof LoadingStatus)[keyof typeof LoadingStatus];
