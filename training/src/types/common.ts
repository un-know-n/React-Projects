export type TProperties<T> = T extends { [key: string]: infer U } ? U : never;

//Create the return type of action functions automatically
export type TInferActions<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<TProperties<T>>;
