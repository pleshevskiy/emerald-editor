import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditorContainer } from './editor-container';
import { Component, ComponentType } from './component';

export function EmeraldEditor() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="row-start-stretch grow-1">
                <div className="overflow-y-scroll col-start-center grow-1 h-100vh bg-black">
                    <div className="col-start-center w-100p p-16">
                        <EditorContainer />
                    </div>
                </div>
                <div className="col-start-start w-320 p-16">
                    <h3>Components</h3>
                    <Component type={ComponentType.Layout} />
                </div>
            </div>
        </DndProvider>
    );
}
