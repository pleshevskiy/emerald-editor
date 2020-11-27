import React from 'react';
import { Component, ComponentType } from '../../component';
import { DropComponentSeparator } from '../../drop-component-separator';
import { ComponentSource, ComponentSourceParam, DragItem, ParamType } from '../../interfaces';

export type EmailRowParams = {
    columns: number;
}

export const EmailRowSource: ComponentSource<EmailRowParams> = {
    type: ComponentType.Layout,
    id: 'email-row',
    componentParams: {
        columns: {
            type: ParamType.Int,
            defaultValue: 1,
        },
    },
    renderPreview({ componentParams }) {
        return (
            <div className='col-start-center w-100p p-4'>
                <h3>Row</h3>
                <div className="row-center-center w-100p p-4">
                    {Object.keys(new Array(componentParams.columns).fill(0)).map((column => (
                        <div key={column} className="grow-1 row-center-center">Column {column}</div>
                    )))}
                </div>
            </div>
        );
    },
    render({ item, componentParams, updateItem }) {
        function onDropComponent(newItem: DragItem, indexPath: number[], index: number) {
            updateItem({
                ...item,
                components: [
                    ...(item?.components?? []),
                    {
                        ...newItem,
                        indexPath: [...indexPath, index],
                        index,
                    }
                ]
            });
        }

        return (
            <div className='col-start-start w-100p p-4'>
                <div className="row-center-start w-100p p-4">
                    {Object.keys(new Array(componentParams.columns).fill(0)).map(((column, index) => {
                        const innerItem = item.components?.find(component => component.index === index);

                        return (
                            <div
                                key={column}
                                className="grow-1"
                            >
                                <span>[{item.indexPath.join(', ')}]</span>
                                {innerItem ? (
                                    <Component componentId={innerItem.componentId} item={innerItem} />
                                ) : (
                                    <DropComponentSeparator
                                        accept={[ComponentType.Inner]}
                                        item={item}
                                        index={index}
                                        onDrop={onDropComponent}
                                    />
                                )}
                            </div>
                        );
                    }))}
                </div>
            </div>
        );
    }
};

export function createCustomEmailRowSource(componentParams: ComponentSourceParam<EmailRowParams>): ComponentSource<EmailRowParams> {
    return {
        ...EmailRowSource,
        componentParams,
        id: EmailRowSource.id + '_' + Object.entries(componentParams).map((pieces) => pieces.join('-')).join('_'),
    };
}
