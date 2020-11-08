import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { DragItem } from './interfaces';

export enum ComponentType {
    Layout = 'Layout',
    Inner = 'Inner',
}

type ComponentProps = {
    type: ComponentType | keyof typeof ComponentType;
    item?: DragItem;
};

export function Component({ type, item }: ComponentProps) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            ...item,
            type,
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className="row-center-center h-100 w-100p m-t-8 bg-for-test"
            style={isDragging ? {background: 'red'} : {}}
        >
            {type} Component {item?.index ?? ''}
        </div>
    );
}