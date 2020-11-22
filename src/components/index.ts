import { EmailRowSource, createCustomEmailRowSource } from './layout';
import { ParagraphSource } from './inner';

export const components = [
    EmailRowSource,
    createCustomEmailRowSource({ columns: 2 }),

    ParagraphSource,
];