import { useReactFlow } from 'reactflow';
import React, { useCallback} from "react";


export function useNodeActions() {
    const { getNode, addNodes, setNodes, setEdges,  } = useReactFlow();

    // Duplicate node function
    const duplicateNode = useCallback((id) => {
        const node = getNode(id);
    // Check if node is defined
    if (!node) {
        console.error(`Node with ID ${id} not found`);
        return;
    }
        const newPosition = {
            x: node.position.x + 50,
            y: node.position.y + 50,
        };

        const newNode = {
            ...node,
            id: crypto.randomUUID(),
            position: newPosition,
            data: { ...node.data }, // Duplicating the node's data including edited text
            selected: false,
        };

        addNodes([newNode])
    }, [getNode, addNodes]);

    // Delete node function
    const deleteNode = useCallback((id) => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    }, [setNodes, setEdges]);

    return { duplicateNode, deleteNode };
}
