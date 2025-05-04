"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background, BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useRouter } from "@/node_modules/next/navigation";

import { useParams } from 'next/navigation';

// import { ActionWorkflowConnectionDto, ActionWorkflowNodeDto, ActionWrokflowDto } from '../dtos/action-workflow-dto';
// import { EntityDto } from '../dtos/entity-dto';
// import { createActionWorkflow, getActions, updateActionWorkflow } from '../lib/api.actions';
// import { getEntities } from '../lib/api.entities';
import shortid from "shortid";
import { UIAgentNodeConnectionDto, UIAgentNodeDto, UIFlowDto } from '../../dtos/ui-flow-dto';
import { createUIFlowAPI, getAllUIFlowsAPI } from '../../api/api.uiflow';
import { getAllToolsAPI } from '../../api/api.tools';
import { getAllAgentsAPI } from '../../api/api.agents';
import CreateFlowModal from '../create-flow-modal';
// import AiChat from '../ui/ai-chat';
// import { getAvailableRoutes } from '../lib/api.uiworkflows';

// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'Data Input' },
//     position: { x: 365.8773193359375, y: -84.99768447875977 },
//   },
// ];

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const PROPERTIES = "PROPERTIES"
const AICHAT = "AICHAT"
const DATAINPUT = 'Data Input';
const SAVEINDB = 'Save in DB';
const OPENPAGE = 'Open Page';

const Studio = () => {
  const params = useParams();

  const reactFlowWrapper = useRef(null);
  // const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [_toogleActions, setToogleActions] = useState("Agents");
  const [_toogleProperties, setToogleProperties] = useState(PROPERTIES);
  const [_actions, setActions] = useState([]);
  const [_action, setAction] = useState(null);
  const [_selectedNode, setSelectedNode] = useState(null);
  const [_entities, setEntities] = useState([]);
  // const [_selectedEntityOption, setSelectedEntityOption] = useState(null);
  // const [_selectedPageRoute, setSelectedPageRoute] = useState(null);
  const [_selectedFlow, setSelectedFlow] = useState(null);
  const [_actionName, setActionName] = useState('');
  const [_routes, setRoutes] = useState([]);
  const [_tools, setTools] = useState(null);
  const [_agents, setAgents] = useState(null);
  const [_uiFlows, setUiFlows] = useState([]);
  //const [orderNumber, setOrderNumber] = useState(0);
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const closeModal = () => setShowPage(false);

  let ordNubmer = 0;
  const getOrderNumber = () => {
    //ordNubmer++
    //setOrderNumber(ordNubmer++);
    return ordNubmer++;
  };

  const openCreateUIFlow = () => {
    setShowPage(true)
  }

  useEffect(() => {
    async function getUIOrchestrations() {
      try {
        const response = await getAllUIFlowsAPI();
        setUiFlows(response);
      } catch (error) {
      } finally {
      }
    }
    getUIOrchestrations();
  }, []);

  useEffect(() => {
    async function getTools() {
      try {
        const response = await getAllToolsAPI();
        setTools(response);
      } catch (error) {
      } finally {
      }
    }
    getTools();
  }, []);

  useEffect(() => {
    async function getAgents() {
      try {
        const response = await getAllAgentsAPI();
        setAgents(response);
      } catch (error) {
      } finally {
      }
    }
    getAgents();
  }, []);

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

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [],
  // );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
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
        id: shortid.generate(),
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

  const saveWorkflow = () => {
    if (!_selectedFlow) {
      return;
    }
    //_selectedOrchestration.name = _actionName;
    _selectedFlow.nodes = [];
    _selectedFlow.connections = [];
    nodes.forEach(element => {
      let node = new UIAgentNodeDto();
      node.id = element.id, //shortid.generate(),
        node.positionX = element.position.x;
      node.positionY = element.position.y;

      _selectedFlow.nodes.push(node);
    });
    edges.forEach(element => {
      let edge = new UIAgentNodeConnectionDto();
      edge.sourceNodeId = element.source;
      edge.targetNodeId = element.target;

      _selectedFlow.connections.push(edge);
    });

    console.log(_selectedFlow)
    createUIFlowAPI(_selectedFlow);
    if (_action) {

    } else {
      //  
    }
  }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const selectFlow = (flow) => {
    setNodes([]);
    setEdges([]);

    setSelectedFlow(flow);
    console.log("1")
    if (!reactFlowInstance) return;  // Ensure ReactFlow instance is ready
    console.log("2")
    const newNodes = flow.nodes.map((apiNode) => ({
      id: apiNode.nodeId,  // Use nodeId from the API data
      orderNumber: apiNode.orderNumber,
      type: apiNode.type || 'default',  // Use the node type or default to 'default'
      position: reactFlowInstance.project({ x: apiNode.positionX, y: apiNode.positionY }),  // Position from API
      data: { label: apiNode.type },  // Label from API or fallback
      // databaseEntityInput: apiNode.databaseEntityInput,
      // databaseEntityOutput: apiNode.databaseEntityOutput,
    }));

    // Step 2: Update the nodes state by concatenating the new nodes from API
    setNodes((nds) => nds.concat(newNodes));
    console.log(nodes)

    const newEdges = flow.connections.map((connection) => ({
      id: `edge-${connection.sourceNodeId}-${connection.targetNodeId}`,  // Unique ID for the edge
      source: connection.sourceNodeId,  // Source node ID from API
      target: connection.targetNodeId,  // Target node ID from API
      // type: 'smoothstep',  // Customize edge type if needed
    }));

    // Step 4: Update the edges state by concatenating the new edges from API
    setEdges((eds) => eds.concat(newEdges));
  }

  const back = () => {
    router.push(`/dashboard`);
  }

  const createFlow = (name) => {

    let uiflow = new UIFlowDto();
    uiflow.name = name;
    uiflow.nodes = [];
    uiflow.connections = [];

    // pageTemplate.pageName = name;

    _uiFlows.push(uiflow);
    setSelectedFlow(uiflow);

    // let workflow: SaveUIWrokflowDto = new SaveUIWrokflowDto();
    // workflow.workflowId = "1";

    // workflow.uIWorkflowJson = JSON.stringify(layout);

    // setDtoTest(workflow);
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
      <div className='flex flex-col w-1/5 bg-slate-100 p-3'>
        {/* <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Orchestrations")}
            className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Flows
          </button>
        </div> */}
        <div className="mb-3 cursor-pointer" onClick={() => back()}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
          </svg>
        </div>

        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Agents")}
            className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Triggers
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Agents")}
            className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Data
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Agents")}
            className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Agents
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Agents")}
            className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Data Transformation
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Agents")}
            className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Logic
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Tools")}
            className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Apps
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Tools")}
            className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            AI
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Tools")}
            className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Input
          </button>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={() => setToogleActions("Tools")}
            className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
            Output
          </button>
        </div>

        {/* <button onDragStart={(event) => onDragStart(event, 'input')} draggable type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Navbar</button> */}
        {_toogleActions === "Agents" &&
          <div className='flex-col flex'>
            {_agents?.map((agent, index) => (
              <div className="flex flex-row">
                <button type="button"
                  className="w-full focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  {agent?.name}</button>
              </div>
            ))}
          </div>}
        {_toogleActions === "Orchestrations" &&
          <div className='flex-col flex'>
            {_uiFlows?.map((uiOrchestration, index) => (
              <div className="flex flex-row">
                <button type="button" onClick={() => selectFlow(uiOrchestration)}
                  className="w-full focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  {uiOrchestration?.name}</button>
              </div>
            ))}
          </div>}
        {_toogleActions === "Tools" &&
          <div className='flex-col flex'>
            {_tools?.map((tool, index) => (
              <div className="flex flex-row">
                <button type="button" onDragStart={(event) => onDragStart(event, tool?.name)} draggable
                  className="w-full focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  {tool?.name}</button>
              </div>
            ))}
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
              <Background
                variant={BackgroundVariant.Dots}
                color="blue"
                gap={25}
                size={1}
              />
            </ReactFlow>
          </div>

        </ReactFlowProvider>
      </div>
      <div className='flex flex-col w-1/5 bg-slate-100 p-3'>
        <button onClick={openCreateUIFlow} className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Create
        </button>
        <CreateFlowModal isOpen={showPage}
          onClose={closeModal}
          onAddPage={createFlow} ></CreateFlowModal>
        <button onClick={saveWorkflow} className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Save
        </button>
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

export default Studio;