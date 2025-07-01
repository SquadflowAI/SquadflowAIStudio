// CustomNode.jsx
import React from 'react';
import { Handle, Position } from "@xyflow/react";


const CustomNode = ({ id, data, selected }) => {
  return (
    <div className="custom-node">
      <div className="flex items-center node-content">
        {data.label == "Gmail" && <img src="../../gmail.png" className="h-3 mr-3"></img>}
        {data.label}
        <button className="delete-btn" onClick={() => data.onDelete?.(id)}>
          ✕
        </button>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
