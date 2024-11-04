import { userService } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"


export const useFetchFollowing = (id: string) => {

  const {data, isSuccess, isPending,} = useQuery({
    queryKey: ['fetch followings', id],
    queryFn: () => userService.getFollowing(id)
  })

  return { data, isSuccess, isPending}
}

export const useFetchFollowers = (id: string) => {

  const {data, isSuccess, isPending} = useQuery({
    queryKey: ['fetch followers', id],
    queryFn: () => userService.getFollowers(id)
  })

  return { data, isSuccess, isPending}
}