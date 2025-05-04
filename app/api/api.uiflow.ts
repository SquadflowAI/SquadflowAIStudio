import { UIFlowDto } from "../dtos/ui-flow-dto";

export async function createUIFlowAPI(uiFlow: UIFlowDto) {
 
    const response = await fetch('https://localhost:49163/api/UIFlow/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uiFlow),
    });
  
    await response.json();

}

export async function getUIFlowAPI(name: string): Promise<UIFlowDto> {
    const response = await fetch(`https://localhost:49163/api/UIFlow/${name}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function getAllUIFlowsAPI(): Promise<UIFlowDto[]> {
    const response = await fetch(`https://localhost:49163/api/UIFlow/all`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function getUIFlowsByProjectIdAPI(projectId: string): Promise<UIFlowDto[]> {
    const response = await fetch(`https://localhost:49163/api/UIFlow/all/${projectId}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }