import React, { useEffect, useState } from "react"


export const ChatPage: React.FC = () => {
    return (
        <div>

            <Chat />

        </div>
    )
}

type ChatMessageType = {
    message: string,
    photo: string
    userId: number
    userName: string
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {

        let ws: WebSocket;

        const closeHandler = () => {
            console.log('CLOSE SOCKET');
            setTimeout(createChannel, 3000);
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler);
            setWsChannel(ws);
        }

        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        }

    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }
        wsChannel?.addEventListener('message', messageHandler);

        return () => {
            wsChannel?.removeEventListener('message', messageHandler);
        }

    }, [wsChannel])

    return (
        <div style={{ height: '70vh', overflowY: 'auto' }} >
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

    return (
        <div>
            <img src={message.photo} /> <b>{message.userName}</b>
            <br />
            <p>{message.message}</p>

        </div>
    )
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('');
    const [wsChannelReadyStatus, setWsChannelReadyStatus] = useState<'pending' | 'ready'>('pending');


    useEffect(() => {

        let openHandler = () => {
            setWsChannelReadyStatus('ready');
        }

        wsChannel?.addEventListener('open', openHandler);

        return () => {
            wsChannel?.removeEventListener('open', openHandler);
        }

    }, [wsChannel])


    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel?.send(message);
        setMessage('');
    }

    console.log(wsChannelReadyStatus);

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage} disabled={wsChannelReadyStatus !== 'ready'}>send me</button>
            </div>
        </div>
    )
}