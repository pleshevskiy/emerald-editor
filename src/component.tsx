import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';

export enum ComponentType {
    Layout = 'Layout',
    Inner = 'Inner',
}

type ComponentProps = {
    type: ComponentType | keyof typeof ComponentType;
};

export function Component({ type }: ComponentProps) {
    const [{ isDragging }, drag] = useDrag({
        item: { type },
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
            {type} Component
        </div>
    );
}