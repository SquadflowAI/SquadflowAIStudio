import { API_BASE_URL } from "../constants";
import FileData from "../dtos/data/file-data";

export const uploadDataFileAPI = async (
  file: File,
  projectId: string
): Promise<void> => {
  const formData = new FormData();
  formData.append('projectId', projectId);
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/Data/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
};

export async function getDataByProjectIdAPI(projectId: string): Promise<FileData[]> {
  const response = await fetch(`${API_BASE_URL}/Data/${projectId}`,
    { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

export async function deleteDataFileByIdAPI(id: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/Data/${id}`,
    {
      method: 'DELETE',
      cache: 'no-store'
    });

  if (!response.ok) {
    throw new Error('Failed to delete data');
  }
}