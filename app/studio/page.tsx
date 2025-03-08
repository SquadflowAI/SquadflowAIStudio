"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
// import { ActionWorkflowConnectionDto, ActionWorkflowNodeDto, ActionWrokflowDto } from '../dtos/action-workflow-dto';
// import { EntityDto } from '../dtos/entity-dto';
// import { createActionWorkflow, getActions, updateActionWorkflow } from '../lib/api.actions';
// import { getEntities } from '../lib/api.entities';
// import shortid from "shortid";
// import AiChat from '../ui/ai-chat';
// import { getAvailableRoutes } from '../lib/api.uiworkflows';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Data Input' },
    position: { x: 365.8773193359375, y: -84.99768447875977 },
  },
];

const PROPERTIES = "PROPERTIES"
const AICHAT = "AICHAT"
const DATAINPUT = 'Data Input';
const SAVEINDB = 'Save in DB';
const OPENPAGE = 'Open Page';

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [toogleActions, setToogleActions] = useState("1");
  const [toogleProperties, setToogleProperties] = useState(PROPERTIES);
  const [actions, setActions] = useState([]);
  const [action, setAction] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [entities, setEntities] = useState([]);
  const [selectedEntityOption, setSelectedEntityOption] = useState(null);
  const [selectedPageRoute, setSelectedPageRoute] = useState(null);
  const [actionName, setActionName] = useState('');
  const [routes, setRoutes] = useState([]);
  //const [orderNumber, setOrderNumber] = useState(0);
  let ordNubmer = 0;
  const getOrderNumber = () => {
    //ordNubmer++
    //setOrderNumber(ordNubmer++);
    return ordNubmer++;
  };

//   useEffect(() => {
//     async function fetchActions() {
//       try {
//         const response = await getActions();
//         setActions(response);
//       } catch (error) {
//       } finally {
//       }
//     }
//     fetchActions();
//   }, []);

//   useEffect(() => {
//     async function fetchRoutes() {
//       try {
//         const response = await getAvailableRoutes();
//         setRoutes(response);
//       } catch (error) {
//       } finally {
//       }
//     }
//     fetchRoutes();
//   }, []);

//   async function fetchEntities() {
//     try {
//       const response = await getEntities();
//       setEntities(response);
//     } catch (error) {
//     } finally {
//     }
//   }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: 1,//shortid.generate(),
        orderNumber: getOrderNumber(),
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => [...nds, newNode]);

      //  setNodes((nds) => nds.concat(newNode));

    },
    [reactFlowInstance],
  );

  const onNodeClick = useCallback((event, node) => {
    // setSelectedEntityOption("")
    // setSelectedNode(node);

    // if (node.type == "Save in DB") { 
    //   let currentNode = nodes.find(x => x.id == node.id);
    //   if (node.databaseEntityInput) {
    //     let currentSelectedEntity = node.databaseEntityInput.name;
    //     setSelectedEntityOption(currentSelectedEntity)
    //   }
    // }

    // if (node.type == "Open Page") { 
    //   let currentNode = nodes.find(x => x.id == node.id);
    //   if (node.inMemoryEntityOutputData) {
    //     let currentSelectedPageRoute = node.inMemoryEntityOutputData.routeName;
    //     setSelectedPageRoute(currentSelectedPageRoute)
    //   }
    // }

   // fetchEntities();
  }, []);

//   const setSelectedAction = (action) => {
//     setNodes([]);
//     setEdges([]);
//     setActionName(action?.name);
//     setAction(action);
//     if (!reactFlowInstance) return;  // Ensure ReactFlow instance is ready
//     console.log(action)
//     // Step 1: Add all nodes from action.nodes array
//     const newNodes = action.nodes.map((apiNode) => ({
//       id: apiNode.nodeId,  // Use nodeId from the API data
//       orderNumber: apiNode.orderNumber,
//       type: apiNode.type || 'default',  // Use the node type or default to 'default'
//       position: reactFlowInstance.project({ x: apiNode.positionX, y: apiNode.positionY }),  // Position from API
//       data: { label: apiNode.type },  // Label from API or fallback
//       databaseEntityInput: apiNode.databaseEntityInput,
//       databaseEntityOutput: apiNode.databaseEntityOutput,
//     }));

//     // Step 2: Update the nodes state by concatenating the new nodes from API
//     setNodes((nds) => nds.concat(newNodes));
//     console.log(nodes)

//     // Step 3: Add all edges from action.connections array
//     const newEdges = action.connections.map((connection) => ({
//       id: `edge-${connection.sourceNodeId}-${connection.targetNodeId}`,  // Unique ID for the edge
//       source: connection.sourceNodeId,  // Source node ID from API
//       target: connection.targetNodeId,  // Target node ID from API
//       // type: 'smoothstep',  // Customize edge type if needed
//     }));

//     // Step 4: Update the edges state by concatenating the new edges from API
//     setEdges((eds) => eds.concat(newEdges));

//   }

//   const saveWorkflow = () => {
//     let workflow = new ActionWrokflowDto();
//     workflow.name = actionName;
//     workflow.nodes = [];
//     workflow.connections = [];
//     nodes.forEach(element => {
//       let node = new ActionWorkflowNodeDto();
//       node.nodeId = element.id;
//       node.orderNumber = element.orderNumber,
//       node.type = element.type;
//       node.positionX = element.position.x;
//       node.positionY = element.position.y;
//       node.databaseEntityInput = element.databaseEntityInput;
//       if(element.inMemoryEntityOutputData?.routeName){
//         node.inMemoryEntityOutputData = element.inMemoryEntityOutputData.routeName;
//       }
      
//       workflow.nodes.push(node);
//     });
//     edges.forEach(element => {
//       let edge = new ActionWorkflowConnectionDto();
//       edge.sourceNodeId = element.source;
//       edge.targetNodeId = element.target;
//       workflow.connections.push(edge);
//     });

//     console.log(workflow)

//     if (action) {
//       workflow.id = action.id;
//       updateActionWorkflow(workflow);
//     } else {
//       createActionWorkflow(workflow);
//     }
//   }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

//   const handleChangeForSelectEntity = (event) => {
//     setSelectedEntityOption(event.target.value);
//     const updatedNodes = nodes.map(node => {
//       if (node.type === selectedNode?.type) {
//         return {
//           ...node,
//           databaseEntityInput: {
//             ...node.databaseEntityInput,
//             name: event.target.value,
//           },
//         };
//       }
//       return node;
//     });
//     setNodes(updatedNodes);
//   };

//   const handleChangeForSelectedPageRoute = (event) => {
//     setSelectedPageRoute(event.target.value);
//     const updatedNodes = nodes.map(node => {
//       if (node.type === selectedNode?.type) {
//         return {
//           ...node,
//           inMemoryEntityOutputData: {
//             ...node.inMemoryEntityOutputData,
//             routeName: event.target.value,
//           },
//         };
//       }
//       return node;
//     });
//     console.log(updatedNodes)
//     setNodes(updatedNodes);
//   };


  return (
    <div className="dndflow flex flex-row">

      <div className='flex flex-col w-1/5 bg-slate-200 p-3'>
        {/* <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("1")}
            className="mr-1 w-1/2 justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm   py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Components
          </button>
          <button
            onClick={() => setToogleActions("2")}
            className="w-1/2 focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Actions
          </button>
        </div> */}
        {/* <button onDragStart={(event) => onDragStart(event, 'input')} draggable type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Navbar</button> */}
        {toogleActions === "1" &&
          <div className='flex-col flex'>
            <button onDragStart={(event) => onDragStart(event, 'Data Input')} draggable className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Data Input
            </button>
            <button onDragStart={(event) => onDragStart(event, 'Api Call')} draggable className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Api Call
            </button>
            <button onDragStart={(event) => onDragStart(event, 'Response')} draggable className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Response
            </button>
            <button onDragStart={(event) => onDragStart(event, 'Save in DB')} draggable className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Save in DB
            </button>
            <button onDragStart={(event) => onDragStart(event, 'Open Page')} draggable className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Open Page
            </button>
          </div>}
        {toogleActions === "2" &&
          <div className='flex-col flex'>
            {/* {actions.map((action, index) => (
              <div className="flex flex-row">
                <button type="button"
                  onClick={() => { setSelectedAction(action) }}
                  className="w-full focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  {action?.name}</button>
              </div>
            ))} */}
          </div>}
      </div>
      <div className='flex flex-col w-3/5'>
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>

        </ReactFlowProvider>
      </div>
      <div className='flex flex-col w-1/5'>
        {/* <button onClick={saveWorkflow} className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Save</button>
        <input
          type="text"
          value={actionName}
          onChange={(e) => setActionName(e.target.value)}
          placeholder="Action Name"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </input>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleProperties(PROPERTIES)}
            className="mr-1 w-1/2 justify-center focus:outline-none text-black bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm   py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Properties
          </button>
          <button
            onClick={() => setToogleProperties(AICHAT)}
            className="w-1/2 focus:outline-none text-black bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            AI Chat
          </button> */}
        </div>
        <div>
          {/* {toogleProperties === PROPERTIES &&
            <div>
              <div>Node name: {selectedNode?.type}</div>
              {selectedNode?.type === DATAINPUT &&
                <div className="w-full">
                  <div>Data Collection: </div>
                  <select
                    id="optionsDropdown"
                    value={selectedEntityOption}
                    onChange={handleChangeForSelectEntity}  // Set selected option on change
                    className="m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select an option</option>
                    {entities.map((entity, index) => (
                      <option key={index} value={entity.name}>
                        {entity.name}
                      </option>
                    ))}
                  </select>
                </div>
              }
              {selectedNode?.type === SAVEINDB &&
                <div className="w-full">
                  <div>Entity Type: </div>
                  <select
                    id="optionsDropdown"
                    value={selectedEntityOption}
                    onChange={handleChangeForSelectEntity}  // Set selected option on change
                    className="m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select an option</option>
                    {entities.map((entity, index) => (
                      <option key={index} value={entity.name}>
                        {entity.name}
                      </option>
                    ))}
                  </select>
                </div>
              }
              {selectedNode?.type === OPENPAGE &&
                <div className="w-full">
                  <div>Page to Open: </div>
                  <select
                    id="optionsDropdown"
                    value={selectedPageRoute}
                    onChange={handleChangeForSelectedPageRoute}  // Set selected option on change
                    className="m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select an option</option>
                    {routes.map((route, index) => (
                      <option key={index} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                </div>
              }
            </div>
          } */}
          {/* {toogleProperties === AICHAT && <AiChat></AiChat>} */}
        </div>

      </div>
     
  );
};

export default DnDFlow;