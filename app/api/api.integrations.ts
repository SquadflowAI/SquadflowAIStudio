import IntegrationDto from "../dtos/integration-dto";

export async function createIntegrationAPI(integration: IntegrationDto) {

    const response = await fetch('https://localhost:49155/api/Integrations/create-integration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(integration),
    });
  
    await response.json();
}

export async function getAllIntegrationsByUserIdAPI(userId: string): Promise<IntegrationDto> {
  const response = await fetch(`https://localhost:49155/api/Integrations/user-id/${userId}`,
  { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

 