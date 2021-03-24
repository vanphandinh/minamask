export enum Laser {
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
}

export interface LaserMeta {
  src: string
  name: string
}

export interface FigureConfig {
  x?: number
  y?: number
  width?: number
  height?: number
}
