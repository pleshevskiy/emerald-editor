import React from 'react';
import { useDrop } from 'react-dnd';
import { ComponentType } from './component';
import { DragItem } from './interfaces';

const trashStyles: React.CSSProperties = {
    top: '16px',
    right: '16px',
    border: '1px solid #000',
    zIndex: 9999,
};

type TrashProps = {
    onDrop: (item: DragItem) => unknown; 
}

export function Trash({ onDrop }: TrashProps) {
    const [{ isOver, draggingItem }, drop] = useDrop({
        accept: [
            ComponentType.Layout,
            ComponentType.Inner
        ],
        drop(item: DragItem) {
            onDrop(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            draggingItem: monitor.getItem(),
        }),
    });

    const opacity = isOver ? 1 : 0.6;

    return draggingItem ? (
        <div
            ref={drop}
            className='absolute p-8 bg-danger-error fg-white'
            style={{...trashStyles, opacity}}
        >
            Delete
        </div>
    ) : null;
}