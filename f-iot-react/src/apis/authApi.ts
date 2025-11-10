import { publicApi } from "./axiosInstance";

interface SignInRequest {
  loginId: string;
  password: string;
}

interface SignInResponse {
  username: string;
  accessToken: string;
}

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const res = await publicApi.post('/auth/sign-in', data);
  
  if(!res.data.success) {
    throw new Error('Login failed');
  }

  return res.data.data;
}
/*
┌──────────────────────────────────────┐
│ 브라우저 (React: http://localhost:5173) │
│  ↓                                    │
│  axios.post('/auth/sign-in')          │
│  ↓                                    │
│  실제 요청 → http://localhost:8080/api/v1/auth/sign-in │
│                                       │
│  ↓                                    │
│ Spring Boot Controller (AuthController)│
│  ↓                                    │
│ Service → Repository → DB             │
│  ↓                                    │
│ 결과 JSON 응답 반환                   │
│  ↑                                    │
│ React 가 결과 받아서 화면 갱신        │
└──────────────────────────────────────┘

[React]
axios.post('/auth/sign-in', {loginId, password})
    ↓
baseURL 결합 → http://localhost:8080/api/v1/auth/sign-in
    ↓
[Spring Boot Controller]
@RequestMapping("/api/v1/auth")
@PostMapping("/sign-in")
public ResponseDto<LoginResponse> signIn(...) { ... }
    ↓
[Service / Repository / DB]
    ↓
JSON 응답 반환
    ↑
axios 응답 → data.accessToken 등으로 사용
*/