import React from 'react';
import { useDrop } from 'react-dnd';
import { Component, ComponentType } from './component';
import { ContainerDragItem, DragItem } from './interfaces';

type DropComponentSeparatorProps = {
    accept: ComponentType[];
    item?: ContainerDragItem;
    index: number;
    onDrop: (item: DragItem, indexPath: number[], index: number) => unknown;
}

export function DropComponentSeparator({ onDrop, item, index, accept }: DropComponentSeparatorProps) {
    const [{ canDrop, isOver, draggingItem }, drop] = useDrop({
        accept,
        drop(newItem: DragItem) {
            onDrop(newItem, item?.indexPath ?? [], index);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
            draggingItem: monitor.getItem() as DragItem | undefined,
        }),
    });

    const canDropItem = React.useMemo(
        () => {
            const itemIndex = draggingItem?.index;
            return canDrop
                && draggingItem
                && (itemIndex == null || ![itemIndex, itemIndex + 1].includes(index));
        },
        [canDrop, draggingItem, index]
    );

    const opacity = isOver ? 1 : 0.6;

    return canDropItem ? (
        <div className="col w-100p">
            <div
                ref={drop}
                className='row-center-center w-100p h-32 bg-for-test'
                style={{ opacity }}
            >
                <span>Drop here {index}</span>
            </div>
            {draggingItem && isOver && canDropItem ? (
                <Component
                    componentId={draggingItem.componentId}
                    item={draggingItem}
                />
            ) : null}
        </div>
    ) : null;
}