// axios.create() 설정 파일
// - 반복되는 요청 설정(URL, header 등)을 한 번에 정의하기 위해 axios 인스턴스 생성

import axios, { type InternalAxiosRequestConfig } from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api/v1';

// 1. 기본 인스턴스(토큰 필요없는 공개 API)
export const publicApi = axios.create({
  // config 설정 객체
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// 2. 인증 인스턴스(토큰이 필요한 API)
export const privateApi = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  // 세션이나 쿠키 인증용: 쿠키나 인증 헤더 정보를 포함시켜서 요청을 보냄
  withCredentials: true
});

// 요청 인터셉터 설정(privateApi만)
privateApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if(token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (e) => Promise.reject(e));
// 토큰이 없는경우에는 무슨 config 를 리턴하는지..(-)

// 응답 인터셉터 설정
privateApi.interceptors.response.use(response => response, async (e) => {
  console.error("Axios Respons Error: ", e);
  alert('서버 요청중 오류가 발생하였습니다.');
  return Promise.reject(e);
} )
