import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatBot = ({ initialContent }) => {
    const [messages, setMessages] = useState([
        { type: 'bot', content: initialContent }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { type: 'user', content: input };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('YOUR_CHAT_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    context: messages.map(m => m.content).join('\n')
                }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#1A1B2E] rounded-3xl p-6 flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg ${message.type === 'user'
                                ? 'bg-[#6C5DD3] ml-auto max-w-[80%]'
                                : 'bg-[#2A2B3E] mr-auto max-w-[80%]'
                            }`}
                    >
                        <p className="text-white">{message.content}</p>
                    </div>
                ))}
                {isLoading && (
                    <div className="bg-[#2A2B3E] p-4 rounded-lg mr-auto">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask a question..."
                    className="flex-1 bg-[#2A2B3E] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-[#6C5DD3] text-white p-2 rounded-lg hover:bg-[#5D4EC4] disabled:opacity-50"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ChatBot;