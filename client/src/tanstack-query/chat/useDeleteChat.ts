import { chatService } from "@/services/chat.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteChat = (userId: string) => {

  const queryClient = useQueryClient()
  const {mutate: deleteChat, data} = useMutation({
    mutationKey: ['create chat'],
    mutationFn: (id: string) => chatService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['fetch chats', userId]
      })
    }
  })

  return {deleteChat, data}
}