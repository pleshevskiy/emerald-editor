import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function EmeraldEditor() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="row-start-stretch grow-1">
                <div className="col-start-start grow-1 p-16 bg-for-test">2</div>
                <div className="col-start-start w-320 p-16 bg-for-test">3</div>
            </div>
        </DndProvider>
    );
}
