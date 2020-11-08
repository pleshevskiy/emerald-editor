import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Component, ComponentType } from './component';
import { DragItem } from './interfaces';


export function EditorContainer() {
    const [components, setComponents] = useState<DragItem[]>([]);

    const [{ isOver, canDrop, draggingItem }, drop] = useDrop({
        accept: [
            ComponentType.Layout,
        ],
        drop(item: DragItem) {
            setComponents([...components, item]);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggingItem: monitor.getItem(),
        }),
    });

    const opacity = isOver || !draggingItem ? 1 : 0.7;

    return (
        <div
            ref={drop}
            className="col-start-center grow-1 w-100p min-h-100 bg-white"
            style={{opacity}}
        >
            <p>Drop here</p>

            {components.map((item, i) => (
                <Component key={i} type={item.type} />
            ))}
        </div>
    );
}