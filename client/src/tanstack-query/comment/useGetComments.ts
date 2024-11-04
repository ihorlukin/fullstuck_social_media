import { commentService } from "@/services/comment.service"
import { useQuery } from "@tanstack/react-query"

export const useGetComments = (id: string) => {

  const { data, isSuccess,refetch } = useQuery({
		queryKey: ['comments', id],
		queryFn: () => commentService.getAll(id),
		select: (data) => data.data
	})

  return { data, isSuccess, refetch }
}