import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat_reducer"
import { ThunkDispatch } from "redux-thunk"
import { useSelector } from "react-redux"
import { AppStateRedicerType } from "../../redux/redux_store"


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

    const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])

    // useEffect(() => {

    //     let ws: WebSocket;

    //     const closeHandler = () => {
    //         console.log('CLOSE SOCKET');
    //         setTimeout(createChannel, 3000);
    //     }

    //     function createChannel() {
    //         ws?.removeEventListener('close', closeHandler);
    //         ws?.close();

    //         ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    //         ws.addEventListener('close', closeHandler);
    //         setWsChannel(ws);
    //     }

    //     createChannel();

    //     return () => {
    //         ws.removeEventListener('close', closeHandler);
    //         ws.close();
    //     }

    // }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC<{}> = ({ }) => {

    const messages = useSelector((state: AppStateRedicerType) => state.chat.messages);


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

const AddMessageForm: React.FC<{}> = ({ }) => {
    const [message, setMessage] = useState('');
    // const [wsChannelReadyStatus, setWsChannelReadyStatus] = useState<'pending' | 'ready'>('pending');
    const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();


    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage('');
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessageHandler} >send me</button>
            </div>
        </div>
    )
}