import { ComponentType } from './component';

export interface DragItem {
  type: keyof typeof ComponentType;
}
