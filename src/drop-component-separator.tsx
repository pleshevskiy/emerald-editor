import React from 'react';
import { useDrop } from 'react-dnd';
import { Component, ComponentType } from './component';
import { DragItem } from './interfaces';

type DropComponentSeparatorProps = {
    index: number;
    onDrop: (item: DragItem, index: number) => unknown; 
}

export function DropComponentSeparator({ onDrop, index }: DropComponentSeparatorProps) {
    const [{ isOver, draggingItem }, drop] = useDrop({
        accept: [
            ComponentType.Layout,
        ],
        drop(item: DragItem, monitor) {
            if (!monitor.didDrop) {
                onDrop(item, index);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            draggingItem: monitor.getItem() as DragItem | undefined,
        }),
    });

    const canDrop = React.useMemo(
        () => {
            const itemIndex = draggingItem?.index;
            return draggingItem
                && (itemIndex == null || ![itemIndex, itemIndex + 1].includes(index));
        },
        [draggingItem, index]
    );

    const opacity = isOver ? 1 : 0.6;

    return (
        <>
            {canDrop ? (
                <div
                    ref={drop}
                    className='row-center-center w-100p h-32 bg-for-test'
                    style={{ opacity }}
                >
                    <span>Drop here {index}</span>
                </div>
            ) : null}
            {draggingItem && isOver && canDrop ? (
                <Component
                    type={draggingItem.type}
                    item={draggingItem}
                />
            ) : null}
        </>
    );
}