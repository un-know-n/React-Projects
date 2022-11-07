//export type CommonEvent = React.SyntheticEvent<HTMLElement>;
export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  currentTarget: T;
};
