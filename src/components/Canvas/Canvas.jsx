import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import ReactFlow, {
  Controls,
  Background,
  useEdgesState,
  addEdge,
  ConnectionMode,
  useNodesState,
} from "reactflow";
import {
  Button,
  Tooltip,
  OverlayTrigger,
  Dropdown,
  Form,
} from "react-bootstrap";
import { OffcanvasSwitch } from "../Canvas/OffcanvasPanel";
import "bootstrap/dist/css/bootstrap.min.css";
import "reactflow/dist/style.css";
import "./style.css";
import { Default } from "../Edges/Edges";
import { Diamond } from "../Shapes/Diamond";
import ContextMenu from "../ContextMenu/ContextMenu";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Circle, Square, Subprocess, End } from "../Shapes/Shapes";
import { useNodeActions } from "../ContextMenu/nodeActions";
import StateContext from "../../StateContext";

const dotColor = "#E6E6E6";

const NODE_TYPES = {
  square: Square,
  circle: Circle,
  diamond: Diamond,
  end: End,
  subprocess: Subprocess,
};

const EDGE_TYPES = {
  default: Default,
};

export const FlowchartNameContext = createContext({
  flowchartName: () => {},
  setFlowchartName: () => {},
  nodes: [],
  setNodes: () => {},
  handleAddNode: () => {},
});

export function Canvas({
  savedJson,
  id,
  top,
  left,
  right,
  bottom,
  onAddNode,
  ...props
}) {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [menu, setMenu] = useState(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const ref = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const { duplicateNode, deleteNode } = useNodeActions();
  const [nodeNames, setNodeNames] = useState([]);
  const [history, setHistory] = useState([]);
  const [flowchartName, setFlowchartName] = useState("UntitledFlowchart");
  const appState = useContext(StateContext);
  console.log(appState);
  // const [flowchartData, setFlowchartData] = useState({
  //     flowchartName: "UntitledFlowchart",
  //     shapes: [],
  //   });

  //   const handleUpdateFlowchart = (updatedFlowchartData) => {
  //     setFlowchartData(updatedFlowchartData);
  //   };

  // useEffect(() => {
  //     // Fetch flowchart data from flowchart.json file
  //     fetch("flowchart.json")
  //         .then((response) => {
  //             if (!response.ok) {
  //                 throw new Error("Failed to fetch flowchart data");
  //             }
  //             return response.json();
  //         })
  //         .then((data) => {
  //             // Extract nodes, edges, and viewport from JSON data
  //             const { nodes, edges, viewport } = data;
  //             setNodes(nodes);
  //             setEdges(edges);
  //             setViewport(viewport);
  //             if (data.name) {
  //                 setFlowchartName(data.name);
  //             }
  //         })
  //         .catch((error) => {
  //             console.error("Error fetching flowchart data:", error);
  //         });
  // }, []);

  useEffect(() => {
    console.log(appState);
    handleAddNode(appState.imgType);
  }, [appState]);

  useEffect(() => {
    // Update node names whenever nodes change
    setNodeNames(nodes.map((node) => node.data.label));
  }, [nodes]);

  useEffect(() => {
    // Save history whenever nodes or edges change
    const updatedHistory = {
      nodes,
      edges,
      viewport,
    };
    setHistory((prevHistory) => [...prevHistory, updatedHistory]);
  }, [nodes, edges]);

  const onNodeDoubleClick = useCallback((event, node) => {
    setSelectedNode(node);
    setIsPanelOpen(true);
    setSelectedEdge(null);
  }, []);
  const onEdgeDoubleClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setIsPanelOpen(true);
    setSelectedNode(null);
  }, []);

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedNode(null); // Clear selected node
    setSelectedEdge(null);
  };

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `edge-${edges.length + 1}`,
        type: "default",
        markerEnd: { type: "arrow", color: "#f00", strokeWidth: 3 },
        style: {
          strokeWidth: 1,
        },
        data: {
          label: "", // Add label if needed
        },
      };
      setEdges((oldEdges) => [...oldEdges, newEdge]);
    },
    [edges, setEdges]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const handleAddNode = (type) => {
    const centerOfScreen = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    setNodes((nodes) => [
      ...nodes,
      {
        id: `node-${nodes.length + 1}`,
        type,
        position: centerOfScreen,
        data: { label: `${type} node` },
      },
    ]);
  };

  //   // Handle delete node
  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode.id);
      setSelectedNode(null);
      setSelectedEdge(null); // Optionally clear selected edge too
    } else {
      console.warn("No node selected for deletion");
    }
  };

  // // Handle duplicate node
  const handleDuplicateNode = () => {
    if (selectedNode) {
      duplicateNode(selectedNode.id);
    } else {
      console.warn("No node selected for duplication");
    }
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const onEdgeClick = (event, edge) => {
    setSelectedNode(null);
    setSelectedEdge(edge);
  };

  const labelStyle = {
    color: "#000",
    marginLeft: "10px",
    lineHeight: "40px",
  };

  const setNodeData = useCallback(
    (updatedText) => {
      if (selectedNode) {
        const updatedNode = {
          ...selectedNode,
          data: { ...selectedNode.data, label: updatedText },
        };
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === selectedNode.id ? updatedNode : node
          )
        );
      } else if (selectedEdge) {
        const updatedEdge = {
          ...selectedEdge,
          data: { ...selectedEdge.data, label: updatedText },
        };
        setEdges((edges) =>
          edges.map((edge) =>
            edge.id === selectedEdge.id ? updatedEdge : edge
          )
        );
      }
    },
    [selectedNode, selectedEdge, setNodes, setEdges]
  );

  const saveFlowchart = (updatedText) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode?.id) {
        return { ...node, data: { ...node.data, label: updatedText } };
      }
      return node;
    });
    const flowchartData = {
      nodes: updatedNodes,
      edges,
      viewport,
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(flowchartData);
    console.log(jsonString);

    // Save the JSON string to a file or database
    // For demonstration, we are logging it to console
  };

  const handleNameChange = (event) => {
    setFlowchartName(event.target.value);
  };

  const handleNameKeyDown = (event) => {
    if (event.key === "Enter") {
      // Save the flowchart name here
      saveFlowchartName(flowchartName);
      event.preventDefault();
      event.target.blur(); // Prevents default form submission behavior
    }
  };

  const saveFlowchartName = (name) => {
    console.log("Saving flowchart name:", name);
    // You can replace the console.log with your actual save action
  };

  return (
    <FlowchartNameContext.Provider
      value={{
        flowchartName,
        setFlowchartName,
        nodes,
        setNodes,
        handleAddNode,
      }}
    >
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          // elements={flowchartData.shapes}
          ref={ref}
          nodeTypes={NODE_TYPES}
          nodes={nodes}
          edgeTypes={EDGE_TYPES}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          connectionMode={ConnectionMode.Loose}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          defaultEdgeOptions={{
            type: "default",
          }}
          fitView
          fitViewOptions={{
            maxZoom: 0.75,
          }}
        >
          <Background gap={12} size={2} color={dotColor} />
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
          <Controls />
        </ReactFlow>
        {/* Offcanvas panel */}
        <OffcanvasSwitch
          show={isPanelOpen}
          onHide={handleClosePanel}
          onNodeDoubleClick={onNodeDoubleClick}
          data={selectedNode || selectedEdge}
          title={selectedNode ? "Node Information" : "Edge Information"}
          setNodeData={setNodeData}
        />
      </div>
      <div
        className="d-flex position-fixed top-0 left-0  rounded  border "
        // style={{ width: "100vw", height:"40px", zIndex: 1000, marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#f0f0f0" }}
      >
        <div
          className="toolbar-container d-flex align-items-center shadow"
          style={{
            width: "100vw",
            height: "40px",
            zIndex: 1000,
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          {/* Stages button */}
          <Link to="/" className="stages-button">
            <i className="bi bi-arrow-left" style={{ marginRight: "10px" }}></i>
            Stages & Steps
          </Link>

          <span className="text-secondary">|</span>

          {/* Dropdown for adding nodes */}
          <Dropdown
            className="mr-2"
            style={{ marginRight: "10px", marginLeft: "10px", zIndex: "-1" }}
          >
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <i className="bi bi-plus-square-fill text-muted "></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleAddNode("square")}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="square-tooltip">Assignment</Tooltip>}
                  >
                    <Button
                      variant="success"
                      className="assignment"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </OverlayTrigger>
                  <span style={labelStyle}>Assignment</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddNode("circle")}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="circle-tooltip">Start</Tooltip>}
                  >
                    <Button
                      variant="success"
                      className="start"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </OverlayTrigger>
                  <span style={labelStyle}>Start</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddNode("end")}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="end-tooltip">End</Tooltip>}
                  >
                    <Button
                      variant="danger"
                      className="end"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </OverlayTrigger>
                  <span style={labelStyle}>End</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleAddNode("subprocess")}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="square-tooltip">Subprocess</Tooltip>}
                  >
                    <div
                      className="subprocess-button-container"
                      style={{ position: "relative" }}
                    >
                      <Button
                        variant="primary"
                        className="subprocess"
                        style={{ width: "40px", height: "40px" }}
                      />
                      {/* Plus sign inside the square node */}
                      <span className="plus-sign">+</span>
                    </div>
                  </OverlayTrigger>
                  <span style={labelStyle}>Subprocess</span>
                </div>
              </Dropdown.Item>

              <Dropdown.Item onClick={() => handleAddNode("diamond")}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="diamond-tooltip">Decision</Tooltip>}
                  >
                    <div className="diamond-container">
                      <Button
                        variant="warning"
                        className="decision"
                        style={{
                          width: "35px",
                          height: "35px",
                          clipPath:
                            "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                        }}
                      />
                    </div>
                  </OverlayTrigger>
                  <span style={labelStyle}>Decision</span>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <span className="text-secondary">|</span>

          {/* Delete button next to the dropdown button */}
          <Button
            className="button"
            onClick={handleDeleteNode}
            style={{ marginLeft: "10px" }}
            {...props}
          >
            <i className="bi bi-trash"></i>
          </Button>

          <span className="text-secondary">|</span>

          {/* Duplicate button */}
          <Button
            className="button"
            onClick={handleDuplicateNode}
            style={{ marginLeft: "10px" }}
            {...props}
          >
            <i className="bi bi-copy"></i>
          </Button>

          <span className="text-secondary">|</span>

          {/* Save button */}
          <Button
            className="button"
            onClick={() => saveFlowchart("updatedText")}
            style={{ marginLeft: "10px", border: "1px solid #000000" }}
            {...props}
          >
            Save Flowchart
          </Button>
        </div>
      </div>
      {/* <StagesPage nodes={nodes} /> */}

      <div
        className="d-flex position-fixed top-0 left-0  rounded  border "
        style={{
          width: "100vw",
          height: "35px",
          zIndex: -1,
          marginTop: "60px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#eeeff2",
        }}
      >
        <i
          className="bi bi-house text-primary"
          style={{ marginLeft: "10px" }}
        ></i>
        <Form.Control
          type="text"
          value={flowchartName}
          onChange={handleNameChange}
          onKeyDown={handleNameKeyDown}
          style={{
            width: "200px",
            marginRight: "5px",
            padding: "1px 7px",
            backgroundColor: "#f0f0f0",
            fontWeight: "bold",
            border: "1px solid #f0f0f0",
            color: "#565656",
            fontSize: "revert",
          }}
        />
        {/* <Link to="/editor">Go to Flowchart Editor</Link>
      <h2>{flowchartData.flowchartName}</h2> */}
      </div>
    </FlowchartNameContext.Provider>
  );
}
