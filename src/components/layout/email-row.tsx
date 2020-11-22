import React from 'react';
import { ComponentType } from '../../component';
import { ComponentSource } from '../../interfaces';

export type EmailRowParams = {
    columns: number;
}

export const EmailRowSource: ComponentSource<EmailRowParams> = {
    type: ComponentType.Layout,
    id: 'email-row',
    componentParams: {
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
    render({ componentParams }) {
        return (
            <div className='col-start-center w-100p p-4'>
                <div className="row-center-center w-100p p-4">
                    {Object.keys(new Array(componentParams.columns).fill(0)).map((column => (
                        <div key={column} className="grow-1 row-center-center">Column {column}</div>
                    )))}
                </div>
            </div>
        );
    }
};

export function createCustomEmailRowSource(componentParams: EmailRowParams): ComponentSource<EmailRowParams> {
    return {
        ...EmailRowSource,
        componentParams,
        id: EmailRowSource.id + '_' + Object.entries(componentParams).map((pieces) => pieces.join('-')).join('_'),
    };
}
