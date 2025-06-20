import { AIToolDto } from "../dtos/tools/ai-tool-dto";
import { AppDto } from "../dtos/tools/app-dto";
import { CoreToolDto } from "../dtos/tools/core-tool-dto";
import { ToolDto } from "../dtos/tools/tool-dto";
import { UIFlowDto } from "../dtos/ui-flow-dto";

  export async function getAllToolsAPI(): Promise<ToolDto[]> {
    const response = await fetch(`https://localhost:49153/api/Tools/all`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  }

  export async function getAllCoreToolsAPI(): Promise<CoreToolDto[]> {
    const response = await fetch(`https://localhost:49153/api/Tools/all/core`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  }

  export async function getAllAIToolsAPI(): Promise<AIToolDto[]> {
    const response = await fetch(`https://localhost:49153/api/Tools/all/ai`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  }

  export async function getAllAppsAPI(): Promise<AppDto[]> {
    const response = await fetch(`https://localhost:49153/api/Tools/all/apps`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  }