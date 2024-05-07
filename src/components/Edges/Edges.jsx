import React, { useState } from "react";
import {BaseEdge, getSmoothStepPath,EdgeLabelRenderer,useReactFlow } from "reactflow";

export function Default({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = {},
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  

  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState(data.label || "");

  
  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setLabelText(newLabel);

    // Update the edge label in the edges array
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              label: newLabel,
            },
          };
        }
        return edge;
      })
    );
  };

  return (
    <>
      {/* Rendering the edge path */}
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />

      {/* Rendering the label editor */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          {isEditing ? (
            // Input field for editing the label
            <input
              type="text"
              value={labelText}
              onChange={handleLabelChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditing(false);
                }
              }}
              autoFocus
            />
          ) : (
            // Button to enable editing
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "2px 5px",
                border: "none",
                // background: "transparent",
                cursor: "pointer",
              }}
            >
              {data.label || "Edit"}
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
