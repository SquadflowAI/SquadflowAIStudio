import { ProjectDto } from "../dtos/project-dto";

export async function createProjectAPI(project: ProjectDto) {
 
    const response = await fetch('https://localhost:49167/api/Projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
  
    await response.json();

}

export async function getProjectAPI(name: string): Promise<ProjectDto> {
    const response = await fetch(`https://localhost:49167/api/Projects/${name}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function getAllProjectsAPI(): Promise<ProjectDto[]> {
    const response = await fetch(`https://localhost:49167/api/Projects/all`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function getAllProjectsByUserIdAPI(userId: string): Promise<ProjectDto[]> {
    const response = await fetch(`https://localhost:49167/api/Projects/user-id/${userId}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }