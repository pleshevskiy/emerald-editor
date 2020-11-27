import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import invariant from 'tiny-invariant';
import { useComponent } from './component-context';
import { useEditorContext } from './editor-context';
import { ContainerDragItem, DragItem, RenderPreviewProps } from './interfaces';
import { isContainerDragItem } from './misc';

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
    invariant(source, 'You cannot use a not-existent component');

    const { components, setComponents, setChosenComponent } = useEditorContext();

    const sourceParams = Object.fromEntries(
        Object.entries(source.componentParams)
            .map(([key, config]) => [key, config.defaultValue])
    );

    const componentParams = item?.params ?? sourceParams;
    const [collectedProps, drag] = useDrag({
        item: {
            ...item,
            indexPath: item?.indexPath ?? [],
            params: componentParams,
            componentId: source.id,
            type: source.type,
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const updateItem = React.useCallback(
        (item: ContainerDragItem) => {
            setComponents([
                ...components.slice(0, item.index),
                item,
                ...components.slice(item.index + 1),
            ]);
        },
        [components, setComponents]
    );

    const renderComponentData: RenderPreviewProps<Record<string, string | number | boolean>> = {
        componentParams,
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
        (e: Event) => {
            e.stopPropagation();
            return renderedItem && isContainerDragItem(item) ?
                setChosenComponent(item)
                : void 0;
        },
        [renderedItem, item, setChosenComponent]
    );

    return renderedItem ? React.cloneElement(renderedItem, { ref: drag, onClick }) : null;
}
