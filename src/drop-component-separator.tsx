import React from 'react';
import { useDrop } from 'react-dnd';
import { Component, ComponentType } from './component';
import { DragItem } from './interfaces';

const separatorStyles: React.CSSProperties = {
};

type DropComponentSeparatorProps = {
    index: number;
    onDrop: (item: DragItem, index: number) => unknown; 
}

export function DropComponentSeparator({ onDrop, index }: DropComponentSeparatorProps) {
    const [{ isOver, didDrop, draggingItem }, drop] = useDrop({
        accept: [
            ComponentType.Layout,
        ],
        drop(item: DragItem) {
            if (!didDrop) {
                onDrop(item, index);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            didDrop: monitor.didDrop(),
            draggingItem: monitor.getItem() as DragItem | undefined,
        }),
    });

    const opacity = isOver ? 1 : 0.6;
    const canDrop = React.useMemo(
        () => {
            const itemIndex = draggingItem?.index;
            return isOver
                && draggingItem
                && (itemIndex == null || ![itemIndex, itemIndex + 1].includes(index));
        },
        [draggingItem, isOver, index]
    );

    return (
        <>
            {draggingItem ? (
                <div
                    ref={drop}
                    className='row-center-center w-100p h-32 bg-for-test'
                    style={{...separatorStyles, opacity}}
                >
                    <span>Drop here {index}</span>
                </div>
            ) : null}
            {draggingItem && canDrop ? (
                <Component
                    type={draggingItem.type}
                    item={draggingItem}
                />
            ) : null}
        </>
    );
}