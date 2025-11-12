// 페이지 전역 공통 데이터값 호출 API

import { publicApi } from "./axiosInstance"

// - 웹페이지 구성을 위한 데이터이기 때문에 public 호출 (token 필요 X)
export const getCommons = async () => {
  const res = await publicApi.get('/common');
  return res.data.data;
}

export interface CommonResponse {
  categories: string[];
  regions: string[];
}