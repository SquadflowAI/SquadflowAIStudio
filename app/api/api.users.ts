import { CreateUserDto } from "../dtos/create-user-dto";
import { LoginRequestDto } from "../dtos/login-request-dto";
import { LoginResponseDto } from "../dtos/login-response-dto";
import { UserDto } from "../dtos/user-dto";

export async function createUserAPI(user: CreateUserDto) {

    const response = await fetch('https://localhost:49153/api/User/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  
    await response.json();
}

export async function getUserByIdAPI(id: string): Promise<UserDto> {
    const response = await fetch(`https://localhost:49153/api/User/${id}`,
    { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  }

  export async function loginAPI(loginRequest: LoginRequestDto): Promise<LoginResponseDto>  {

    const response = await fetch('https://localhost:49153/api/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });
  
    const data = await response.json();
    return data;
}