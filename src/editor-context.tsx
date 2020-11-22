import React from 'react';
import invariant from 'tiny-invariant';
import { DragItem } from './interfaces';

export type EditorContextData = {
    components: Required<DragItem>[];
    setComponents: React.Dispatch<React.SetStateAction<Required<DragItem>[]>>;
    chosenComponentIndex: number | null;
    setChosenComponentIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const EditorContext = React.createContext<EditorContextData | null>(null);

export type EditorProviderProps = React.PropsWithChildren<Record<string, unknown>>;

export function EditorProvider({ children }: EditorProviderProps) {
    const [components, setComponents] = React.useState<Required<DragItem>[]>([]);
    const [chosenComponentIndex, setChosenComponentIndex] = React.useState<number | null>(null);

    const value = {
        components,
        setComponents,
        chosenComponentIndex,
        setChosenComponentIndex,
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
}

export function useEditorContext() {
    const context = React.useContext(EditorContext);
    invariant(context, 'Your component must be a child of <EditorProvider />');
    return context;
}
