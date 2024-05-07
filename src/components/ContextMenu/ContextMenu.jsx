// import React, { useCallback } from 'react';
// import { useReactFlow } from 'reactflow';

// export default function ContextMenu({
//     id,
//     top,
//     left,
//     right,
//     bottom,

//     ...props
// }) {
//     const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

//     // Duplicate node function
//     const duplicateNode = useCallback(() => {
//         const node = getNode(id);
//         const position = {
//             x: node.position.x + 50,
//             y: node.position.y + 50,
//         };

//         addNodes({
//             ...node,
//             id: crypto.randomUUID(),
//             position,
//             selected: false,
//             data: { ...node.data },
//         });


//     }, [id, getNode, addNodes]);

//     // Delete node function
//     const deleteNode = useCallback(() => {
//         setNodes((nodes) => nodes.filter((node) => node.id !== id));
//         setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));


//     }, [id, setNodes, setEdges]);

//     // Style the context menu based on provided coordinates
//     const style = {
//         position: 'absolute',
//         top: top ? top : 'auto',
//         left: left ? left : 'auto',
//         right: right ? right : 'auto',
//         bottom: bottom ? bottom : 'auto',
//         zIndex: 9999,
//         backgroundColor: 'white',
//         border: '1px solid #ccc',
//         padding: '10px',
//     };

//     return (
//         <div style={style} {...props}>
//             {/* <p style={{ margin: '0.5em' }}>
//                 <small>Node: {id}</small>
//             </p> */}
//             <button onClick={duplicateNode}>Duplicate</button>
//             <button onClick={deleteNode}>Delete</button>
//         </div>
//     );
// }

import React from 'react';
import { useNodeActions } from './nodeActions';

export default function ContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    ...props
}) {
    const { duplicateNode, deleteNode } = useNodeActions();

    const style = {
        position: 'absolute',
        top: top ? top : 'auto',
        left: left ? left : 'auto',
        right: right ? right : 'auto',
        bottom: bottom ? bottom : 'auto',
        zIndex: 9999,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '10px',
    };

    return (
        <div style={style} {...props}>
            <button onClick={() => duplicateNode(id)}>Duplicate</button>
            <button onClick={() => deleteNode(id)}>Delete</button>
        </div>
    );
}

