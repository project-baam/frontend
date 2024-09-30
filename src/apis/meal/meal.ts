import { MealResponse } from "@/types/meal";
import axios from "axios";

export const fetchMealData = async (schoolId: number, date: string): Promise<MealResponse> => {
  // token 없이 호출하는 API
  const response = await axios.get(`https://b-site.site/school-dataset/meal?schoolId=${schoolId}&date=${date}`);

  return response.data;
};
