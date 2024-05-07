import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Tabs, Tab, Button } from 'react-bootstrap';

// SquareOffcanvas Component
function SquareOffcanvas({ show, onHide, data, setNodeData }) {
    // Define state for the `Route to` dropdown
    const [routeTo, setRouteTo] = useState(data?.data?.routeTo || 'currentuser');

    // Define state for the `Set case status` input
    const [caseStatus, setCaseStatus] = useState(data?.data?.caseStatus || '');

    // Define state for the `Instructions for user` input
    const [instructions, setInstructions] = useState(data?.data?.caseStatus || '');
    const [useSla, setUseSla] = useState(data?.data?.routeTo || 'never');

        // Update local state when the `data` prop changes
        useEffect(() => {
            setRouteTo(data?.data?.routeTo || 'currentuser');
            setCaseStatus(data?.data?.caseStatus || '');
            setInstructions(data?.data?.instructions || '');
            setUseSla(data?.data?.useSla || 'never');
        }, [data]);
    


    // Handle text change
    const handleTextChange = (e) => {
        setNodeData(data.id, { ...data.data, text: e.target.value });
    };

    // Handle changes to the `Route to` dropdown
    const handleRouteToChange = (e) => {
        setRouteTo(e.target.value);
        setNodeData(data.id, { ...data.data, routeTo: e.target.value });
    };

    // Handle changes to the `Set case status` input
    const handleCaseStatusChange = (e) => {
        setCaseStatus(e.target.value);
        setNodeData(data.id, { ...data.data, caseStatus: e.target.value });
    };

    // Handle changes to the `Instructions for user` input
    const handleInstructionsChange = (e) => {
        setInstructions(e.target.value);
        setNodeData(data.id, { ...data.data, instructions: e.target.value });
    };

    const handleSlaChange = (e) => {
        setUseSla(e.target.value);
        setNodeData(data.id, { ...data.data, useSla: e.target.value });
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: '25%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Square Node</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {data ? (
                    <div>
{/*   
                        <Form.Group controlId="textInput">

                            <Form.Control
                                type="text"
                                value={data.text || ''}
                                onChange={handleTextChange}
                            />
                        </Form.Group> */}

                        {/* Create tabs */}
                        <Tabs defaultActiveKey="general">
                            {/* General tab */}
                            <Tab eventKey="general" title="General">
                                {/* Route to dropdown */}
                                <Form.Group controlId="routeTo">
                                    <Form.Label>Route to:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={routeTo}
                                        onChange={handleRouteToChange}
                                    >
                                        <option value="currentuser">Current User</option>
                                        <option value="specificuser">Specific User</option>
                                        <option value="workqueue">Work Queue</option>
                                        <option value="usebusinesslogic">Use Business Logic</option>
                                    </Form.Control>
                                </Form.Group>

                                {/* Set case status input */}
                                <Form.Group controlId="caseStatus">
                                    <Form.Label>Set case status:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={caseStatus}
                                        onChange={handleCaseStatusChange}
                                    />
                                </Form.Group>

                                {/* Instructions for user input */}
                                <Form.Group controlId="instructions">
                                    <Form.Label>Instructions for user:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={instructions}
                                        onChange={handleInstructionsChange}
                                    />
                                </Form.Group>
                            </Tab>

                            {/* Goal & Deadline tab */}
                            <Tab eventKey="goal" title="Goal & Deadline">
                                {/* Add content for the Goal & Deadline tab here */}
                                <p>Define the suggested and required completion times for this step. These are calculated from the start of the step. This will override goal & deadline settings.</p>
                                <Form.Group controlId="useSla">
                                    <Form.Label>Use Service-level agreement (SLA)</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={useSla}
                                        onChange={handleSlaChange}
                                    >
                                        <option value="never">Never</option>
                                        <option value="customsla">Custom SLA</option>
                                        <option value="existingsla">Existing SLA</option>                                        
                                    </Form.Control>
                                </Form.Group>
                            </Tab>
                        </Tabs>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

// CircleOffcanvas Component
function CircleOffcanvas({ show, onHide, data, setNodeData }) {
    const [text, setText] = useState(data?.text || '');

    const handleTextChange = (e) => {
        setText(e.target.value);
        setNodeData(data.id, { ...data, text: e.target.value });
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: '20%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Start Node</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {data ? (
                    <>
                        <p>ID: {data.id}</p>
                        <Form.Group controlId="textInput">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                            />
                        </Form.Group>
                    </>
                ) : (
                    <p>No data available</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}


// SubprocessOffcanvas Component
function SubprocessOffcanvas({ show, onHide, data, setNodeData }) {
    const [text, setText] = useState(data?.text || '');
    const [processName, setProcessName] = useState(data?.processName || 'select');
    const [auditNote, setAuditNote] = useState(data?.auditNote || '');

    useEffect(() => {
        setText(data?.text || '');
        setProcessName(data?.processName || 'select');
        setAuditNote(data?.auditNote || '');
    }, [data]);

    const handleTextChange = (e) => {
        setText(e.target.value);
        setNodeData(data.id, { ...data, text: e.target.value });
    };

    const handleProcessNameChange = (e) => {
        setProcessName(e.target.value);
        setNodeData(data.id, { ...data, processName: e.target.value });
    };

    const handleAuditNoteChange = (e) => {
        setAuditNote(e.target.value);
        setNodeData(data.id, { ...data, auditNote: e.target.value });
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: '20%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Subprocess Node</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {data ? (
                    <>
                        <Form.Group controlId="textInput">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="processName">
                            <Form.Label>Process Name:</Form.Label>
                            <Form.Control
                                as="select"
                                value={processName}
                                onChange={handleProcessNameChange}
                            >
                                <option value="select">Select</option>
                                        {/* <option value="customsla">Custom SLA</option>
                                        <option value="existingsla">Existing SLA</option> */}
                                        </Form.Control>   
                        </Form.Group>

                        <Form.Group controlId="auditNote">
                            <Form.Label>Audit Note:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={auditNote}
                                onChange={handleAuditNoteChange}
                            />
                        </Form.Group>
                    </>
                ) : (
                    <p>No data available</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}


// EndOffcanvas Component
function EndOffcanvas({ show, onHide, data, setNodeData }) {
    const [text, setText] = useState(data?.text || '');

    const handleTextChange = (e) => {
        setText(e.target.value);
        setNodeData(data.id, { ...data, text: e.target.value });
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: '20%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>End Node</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {data ? (
                    <>
                        <p>ID: {data.id}</p>
                        <Form.Group controlId="textInput">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                            />
                        </Form.Group>
                    </>
                ) : (
                    <p>No data available</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

// DiamondOffcanvas Component
function DiamondOffcanvas({  show, onHide, data, setNodeData }) {
    const [text, setText] = useState(data?.text || '');

       // Update local state when the `data` prop changes
       useEffect(() => {
        setText(data?.data?.text || '');
    }, [data]);

    const handleTextChange = (e) => {
        setText(e.target.value);
        setNodeData(data.id, { ...data, text: e.target.value });
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: '20%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Decision Node</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {data ? (
                    <>
                        <p>ID: {data.id}</p>
                        <Form.Group controlId="textInput">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                            />
                        </Form.Group>
                    </>
                ) : (
                    <p>No data available</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export function OffcanvasSwitch({ show, onHide, data, setNodeData,addPartition, nodeNames, connectToNode  }) {
    // Determine the type of the selected node and render the appropriate Offcanvas component
    switch (data?.type) {
        case 'square':
            return (
                <SquareOffcanvas
                    show={show}
                    onHide={onHide}
                    data={data}
                    setNodeData={setNodeData}
                />
            );
        case 'circle':
            return (
                <CircleOffcanvas
                    show={show}
                    onHide={onHide}
                    data={data}
                    setNodeData={setNodeData}
                />
            );
        case 'subprocess':
            return (
                <SubprocessOffcanvas
                    show={show}
                    onHide={onHide}
                    data={data}
                    setNodeData={setNodeData}
                />
            );

            case 'end':
            return (
                <EndOffcanvas
                    show={show}
                    onHide={onHide}
                    data={data}
                    setNodeData={setNodeData}
                />
            );

            case 'Diamond':
            return (
                <DiamondOffcanvas
                    show={show}
                    onHide={onHide}
                    data={data}
                    setNodeData={setNodeData}
              
                />
            );
        
        default:
            return null;
    }
}
