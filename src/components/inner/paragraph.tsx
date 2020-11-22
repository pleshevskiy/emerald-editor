import React from 'react';
import { ComponentType } from '../../component';
import { ComponentSource } from '../../interfaces';

export type ParagraphParams = {
    text: string;
}

export const ParagraphSource: ComponentSource<ParagraphParams> = {
    type: ComponentType.Inner,
    id: 'paragraph',
    componentParams: {
        text: 'Input your text',
    },
    renderPreview() {
        return (
            <div className='col-start-center w-100p p-4'>
                <p>Paragraph</p>
            </div>
        );
    },
    render({ componentParams }) {
        return (
            <p>{ componentParams.text }</p>
        );
    }
};
