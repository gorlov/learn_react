import React, { useEffect, useState } from "react"

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


export const ChatPage: React.FC = () => {
    return (
        <div>

            <Chat />

        </div>
    )
}

type ChatMessageType =   {
    message: string,
    photo: string
    userId: number
    userName: string
  }

const Chat: React.FC = () => {

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages(() => [...messages, ...newMessages]);
        })
    }, [])

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} >
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message: React.FC<{message:ChatMessageType}> = ({message}) => {

    return (
        <div>
            <img src={message.photo} /> <b>{message.userName}</b>
            <br /> 
            <p>{message.message}</p>

        </div>
    )
}

const AddMessageForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>send me</button>
            </div>
        </div>
    )
}