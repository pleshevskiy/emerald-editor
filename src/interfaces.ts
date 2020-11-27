import React from 'react';
import { ComponentType } from './component';

export enum ParamType {
    Text = 'text',
    MultilineText = 'multiline-text',
    Int = 'integer-number',
}

export type ComponentSourceParam<T> = {
    [P in keyof T]: {
        type: ParamType,
        defaultValue: T[P],
    }
}

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
    componentParams: ComponentSourceParam<T>;
    render: React.FC<RenderComponentProps<T>>;
    renderPreview: React.FC<RenderPreviewProps<T>>;
}>

export type DragItem = Readonly<{
    type: keyof typeof ComponentType;
    componentId: string;
    indexPath: number[];
    index?: number;
    components?: ContainerDragItem[];
    params?: Record<string, string | number | boolean>;
}>

export type ContainerDragItem = DragItem & Required<Pick<DragItem, 'index'>>;
