import { ToolDto } from "../dtos/tool-dto";
import { UIFlowDto } from "../dtos/ui-flow-dto";

  export async function getAllToolsAPI(): Promise<ToolDto[]> {
    const response = await fetch(`https://localhost:49163/api/Tools/all`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }