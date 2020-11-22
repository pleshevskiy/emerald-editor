import React from 'react';
import { ComponentType } from '../../component';
import { ComponentSource } from '../../interfaces';

export type EmailRowParams = {
    columns: number;
}

export const EmailRowSource: ComponentSource<EmailRowParams> = {
    type: ComponentType.Layout,
    id: 'email-row',
    defaultParams: {
        columns: 1,
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
    render({ item, componentParams }) {
        return (
            <div className='col-start-center w-100p p-4'>
                <h3>Row {item?.index}</h3>
                <div className="row-center-center w-100p p-4">
                    {Object.keys(new Array(componentParams.columns).fill(0)).map((column => (
                        <div key={column} className="grow-1 row-center-center">Column {column}</div>
                    )))}
                </div>
            </div>
        );
    }
};

export function createCustomEmailRowSource(defaultParams: EmailRowParams): ComponentSource<EmailRowParams> {
    return {
        ...EmailRowSource,
        defaultParams,
        id: EmailRowSource.id + '_' + Object.entries(defaultParams).map((pieces) => pieces.join('-')).join('_'),
    };
}
