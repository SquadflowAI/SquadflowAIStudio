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


import shortid from "shortid";
import { UIAgentNodeConnectionDto, UIAgentNodeDto, UIFlowDto } from '../../dtos/ui-flow-dto';
import { createUIFlowAPI, getAllUIFlowsAPI, getUIFlowByIdAPI, updateUIFlowAPI } from '../../api/api.uiflow';
import { getAllToolsAPI } from '../../api/api.tools';
import { getAllAgentsAPI } from '../../api/api.agents';
import CreateFlowModal from '../create-flow-modal';
// import AiChat from '../ui/ai-chat';
// import { getAvailableRoutes } from '../lib/api.uiworkflows';


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
  // const [_selectedFlow, setSelectedFlow] = useState(null);
  const [_actionName, setActionName] = useState('');
  const [_routes, setRoutes] = useState([]);
  const [_tools, setTools] = useState(null);
  const [_agents, setAgents] = useState(null);
  const [_uiFlows, setUiFlows] = useState([]);
  const [_uiFlow, setUiFlow] = useState([]);
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
    async function getFlowDetails() {
      try {
        const response = await getUIFlowByIdAPI(params.id);
        setUiFlow(response);

      } catch (error) {
      } finally {
      }
    }
    getFlowDetails();
  }, []);

  useEffect(() => {
    if (_uiFlow && reactFlowInstance) {
      populateDiagramFlow(_uiFlow);
    }
  }, [_uiFlow, reactFlowInstance]);

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

  useEffect(() => {
    async function getFlowDetails() {
      try {
        const response = await getAllAgentsAPI();
        console.log(response)
      } catch (error) {
      } finally {
      }
    }
    getFlowDetails();
  }, []);



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
        name: type,
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


  }, []);

  const saveWorkflow = () => {
    if (!_uiFlow) {
      return;
    }
    //_selectedOrchestration.name = _actionName;
    _uiFlow.nodes = [];
    _uiFlow.connections = [];
    nodes.forEach(element => {
      let node = new UIAgentNodeDto();
      node.id = element.id, //shortid.generate(),
      node.name = element.name;
      node.positionX = element.position.x;
      node.positionY = element.position.y;

      _uiFlow.nodes.push(node);
    });
    edges.forEach(element => {
      let edge = new UIAgentNodeConnectionDto();
      edge.sourceNodeId = element.source;
      edge.targetNodeId = element.target;

      _uiFlow.connections.push(edge);
    });

    console.log(_uiFlow)
    updateUIFlowAPI(_uiFlow);
    if (_action) {

    } else {
      //  
    }
  }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const populateDiagramFlow = (flow) => {
    setNodes([]);
    setEdges([]);

    //setSelectedFlow(flow);
    console.log("1")
    if (!reactFlowInstance) return;  // Ensure ReactFlow instance is ready
    console.log("2")
    console.log(flow)
    if (flow.nodes) {
      const newNodes = flow.nodes.map((node) => ({
        id: node?.id,  // Use nodeId from the API data
        type: node?.type || 'default',  // Use the node type or default to 'default'
        //flowToScreenPosition
        position: reactFlowInstance.flowToScreenPosition({ x: node?.positionX, y: node?.positionY }),  // Position from API
        data: { label: node?.name },  // Label from API or fallback
        // databaseEntityInput: apiNode.databaseEntityInput,
        // databaseEntityOutput: apiNode.databaseEntityOutput,
      }));

      console.log(nodes)
      // Step 2: Update the nodes state by concatenating the new nodes from API
      setNodes((nds) => nds.concat(newNodes));
      console.log(nodes)
      reactFlowInstance.fitView();
    }

    if (flow.connections) {
      const newEdges = flow.connections.map((connection) => ({
        id: `edge-${connection?.sourceNodeId}-${connection?.targetNodeId}`,  // Unique ID for the edge
        source: connection?.sourceNodeId,  // Source node ID from API
        target: connection?.targetNodeId,  // Target node ID from API
        // type: 'smoothstep',  // Customize edge type if needed
      }));

      // Step 4: Update the edges state by concatenating the new edges from API
      setEdges((eds) => eds.concat(newEdges));
      reactFlowInstance.fitView();
    }

    

  }

  const back = () => {
    if (listGroupSelected) {
      setListGroupSelected(false);
      setListGroupNameSelected("");
    } else {
      router.push(`/dashboard`);
    }
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



  const [listGroupSelected, setListGroupSelected] = useState(false);
  const [listGroupNameSelected, setListGroupNameSelected] = useState("");
  const selectListGroup = (groupName) => {
    setListGroupSelected(true);
    setListGroupNameSelected(groupName);
    setToogleActions(groupName)
    console.log(params.id)
  }




  return (
    <div className="dndflow flex flex-row">
      <div className='flex flex-col w-1/5 bg-slate-100 p-3'>

        <div className='flex flex-row mb-3'>
          <div className=" cursor-pointer" onClick={() => back()}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
            </svg>
          </div>
          {_uiFlow && <span className="bg-blue-100 text-blue-800 text-base font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"> {_uiFlow?.name} flow</span>}

        </div>
        {listGroupSelected && <div className='flex flex-row'>
          <button disabled
            className="w-full focus:outline-none text-white bg-slate-400   focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:focus:ring-slate-900">
            {listGroupNameSelected}
          </button>
        </div>}

        {!listGroupSelected && <div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Triggers")}
              className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Triggers
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Data")}
              className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Data
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Agents")}
              className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Agents
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Data Transformation")}
              className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Data Transformation
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Logic")}
              className="w-full focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs px-5 py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Logic
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Apps")}
              className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Apps
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("AI")}
              className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              AI
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Input")}
              className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Input
            </button>
          </div>
          <div className='flex flex-row'>
            <button
              onClick={() => selectListGroup("Output")}
              className="w-full justify-center focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-xs py-2.5 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">
              Output
            </button>
          </div>
        </div>}


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
        {/* {_toogleActions === "Orchestrations" &&
          <div className='flex-col flex'>
            {_uiFlows?.map((flow, index) => (
              <div className="flex flex-row">
                <button type="button" onClick={() => populateDiagramFlow(flow)}
                  className="w-full focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  {flow?.name}</button>
              </div>
            ))}
          </div>} */}
        {_toogleActions === "AI" &&
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
        {/* <button onClick={openCreateUIFlow} className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Create
        </button> */}
        {/* <CreateFlowModal isOpen={showPage}
          onClose={closeModal}
          onAddPage={createFlow} ></CreateFlowModal> */}
        <button onClick={saveWorkflow} className="focus:outline-none text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Save
        </button>

      </div>
      <div>

        {/* {toogleProperties === AICHAT && <AiChat></AiChat>} */}
      </div>

    </div>

  );
};

export default Studio;