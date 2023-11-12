import { useState } from 'react';
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, TypingIndicator, Message, MessageInput } from '@chatscope/chat-ui-kit-react'
import { useStore } from 'zustand';

const API_KEY = "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";

function App() {

    const [msgs, setMsgs] = useStore()
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "I am Ether",
            sender: "ChatGPT!"
        }
    ])

    const handleSend = async (message: any) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage];

        setTyping(true);
        setMessages(newMessages);-
        processMessageToChatGPT(newMessages).then(() => {
            setTyping(false)
        })
    }

    async function processMessageToChatGPT(chatMessages: any[]) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "user";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant"
            }
            return { role: role, content: messageObject.message }
        });

        const systemMessage = {
            role: "system",
            content: "You are my personal mental health companion - Ether"
        }
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data)
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            );
            setTyping(false);
        })
    }
    return (
        <>
            <div className="App">
                <div style={{ width: "50vw", marginLeft:"auto" }}>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList typingIndicator={typing ? <TypingIndicator content="Ether is typing" /> : null}>
                                {messages.map((message, i) => {
                                    return <Message key={i} model={message as any} />
                                })}
                            </MessageList>
                            <MessageInput placeholder='Type message here' onSend={handleSend}></MessageInput>
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </>
    )
}

export default App