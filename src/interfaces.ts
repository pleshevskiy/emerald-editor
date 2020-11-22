import React from 'react';
import { ComponentType } from './component';

export type ComponentDragCollectedProps = Readonly<{
    isDragging: boolean;
}>

export type RenderComponentProps<T> = {
    item?: DragItem;
    componentParams: T;
    collectedProps: ComponentDragCollectedProps;
}

export type ComponentSource<T> = Readonly<{
    type: ComponentType;
    id: string;
    componentParams: T;
    render: React.FC<RenderComponentProps<T>>;
    renderPreview: React.FC<RenderComponentProps<T>>;
}>

export type DragItem = Readonly<{
    type: keyof typeof ComponentType;
    componentId: string;
    index?: number;
}>
