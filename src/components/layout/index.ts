import { EmailRowSource, createCustomEmailRowSource } from './email-row';

export const components = [
    EmailRowSource,
    createCustomEmailRowSource({ columns: 2 }),
];
