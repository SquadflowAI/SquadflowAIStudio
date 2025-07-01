import { FlowTemplateDto } from "../dtos/flow-template-dto";

export async function getAllFlowTemplatesAPI(): Promise<FlowTemplateDto[]> {
    const response = await fetch(`https://localhost:49155/api/FlowTemplates`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }