import { customAxios } from "../instance";
import { FavoriteFriendResponse } from "./favorite-friends.type";

export const getFavoriteFriends = async ({
  count,
  page
}: {
  count: number;
  page: number;
}): Promise<FavoriteFriendResponse> => {
  const response = await customAxios.get<FavoriteFriendResponse>(`friends/favorites?count=${count}&page=${page}`);

  return response.data;
};
