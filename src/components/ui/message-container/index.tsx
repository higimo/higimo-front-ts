import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Message } from "../message";

// type ToastPropsType = MessageContent & {
//   removeToast: (id: string) => void;
// }

// const Toast: React.FC<ToastPropsType> = ({ id, message, removeToast }) => {
// 	useEffect(() => {
// 		const timer = setTimeout(() => {
// 			removeToast(id);
// 		}, 8000);

// 		return () => clearTimeout(timer);
// 	}, [id, removeToast]);

// 	return (
// 		<div className="toast">
// 			<div className="toast-content">{message}</div>
// 			<button 
// 				className="toast-close-button"
// 				onClick={() => removeToast(id)}
// 				aria-label="Закрыть уведомление"
// 			>
// 				&times;
// 			</button>
// 		</div>
// 	);
// };

type MessageContent = {
	id: string;
	message: string;
}
type MessageContainerPropsType = {
	/**
	 * Через сколько скроется в секундах
	 */
	autoCloseDelay?: number;
}
  
export const MessageContainer: FunctionComponent<MessageContainerPropsType> = ({ autoCloseDelay = 40 }) => {
	const [messages, setMessages] = useState<MessageContent[]>([]);

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
	);
};

