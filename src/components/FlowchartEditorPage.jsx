// FlowchartEditorPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function FlowchartEditorPage({ flowchartName: initialFlowchartName, initialShapes, onUpdateFlowchart }) {
  const [flowchartName, setFlowchartName] = useState(initialFlowchartName);
  const [shapes, setShapes] = useState(initialShapes);

  const handleNameChange = (event) => {
    setFlowchartName(event.target.value);
    onUpdateFlowchart({ flowchartName: event.target.value, shapes });
  };

  const handleAddShape = (shapeType) => {
    const newShape = {
      id: `node-${shapes.length + 1}`,
      type: shapeType,
      position: { x: 100, y: 100 }, // Adjust position as needed
      data: { label: `${shapeType} node` },
    };
    setShapes([...shapes, newShape]);
    onUpdateFlowchart({ flowchartName, shapes: [...shapes, newShape] });
  };

  const handleRemoveShape = (shapeId) => {
    const updatedShapes = shapes.filter(shape => shape.id !== shapeId);
    setShapes(updatedShapes);
    onUpdateFlowchart({ flowchartName, shapes: updatedShapes });
  };

  return (
    <div>
      <Link to="/">Go back to Canvas</Link>
      <input type="text" value={flowchartName} onChange={handleNameChange} />
      <div>
        {/* Render shape list */}
        <ul>
          {shapes.map(shape => (
            <li key={shape.id}>
              {shape.data.label} - <button onClick={() => handleRemoveShape(shape.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Render add shape buttons */}
        <button onClick={() => handleAddShape("square")}>Add Square</button>
        <button onClick={() => handleAddShape("circle")}>Add Circle</button>
        {/* Add more buttons for other shapes if needed */}
      </div>
    </div>
  ); 
}
