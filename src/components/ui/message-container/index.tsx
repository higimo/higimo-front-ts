import { FunctionComponent } from 'preact'

import { useEffect, useState } from 'preact/hooks'

import { Message } from 'components/ui/message'

type MessageContent = {
	id: string
	message: string
}
type MessageContainerPropsType = {
	/**
	 * Через сколько скроется в секундах
	 */
	autoCloseDelay?: number
}

export const MessageContainer: FunctionComponent<MessageContainerPropsType> = ({ autoCloseDelay = 40 }) => {
	const [messages, setMessages] = useState<MessageContent[]>([])

	const removeMessage = (id: string) => {
		setMessages(prev => prev.filter((toast) => toast.id !== id))
	}

	const handleAddMessage = (event: CustomEvent<{ message: string }>) => {
		const newMessage = {
			id: Date.now().toString(),
			message: event.detail.message,
		}
		setMessages(prev => [newMessage, ...prev])
		setTimeout(() => {
			removeMessage(newMessage.id)
		}, autoCloseDelay * 1000)
	}

	useEffect(() => {
		const eventListener = (e: Event) => handleAddMessage(e as CustomEvent)
		window.addEventListener('add-message', eventListener)

		return () => window.removeEventListener('add-message', eventListener)
	}, [])

	return (
		<div className="toast-container">
			{messages.map((toast) => (
				<Message
					key={toast.id}
					id={toast.id}
					text={toast.message}
				/>
			))}
		</div>
	)
}

