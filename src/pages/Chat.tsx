import { useState } from 'react';
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, TypingIndicator, Message, MessageInput } from '@chatscope/chat-ui-kit-react'
import { useStore } from 'zustand';

const API_KEY = "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"; 

function App() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "I am Ether! Your Personal Mental Health Companion. Answer the questions below to get started!\nHow are you doing today?",
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
            content: "Ask the questions to me 1 by 1 first. You are Ether, My personal mental health companion. You are responsible to assess my mental health and suggest me useful resources on based of the short questions that you will ask me The questions are:   Did you work on your hobbies today? Rate your concentration level today! How active were you today? How would you rate your appetite today? Please rate your sleep quality today? What is your energy level today? Did you have any suicidal thoughts today? If so, how severe were they? How is your self esteem? How would you rate your hopefulness today?"
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
            <div className="App" >
                <div style={{ width: "100vw", height: '100vh' }}>
                    <MainContainer >
                        <ChatContainer>
                            <MessageList /*style={{backgroundImage: 'url("chatbot-page.png")',backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}*/ typingIndicator={typing ? <TypingIndicator content="Ether is typing" /> : null}>
                                {messages.map((message, i) => {
                                    return <Message style={{textAlign: 'left'}} key={i} model={message as any} />
                                })}
                            </MessageList>
                            <MessageInput  placeholder='Type message here' onSend={handleSend}></MessageInput>
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </>
    )
}

export default App
