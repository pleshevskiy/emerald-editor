import { ComponentType } from './component';

export type DragItem = Readonly<{
  type: keyof typeof ComponentType;
  index?: number;
  id?: number;
}>
