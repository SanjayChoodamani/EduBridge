import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ChatContext = createContext(undefined);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInitialContent = async (topic) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/initial/', {
                topic: topic
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Extract and parse the text result
            let parsedContent = {
                text_result: response.data.text_result,
                image_url: response.data.image_url
            };

            
            // Set the content
            setContent(parsedContent);
            
            // Initialize chat with the content
            if (parsedContent.text_result) {
                let initialMessage = Array.isArray(parsedContent.text_result) 
                    ? parsedContent.text_result.join('\n\n')
                    : parsedContent.text_result;

                setMessages([{
                    type: 'bot',
                    content: initialMessage
                }]);
            }
            
            return parsedContent;
        } catch (err) {
            console.error('Error fetching initial content:', err);
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (message, context) => {
        setIsLoading(true);
        setError(null);
        try {
            // Add user message immediately
            setMessages(prev => [...prev, { type: 'user', content: message }]);

            const response = await axios.post('http://127.0.0.1:8000/api/chat/', {
                message,
                context
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Add bot response
            setMessages(prev => [...prev, { 
                type: 'bot', 
                content: response.data.response 
            }]);
            
            return response.data;
        } catch (err) {
            console.error('Error sending message:', err);
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
        setContent(null);
        setError(null);
    };

    return (
        <ChatContext.Provider value={{
            messages,
            content,
            isLoading,
            error,
            sendMessage,
            fetchInitialContent,
            clearMessages
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};