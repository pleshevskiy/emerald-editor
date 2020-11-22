import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { useComponent } from './component-context';
import { useEditorContext } from './editor-context';
import { DragItem } from './interfaces';

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
    const { setChosenComponentIndex } = useEditorContext();

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

    const renderComponentData = {
        item,
        componentParams: source.componentParams,
        collectedProps,
    };

    const renderedItem = item ?
        source.render(renderComponentData)
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
