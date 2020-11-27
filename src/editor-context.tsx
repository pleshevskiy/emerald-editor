import React from 'react';
import invariant from 'tiny-invariant';
import { ContainerDragItem } from './interfaces';

export type EditorContextData = {
    components: ContainerDragItem[];
    setComponents: React.Dispatch<React.SetStateAction<ContainerDragItem[]>>;
    chosenComponent: ContainerDragItem | undefined;
    setChosenComponent: React.Dispatch<React.SetStateAction<ContainerDragItem | undefined>>;
    patchComponent: (item: ContainerDragItem, changes: Partial<ContainerDragItem>) => void;
}

export const EditorContext = React.createContext<EditorContextData | null>(null);

export type EditorProviderProps = React.PropsWithChildren<Record<string, unknown>>;

export function EditorProvider({ children }: EditorProviderProps) {
    const [components, setComponents] = React.useState<ContainerDragItem[]>([]);
    const [chosenComponent, setChosenComponent] = React.useState<ContainerDragItem | undefined>();

    const $findComponentInfoByIndexPath = React.useCallback(
        (indexPath?: number[] | null) => {
            const arrayIndexPath: number[] = [];
            let component: ContainerDragItem | undefined;
            let componentsRead = components;

            for (const index of indexPath ?? []) {
                const arrayIndex = componentsRead.findIndex(component => component.index === index);
                component = componentsRead[arrayIndex];
                if (!component) {
                    break;
                }

                arrayIndexPath.push(arrayIndex);
                componentsRead = component.components ?? [];
            }

            return {
                component,
                arrayIndexPath,
            };
        },
        [components]
    );

    const patchComponent = React.useCallback(
        (item: ContainerDragItem, changes: Partial<ContainerDragItem>) => {
            const info = $findComponentInfoByIndexPath(item.indexPath);
            if (!info.component) {
                return;
            }

            const updatedComponentData: ContainerDragItem = {
                ...info.component,
                ...changes,
            };

            const updatedComponents = [...components];
            let updatedComponentsRead = updatedComponents;

            for (const [i, arrayIndex] of Object.entries(info.arrayIndexPath)) {
                if (+i === info.arrayIndexPath.length - 1) {
                    updatedComponentsRead[arrayIndex] = updatedComponentData;
                    break;
                }

                const nextComponent = updatedComponentsRead[arrayIndex];
                if (!nextComponent) {
                    return;
                }

                updatedComponentsRead = nextComponent.components ?? [];
            }

            setComponents(updatedComponents);
        },
        [$findComponentInfoByIndexPath, components]
    );

    const value: EditorContextData = {
        components,
        setComponents,
        chosenComponent,
        setChosenComponent,
        patchComponent,
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
