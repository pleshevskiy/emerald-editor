import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Component } from './component';
import { components } from './components';
import { ComponentProvider, useComponent, useComponentContext } from './component-context';
import { EditorContainer } from './editor-container';
import { EditorProvider, useEditorContext } from './editor-context';


export function EmeraldEditor() {
    return (
        <DndProvider backend={HTML5Backend}>
            <EditorProvider>
                <ComponentProvider components={components}>
                    <div className="row-start-stretch grow-1">
                        <div className="overflow-y-scroll col-start-center grow-1 h-100vh bg-black">
                            <div className="col-start-center w-100p p-16">
                                <EditorContainer />
                            </div>
                        </div>
                        <Sidebar />
                    </div>
                </ComponentProvider>
            </EditorProvider>
        </DndProvider>
    );
}

const SIDEBAR_TABS = [
    {
        name: 'Components',
        tabContent: <ComponentsTabContent />
    },
    {
        name: 'Params',
        tabContent: <ParamsTabContent />
    }
];

export function Sidebar() {
    const { chosenComponent } = useEditorContext();

    const [tabContent, setTabContent] = React.useState(<ComponentsTabContent />);

    useEffect(() => {
        if (chosenComponent != null) {
            setTabContent(SIDEBAR_TABS[1].tabContent);
        }
    }, [chosenComponent]);

    return (
        <div className="col-start-start w-320 p-16">
            <div className="row-start-start w-100p">
                {SIDEBAR_TABS.map(tab => (
                    <div key={tab.name} className="grow-1">
                        <button
                            type='button'
                            onClick={() => setTabContent(tab.tabContent)}
                        >
                            {tab.name}
                        </button>
                    </div>
                ))}
            </div>
            {tabContent}
        </div>
    );
}

export function ComponentsTabContent() {
    const { sources } = useComponentContext();

    return (
        <>
            {sources.map(source => (
                <Component key={source.id} componentId={source.id} />
            ))}
        </>
    );
}

export function ParamsTabContent() {
    const { chosenComponent, patchComponent } = useEditorContext();
    const [source] = useComponent({ componentId: chosenComponent?.componentId });

    return chosenComponent && source ? (
        <div className="col-start-start">
            {Object.entries(source.componentParams)
                .map(([key, config]) => (
                    <div key={key}>
                        <b>{key}</b>
                        <input
                            type="text"
                            defaultValue={(chosenComponent.params?.[key] ?? config.defaultValue).toString()}
                            onChange={(e) => {
                                patchComponent(
                                    chosenComponent,
                                    {
                                        params: {
                                            ...chosenComponent?.params,
                                            [key]: e.target.value,
                                        }
                                    }
                                );
                            }}
                        />
                    </div>
                ))}
        </div>
    ) : (
        <div>
            Select component in the editor container
        </div>
    );
}
