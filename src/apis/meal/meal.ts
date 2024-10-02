import { MealResponse } from "@/types/meal";
import axios from "axios";
import { SERVER_HOST } from "@env";

export const fetchMealData = async (schoolId: number, date: string): Promise<MealResponse> => {
  // 급식 API 는 토큰 필요 없음
  // 예외처리도 schoolId Not Found 만 있음
  const response = await axios.get(`${SERVER_HOST}/school-dataset/meal?schoolId=${schoolId}&date=${date}`);

  return response.data;
};
