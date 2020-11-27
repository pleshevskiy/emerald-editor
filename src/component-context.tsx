import React from 'react';
import invariant from 'tiny-invariant';
import { ComponentSource } from './interfaces';


export type ComponentContextData = {
    sources: ComponentSource<any>[];
    componentById: Map<string, ComponentSource<any>>;
}

export const ComponentContext = React.createContext<ComponentContextData | null>(null);

type ComponentProviderProps = Readonly<React.PropsWithChildren<{
    components: ComponentSource<any>[];
}>>

export function ComponentProvider({ children, components }: ComponentProviderProps) {
    const componentById = new Map(
        components.map(component => [component.id, component])
    );

    const sources = Array.from(componentById.values());

    const value: ComponentContextData = {
        componentById,
        sources
    };

    return (
        <ComponentContext.Provider value={value}>
            {children}
        </ComponentContext.Provider>
    );
}

export function useComponentContext() {
    const context = React.useContext(ComponentContext);
    invariant(context, 'Your component must be a child of <ComponentProvider />');
    return context;
}

type UseComponentProps = Readonly<{
    componentId?: string;
}>;

export function useComponent<T = Record<string, string | number | boolean>>(
    { componentId }: UseComponentProps
): [ComponentSource<T> | undefined] {
    const componentContext = useComponentContext();

    const source = componentId != null ?
        componentContext.componentById.get(componentId)
        : undefined;

    return [source];
}
