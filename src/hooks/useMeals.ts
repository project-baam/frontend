import { useState, useEffect } from "react";
import { MealData } from "../types/meal";
import { fetchMealData } from "@/apis/meal/meal";

export const useMeal = (schoolId: number | null, date: string) => {
  const [meals, setMeals] = useState<MealData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getMealData = async () => {
      if (schoolId === null) {
        setMeals([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchMealData(schoolId, date);
        setMeals(data.list);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        setMeals([]);
      } finally {
        setIsLoading(false);
      }
    };

    getMealData();
  }, [schoolId, date]);

  return { meals, isLoading, error };
};
