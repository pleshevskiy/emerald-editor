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
            className="row-center-center h-100 w-100p bg-for-test"
            style={isDragging && item?.index != null ? { opacity: 0.5 } : {}}
        >
            {type} Component {item?.id ?? ''} {item?.index ?? ''}
        </div>
    );
}