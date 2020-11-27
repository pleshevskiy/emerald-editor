import { EmailRowSource, createCustomEmailRowSource } from './layout';
import { ParagraphSource } from './inner';
import { ParamType } from '../../interfaces';

export const components = [
    EmailRowSource,
    createCustomEmailRowSource({ columns: { type: ParamType.Int, defaultValue: 2 } }),

    ParagraphSource,
];