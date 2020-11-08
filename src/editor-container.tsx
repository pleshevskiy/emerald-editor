import React from 'react';


export function EditorContainer() {
    return (
        <div className="col-start-center grow-1 w-100p bg-white">
            {Array.from(new Array(20).keys()).map((key) => {
                return (
                    <div key={key} className="row-center-center h-100 w-100p m-t-8 bg-for-test">
                        Row {key + 1}
                    </div>
                );
            })}
        </div>
    );
}