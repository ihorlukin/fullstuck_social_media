import { postService } from "@/services/post.service";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";


export function useFindPosts(id: string){

  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
		queryKey: ['posts', id],
		queryFn: () => postService.getAll(id),
		select: (data) => data.data 
	})

  return { data, isLoading, isError, error, isSuccess, refetch }
}

