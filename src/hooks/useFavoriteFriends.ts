import { getFavoriteFriends } from "@/apis/favorite-friends/favorite-friends.apis";
import { FavoriteFriend } from "@/apis/favorite-friends/favorite-friends.type";
import { useCallback, useEffect, useState } from "react";

export const useFavoriteFriends = (initialCount: number) => {
  const [friends, setFriends] = useState<FavoriteFriend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchFriends = useCallback(
    async (pageNum: number) => {
      if (!hasMore && pageNum !== 0) return;

      setLoading(true);
      try {
        const { list, total } = await getFavoriteFriends({ count: initialCount, page: pageNum });
        setTotalCount(total);

        if (pageNum === 0) {
          setFriends(list);
        } else {
          setFriends((prev) => [...prev, ...list]);
        }

        setHasMore(friends.length + list.length < total);
      } catch (err: any) {
        console.error(err.message);
        console.error(err.stack);
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    },
    [initialCount, friends.length]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchFriends(page + 1);
    }
  }, [loading, hasMore, page, fetchFriends]);

  useEffect(() => {
    fetchFriends(0);
  }, []);

  const refetch = useCallback(() => {
    setHasMore(true);
    setPage(0);
    fetchFriends(0);
  }, [fetchFriends]);

  return { friends, loading, error, refetch, loadMore, hasMore, totalCount };
};
