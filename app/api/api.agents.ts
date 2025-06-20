import { AgentDto } from "../dtos/agent-dto";

export async function getAllAgentsAPI(): Promise<AgentDto[]> {
    const response = await fetch(`https://localhost:49153/api/Agent/all`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }