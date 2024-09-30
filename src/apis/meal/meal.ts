import { MealResponse } from "@/types/meal";
import axios from "axios";

export const fetchMealData = async (schoolId: number, date: string): Promise<MealResponse> => {
  const response = await axios.get(`https://b-site.site/school-dataset/meal?schoolId=${schoolId}&date=${date}`);
  console.log(response);

  return response.data;
};
