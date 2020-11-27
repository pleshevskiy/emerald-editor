import React from 'react';
import { ComponentType } from '../../../component';
import { ComponentSource, ParamType } from '../../../interfaces';

export type ParagraphParams = {
    text: string;
}

export const ParagraphSource: ComponentSource<ParagraphParams> = {
    type: ComponentType.Inner,
    id: 'paragraph',
    componentParams: {
        text: {
            type: ParamType.Text,
            defaultValue: 'Input your text',
        }
    },
    renderPreview() {
        return (
            <div className='col-start-center w-100p p-4'>
                <p>Paragraph</p>
            </div>
        );
    },
    render({ item, componentParams }) {
        return (
            <p>{ componentParams.text } <span>[{item.indexPath.join(', ')}]</span> </p>
        );
    }
};
