// Action creator
export const createAction = <T, P>(type: T, payload: P) => ({ type, payload })

// Reducers types
export type ReducerAction<T, P> = {
  type: T;
  payload: P;
};
