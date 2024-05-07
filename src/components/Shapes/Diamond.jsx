import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { StyledNodeResizer } from "../StylesNodeResizer/StylesNodeResizer";
import { Offcanvas, Form, Button } from "react-bootstrap";



export function Diamond({ id, data, selected, defaultText, setNodeData, editingComponent }) {
    const [text, setText] = useState(defaultText || "Decision");
    const [isEditing, setIsEditing] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [whenOptions, setWhenOptions] = useState([{ condition: "", goTo: "" }]);
    const [otherwiseGoTo, setOtherwiseGoTo] = useState("");
    const [showExistingOptions, setShowExistingOptions] = useState(false);


    const handleNodeClick = () => setIsEditing(true);
    const handleBlur = () => {
        setIsEditing(false);
        // updateNodeText(id, text); // Update the text in the Canvas component
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsEditing(false);
            // updateNodeText(id, text); // Update the text in the Canvas component
        }
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    // Call setNodeData when text is updated
    const handleTextUpdate = () => {
        setNodeData(text);
    };

    const handleOffcanvasShow = () => setShowOffcanvas(true);
    const handleOffcanvasClose = () => setShowOffcanvas(false);

    const handleAddWhenOption = () => {
        setWhenOptions([...whenOptions, { condition: "", goTo: "" }]);
    };

    const handleRemoveWhenOption = (index) => {
        const updatedOptions = [...whenOptions];
        updatedOptions.splice(index, 1);
        setWhenOptions(updatedOptions);
    };


    const handleWhenConditionChange = (index, value) => {
        const updatedOptions = [...whenOptions];
        updatedOptions[index].condition = value;
        setWhenOptions(updatedOptions);
        if (value === "existing") {
            setShowExistingOptions(true);
        } else {
            setShowExistingOptions(false);
        }
    };


    const handleWhenGoToChange = (index, value) => {
        const updatedOptions = [...whenOptions];
        updatedOptions[index].goTo = value;
        setWhenOptions(updatedOptions);
    };


    const handleDoubleClick = () => {
        handleOffcanvasShow(); // Show the Offcanvas on double-click
    };


    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center w-140 h-140"
                style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", backgroundColor: "#fdefd4", width: "145px",
                    height: "145px", // Rotate inner content back to normal
                }}
                onClick={handleNodeClick}
                onDoubleClick={handleDoubleClick} // Double-click handler
            >
                 {isEditing ? (
                // Render the editing component dynamically
                editingComponent ? (
                    <editingComponent
                        text={text}
                        onChange={handleChange}
                        onBlur={handleTextUpdate}
                        onKeyDown={handleKeyDown}
                        setNodeData={setNodeData} // Correctly pass the setNodeData prop

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
                <StyledNodeResizer selected={selected} />
            </div>

            <Handle type="source" id="top" position={Position.Top} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(50%, -50%)" }} />
            <Handle type="source" id="right" position={Position.Right} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(50%, 50%)" }} />
            <Handle type="source" id="bottom" position={Position.Bottom} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(50%, 50%)" }} />
            <Handle type="source" id="left" position={Position.Left} className="handle" style={{ width: "10px", height: "10px", margin: "-10px", transform: "translate(-50%, 50%)" }} />
            {/* Offcanvas */}
            <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Decision Node </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Partition 1: When */}
                    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                        <Form.Group controlId="formDecisionWhen">
                            {whenOptions.map((option, index) => (
                                <div key={index} className="mb-3">
                                    <Form.Group controlId={`formDecisionCondition-${index}`}>
                                        <Form.Label>When</Form.Label>
                                        
                                        <Form.Control
                                            as="select"
                                            value={option.condition}
                                            onChange={(e) => handleWhenConditionChange(index, e.target.value)}
                                        >
                                            <option value="">Select Condition</option>
                                            <option value="custom">Custom Condition</option>
                                            <option value="existing">Existing Condition</option>
                                        </Form.Control>
                                        <small  class="form-text text-muted">Condition preview will appear here</small>
                                    </Form.Group>
                                    {showExistingOptions && option.condition === "existing" && (
                                        <Form.Group controlId={`formDecisionExistingOption-${index}`}>
                                            <Form.Control
                                                as="select"
                                                value={option.existingOption}
                                                onChange={(e) => handleExistingOptionChange(index, e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="always">Always</option>
                                                <option value="isemail">Is Email</option>
                                                <option value="ismashup">Is mashup</option>
                                                <option value="ismobile">Is mobile</option>
                                                <option value="never">Never</option>
                                            </Form.Control>
                                        </Form.Group>
                                    )}
                                    <Form.Group controlId={`formDecisionGoTo-${index}`}>
                                        <Form.Label>Go to</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={option.goTo}
                                            onChange={(e) => handleWhenGoToChange(index, e.target.value)}
                                        >
                                            <option value="">Go to...</option>
                                            <option value="node1">Node 1</option>
                                            <option value="node2">Node 2</option>
                                            <option value="node3">Node 3</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {index === 0 && (
                                        <Button variant="primary" style={{ marginTop: "10px" }} onClick={handleAddWhenOption}>
                                            + Add Path
                                        </Button>
                                    )}
                                    {index > 0 && (
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveWhenOption(index)}
                                            style={{ marginTop: "10px" }}
                                        >
                                            <i class="bi bi-trash"></i>

                                        </Button>
                                    )}
                                </div>
                            ))}
                        </Form.Group>
                    </div>

                    {/* Partition 2: Otherwise Go To */}
                    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>

                        <Form.Group controlId="formDecisionOtherwise">
                            <Form.Label>Otherwise Go To</Form.Label>
                            <Form.Control
                                as="select"
                                value={otherwiseGoTo}
                                onChange={(e) => setOtherwiseGoTo(e.target.value)}
                            >
                                <option value="">Go to...</option>
                                {/* Here you'll map through nodes and generate options */}
                                <option value="node1">Node 1</option>
                                <option value="node2">Node 2</option>
                                <option value="node3">Node 3</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    );
}
