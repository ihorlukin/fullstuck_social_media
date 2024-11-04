import {
	Follows,
	IMessage,
	ISearchUsersByFiltersResponse,
	IUser
} from './types/user.types'

export const isFollow = (
	currentUser: IUser | null,
	follows: Follows[] | undefined
): boolean => {
	// Проверяем, существует ли currentUser и имеет ли он свойство following
	if (!currentUser || !follows || follows?.length === 0) {
		return false // Если currentUser не существует или не имеет following, возвращаем false
	}
	// Проверяем, есть ли пользователь в списке followedBy
	return follows.some(follow => follow.followedById === currentUser.id)
}

export const isSameSenderMargin = (
	messages: IMessage[],
	m: IMessage,
	i: number,
	userId: string | undefined
): number | 'auto' => {
	// console.log(i === messages.length - 1);
	if (!userId) return 'auto'
	if (
		i < messages.length - 1 &&
		messages[i + 1].sender.id === m.sender.id &&
		messages[i].sender.id !== userId
	)
		return 33
	else if (
		(i < messages.length - 1 &&
			messages[i + 1].sender.id !== m.sender.id &&
			messages[i].sender.id !== userId) ||
		(i === messages.length - 1 && messages[i].sender.id !== userId)
	)
		return 0
	else return 'auto'
}

export const isSameSender = (
	messages: IMessage[],
	m: IMessage,
	i: number,
	userId: string | undefined
): boolean => {
	return (
		i < messages.length - 1 &&
		(messages[i + 1].sender.id !== m.sender.id ||
			messages[i + 1].sender.id === undefined) &&
		messages[i].sender.id !== userId
	)
}

export const isLastMessage = (
	messages: IMessage[],
	i: number,
	userId: string | undefined
): boolean => {
	if (!userId) return false
	// Ensure messages has at least one message
	if (messages.length === 0) return false

	// Check if the current message is the last one
	const isLast = i === messages.length - 1

	// Check if the sender of the last message is not the userId
	const senderIsNotUser = messages[messages.length - 1].senderId !== userId

	// Return true if both conditions are met
	return isLast && senderIsNotUser
}

export const isSameUser = (
	messages: IMessage[],
	m: IMessage,
	i: number
): boolean => {
	return i > 0 && messages[i - 1].sender.id === m.sender.id
}

export const getSender = (user: IUser | null, users: IUser[]) => {
	if (!user) return
	if (!users || users.length === 0) {
		return 'Неизвестный отправитель'
	}
	return users[0].id === user.id ? users[1].username : users[0].username
}

export const getSenderFull = (loggedUser: IUser, users: IUser[]) => {
	return users[0].id === loggedUser.id ? users[1] : users[0]
}

export const formatDateTime = (dateTimeString: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	}

	const dateTime = new Date(dateTimeString)
	return dateTime.toLocaleString('en-US', options)
}

let lastDisplayedDate: string | null = null

export const shouldDisplayDate = (createdDate: string): boolean => {
	const messageDate = new Date(createdDate)
	const currentDate = messageDate.toDateString()

	if (currentDate !== lastDisplayedDate || lastDisplayedDate === null) {
		lastDisplayedDate = currentDate
		return true
	}

	return false
}
