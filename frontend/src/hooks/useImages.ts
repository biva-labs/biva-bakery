import { instance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

async function fetchImages(path: string) {
  const res = await instance.get(`/images/${path}`);
  return res.data;
}

export function useImages(path: string) {
  return useQuery({
    queryKey: ["images", path],
    queryFn: () => fetchImages(path),
    staleTime: 1000 * 60 * 5,
  });
}
