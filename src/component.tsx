import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { useComponent } from './component-context';
import { useEditorContext } from './editor-context';
import { ContainerDragItem, DragItem } from './interfaces';

export enum ComponentType {
    Layout = 'Layout',
    Inner = 'Inner',
}

export type ComponentProps = {
    item?: DragItem;
    componentId: string;
};

export function Component({ item, componentId }: ComponentProps) {
    const [source] = useComponent({ componentId });
    const editorContext = useEditorContext();
    const { components, setComponents, setChosenComponentIndex } = editorContext;

    const [collectedProps, drag] = useDrag({
        item: {
            ...item,
            componentId: source.id,
            type: source.type,
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const updateItem = React.useCallback(
        (item: ContainerDragItem) => {
            console.log(item);
            setComponents([
                ...components.slice(0, item.index),
                item,
                ...components.slice(item.index + 1),
            ]);
        },
        [components, setComponents]
    );

    const renderComponentData = {
        componentParams: source.componentParams,
        collectedProps,
    };

    const renderedItem = item?.index != null ?
        source.render({
            ...renderComponentData,
            item: item as ContainerDragItem,
            updateItem,
        })
        : source.renderPreview(renderComponentData);

    const onClick = React.useCallback(
        () => {
            return renderedItem && item?.index != null ?
                setChosenComponentIndex(item.index)
                : void 0;
        },
        [renderedItem, item, setChosenComponentIndex]
    );

    return renderedItem ? React.cloneElement(renderedItem, { ref: drag, onClick }) : null;
}
