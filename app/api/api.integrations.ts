import IntegrationDto from "../dtos/integration-dto";

export async function createIntegrationAPI(integration: IntegrationDto) {

    const response = await fetch('https://localhost:49165/api/Integrations/create-integration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(integration),
    });
  
    await response.json();
}

 