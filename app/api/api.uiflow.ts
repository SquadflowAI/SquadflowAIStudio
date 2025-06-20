import { ActionRunDto } from "../dtos/action-run-dto";
import { UIFlowDto } from "../dtos/ui-flow-dto";

export async function createUIFlowAPI(uiFlow: UIFlowDto) {
  const response = await fetch('https://localhost:49153/api/UIFlow/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uiFlow),
  });

  return response;
}


export async function updateUIFlowAPI(uiFlow: UIFlowDto) {
  const response = await fetch('https://localhost:49153/api/UIFlow/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uiFlow),
  });

  if (!response.ok) {
    throw new Error('Failed to update data');
  }
}

export async function getUIFlowAPI(name: string): Promise<UIFlowDto> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/${name}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function getUIFlowByIdAPI(id: string): Promise<UIFlowDto> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/id/${id}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function getAllUIFlowsAPI(): Promise<UIFlowDto[]> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/all`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function getUIFlowsByProjectIdAPI(projectId: string): Promise<UIFlowDto[]> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/project-id/${projectId}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function deleteUIFlowByIdAPI(id: string): Promise<any> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/id/${id}`,
    { 
      method: 'DELETE',
      cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to delete data');
    }
  }

  export async function runUIFlowByIdAPI(id: string): Promise<any> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/run/${id}`,
    { 
      method: 'POST',
      cache: 'no-store' });

    return response;
  }

  //ACTION RUNS

  export async function getActionRunsByAgentIdAPI(id: string): Promise<ActionRunDto[]> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/action-runs/by-agentid/${id}`,
    { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;

  }

  export async function getActionRunsByFlowIdAPI(id: string): Promise<ActionRunDto[]> {
    const response = await fetch(`https://localhost:49153/api/UIFlow/action-runs/by-flowid/${id}`,
    { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  }

  // UPLOAD DOWNLOAD FILES

  export const uploadPdfToNodeAPI = async (
    file: File,
    flowId: string,
    nodeId: string,
    key: string
  ): Promise<void> => {
    const formData = new FormData();
    formData.append('flowId', flowId);
    formData.append('nodeId', nodeId);
    formData.append('key', key);
    formData.append('file', file);
  
    const res = await fetch(`https://localhost:49153/api/UIFlow/upload-file`, {
      method: 'POST',
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error(await res.text());
    }
  };
  