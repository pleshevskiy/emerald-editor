import { ContainerDragItem, DragItem } from './interfaces';


export function isContainerDragItem(item?: DragItem): item is ContainerDragItem {
    return item?.index != null;
}
