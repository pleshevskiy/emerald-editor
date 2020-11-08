import React, { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Component, ComponentType } from './component';
import { DragItem } from './interfaces';
import { Trash } from './trash';


export function EditorContainer() {
    const [components, setComponents] = useState<Required<DragItem>[]>([]);

    const [{ didDrop }, drop] = useDrop({
        accept: [
            ComponentType.Layout,
        ],
        drop(item: DragItem) {
            if (!didDrop) {
                setComponents([
                    ...components,
                    {
                        ...item,
                        index: components.length,
                    }
                ]);
            }
        },
        collect: (monitor) => ({
            didDrop: monitor.didDrop(),
        }),
    });

    const onDropToTrash = useCallback(
        (item) => {
            if (item.index != null) {
                setComponents([
                    ...components.slice(0, item.index),
                    ...components.slice(item.index + 1).map(item => ({
                        ...item,
                        index: item.index - 1,
                    })),
                ]);
            }
        },
        [components]
    );

    return (
        <div
            ref={drop}
            className="relative col-start-center grow-1 w-100p min-h-100 bg-white"
        >
            <Trash onDrop={onDropToTrash} />
            <p>Drop here</p>

            {components.map((item, i) => (
                <Component key={i} type={item.type} item={item} />
            ))}
        </div>
    );
}