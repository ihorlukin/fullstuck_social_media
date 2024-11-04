import { axiosWithAuth } from "@/api/interceptors"
import { IChat } from "@/types/user.types"

class ChatService {
  private BASE_URL = 'chat'

  async getAll() {
    const response = await axiosWithAuth.get<IChat[]>(
      `${this.BASE_URL}`
    )

    return response
  }

  async create(id: string) {
    const response = await axiosWithAuth.post<IChat>(
      `${this.BASE_URL}/${id}`
    )

    return response
  }

  async delete(id: string) {
    const response = await axiosWithAuth.delete(
      `${this.BASE_URL}/${id}`
    )

    return response
  }

  async getOne(id: string) {
    const response = await axiosWithAuth.get<IChat>(
      `${this.BASE_URL}/${id}`
    )

    return response
  }
}

export const chatService = new ChatService()
