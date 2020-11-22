import React from 'react';
import { ComponentType } from './component';

export type ComponentDragCollectedProps = Readonly<{
    isDragging: boolean;
}>

export type RenderPreviewProps<T> = Readonly<{
    componentParams: T;
    collectedProps: ComponentDragCollectedProps;
}>

export type RenderComponentProps<T> = Readonly<
    RenderPreviewProps<T>
    & {
        item: ContainerDragItem;
        updateItem: (item: ContainerDragItem) => unknown;
    }
>

export type ComponentSource<T> = Readonly<{
    type: ComponentType;
    id: string;
    componentParams: T;
    render: React.FC<RenderComponentProps<T>>;
    renderPreview: React.FC<RenderPreviewProps<T>>;
}>

export type DragItem = Readonly<{
    type: keyof typeof ComponentType;
    componentId: string;
    index?: number;
    components?: ContainerDragItem[];
}>

export type ContainerDragItem = DragItem & Required<Pick<DragItem, 'index'>>;
