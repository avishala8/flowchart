import { NodeResizer } from "@reactflow/node-resizer";

export function StyledNodeResizer({ selected }) {
    if (selected) {
        return (
            <NodeResizer
                minWidth={128}
                minHeight={128}
                lineClassName="border-primary"
                handleClassName="bg-white border border-primary rounded-circle"
                handleStyle={{
                    width: "10px",
                    height: "10px",
                }}
            />
        );
    }

    return null;
}
