import React, { useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { StyledNodeResizer } from "../StylesNodeResizer/StylesNodeResizer";
import 'bootstrap-icons/font/bootstrap-icons.css';



// Default Handle Component
function DefaultHandles() {
    return (
        <>
            <Handle type="source" id="top" position={Position.Top} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(50%, -50%)" }} />
            <Handle type="source" id="right" position={Position.Right} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(50%, 50%)" }} />
            <Handle type="source" id="bottom" position={Position.Bottom} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(50%, 50%)" }} />
            <Handle type="source" id="left" position={Position.Left} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(-50%, 50%)" }} />
        </>
    );
}

// Reusable hook for handling node input
function useNodeInput(defaultText) {
    const [text, setText] = useState(defaultText);
    const [isEditing, setIsEditing] = useState(false);

    const handleNodeClick = () => setIsEditing(true);
    const handleBlur = () => setIsEditing(false);
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsEditing(false);
        }
    };

    return { text, setText, isEditing, setIsEditing, handleNodeClick, handleBlur, handleKeyDown };
}

// Reusable Node Component
function Node({ id, selected, type, defaultText, nodeStyle, setNodeData, editingComponent }) {
    const {
        text,
        setText,
        isEditing,
        handleNodeClick,
        handleBlur,
        handleKeyDown,
    } = useNodeInput(defaultText);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    // Call setNodeData when text is updated
    const handleTextUpdate = () => {
        setNodeData(text);
    };

    return (
        <div className="node w-100 h-100 d-flex align-items-center justify-content-center" style={nodeStyle} onClick={handleNodeClick} id={id}>
            <DefaultHandles />
            <StyledNodeResizer selected={selected} />
            {isEditing ? (
                // Render the editing component dynamically
                editingComponent ? (
                    <editingComponent
                        text={text}
                        onChange={handleChange}
                        onBlur={handleTextUpdate}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        onBlur={handleTextUpdate} // Call setNodeData on blur
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="form-control"
                        style={{ width: "100px" }}
                    />
                )
            ) : (
                <span className="text-black">{text}</span>
            )}
        </div>
    );
}

// Node components
export const Square = ({ setNodeData, ...props }) => (
    <Node
        {...props}
        type="square"
        defaultText="Assignment"
        nodeStyle={{
            border: "2px solid green",
            backgroundColor: "#e5fbe5",
            minWidth: "128px",
            minHeight: "128px",
        }}
        setNodeData={setNodeData}
    />
);

export const Circle = ({ nodeData, setNodeData, ...props }) => (
    <Node
        {...props}
        type="circle"
        defaultText={"Start"}
        nodeStyle={{
            minWidth: "128px",
            minHeight: "128px",
            border: "2px solid #006400",
            borderRadius: "50%",
            backgroundColor: "#e5fbe5",
        }}
        setNodeData={setNodeData}
    />
);

// export const Diamond = (props) => {
//     return (
//         <div
//             className="d-flex align-items-center justify-content-center w-140 h-140" style={{
//                 clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", backgroundColor: "#fdefd4", width: "145px",
//                 height: "145px", // Rotate inner content back to normal
//             }}
//         >

//             <Node
//                 {...props}
//                 type="diamond"
//                 defaultText="Decision"
//             // nodeStyle={{clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", backgroundColor: "#fdefd4", minWidth: "145px",
//             // minHeight: "145px",}}

//             />
//         </div>
//     );
// };

export const End = ({ setNodeData, ...props }) => (
    <Node
        {...props}
        type="end"
        defaultText="End"
        nodeStyle={{
            minWidth: "128px",
            minHeight: "128px",
            border: "2px solid red",
            borderRadius: "50%",
            backgroundColor: "#ffc0cb",
        }}
        setNodeData={setNodeData}
    />
);


export const Subprocess = ({ setNodeData, ...props }) => {
    return (
        <div className="node" >
            {/* Node content */}
            <Node
                {...props}
                type="subprocess"
                defaultText="Subprocess"
                nodeStyle={{
                    minWidth: '128px',
                    minHeight: '128px',
                    border: '2px solid blue',
                    backgroundColor: '#e9eaff',
                    position: 'relative', // Relative positioning for absolute child positioning
                }}
                setNodeData={setNodeData}
            />

            <i
                className="bi bi-plus-square-fill"
                style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '10px',
                    fontSize: '20px',
                    color: 'black',
                    zIndex: 10, // Ensures icon is at the top
                }}
            />

        </div>
    );
};