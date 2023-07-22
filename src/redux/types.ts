export enum Color {
  RED,
  GREEN,
  BLUE,
}

export interface User {
  color: Color;
  name: string;
  speed: number;
  time: number;
}

export interface StateRedux {
  riders: User[];
}
