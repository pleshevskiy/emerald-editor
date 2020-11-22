import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Component } from './component';
import { components } from './components';
import { ComponentProvider, useComponentContext } from './component-context';
import { EditorContainer } from './editor-container';
import { EditorProvider } from './editor-context';


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

export function Sidebar() {
    const { sources } = useComponentContext();

    return (
        <div className="col-start-start w-320 p-16">
            <h3>Components</h3>
            {sources.map(source => (
                <Component key={source.id} componentId={source.id} />
            ))}
        </div>
    );
}
