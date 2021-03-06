import React from 'react';
import { Component, ComponentType } from './component';
import { DropComponentSeparator } from './drop-component-separator';
import { useEditorContext } from './editor-context';
import { ContainerDragItem, DragItem } from './interfaces';
import { Trash } from './trash';


function shiftComponentIndex(diff = 1) {
    return function (component: ContainerDragItem) {
        return {
            ...component,
            index: component.index + diff,
        };
    };
}

export function EditorContainer() {
    const { components, setComponents } = useEditorContext();

    const onDropToTrash = React.useCallback(
        (item) => {
            if (item.index != null) {
                setComponents([
                    ...components.slice(0, item.index),
                    ...components.slice(item.index + 1).map(shiftComponentIndex()),
                ]);
            }
        },
        [components, setComponents]
    );

    const onDropComponent = React.useCallback(
        (item: DragItem, indexPath: number[], index: number) => {
            const componentsWithoutDraggedItem = item.index == null ?
                components
                : [
                    ...components.slice(0, item.index),
                    ...components.slice(item.index + 1)
                ];

            const newComponents = [
                ...componentsWithoutDraggedItem.slice(0, index),
                {
                    ...item,
                    indexPath: [...indexPath, index],
                    index,
                },
                ...componentsWithoutDraggedItem.slice(index)
            ].map((item, index) => ({
                ...item,
                indexPath: [...indexPath, index],
                index
            }));

            setComponents(newComponents);
        },
        [components, setComponents]
    );

    return (
        <div
            className="relative col-start-center grow-1 w-100p min-h-100 bg-white"
        >
            <Trash onDrop={onDropToTrash} />
            <DropComponentSeparator
                accept={[ComponentType.Layout]}
                index={0}
                onDrop={onDropComponent}
            />

            {components.map((item, i) => (
                <React.Fragment key={i}>
                    <Component componentId={item.componentId} item={item}/>
                    <DropComponentSeparator
                        accept={[ComponentType.Layout]}
                        index={i + 1}
                        onDrop={onDropComponent}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}