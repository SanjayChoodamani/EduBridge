import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Loader } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const LearningPage = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = React.useState('');
    const messagesEndRef = useRef(null);
    const {
        messages,
        content,
        isLoading,
        error,
        sendMessage,
        fetchInitialContent,
        clearMessages
    } = useChat();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const loadContent = async () => {
            try {
                clearMessages();
                await fetchInitialContent(decodeURIComponent(topic));
            } catch (error) {
                console.error('Error loading content:', error);
            }
        };

        loadContent();
        return () => clearMessages();
    }, [topic]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const context = messages.map(msg => msg.content).join('\n');
            await sendMessage(newMessage, context);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (isLoading && !content) {
        return (
            <div className="min-h-screen bg-[#0A0B14] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader className="w-8 h-8 text-[#6C5DD3] animate-spin" />
                    <p className="text-white">Loading content...</p>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-[#0A0B14] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-white mb-6 hover:text-[#6C5DD3]"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </button>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Content Section */}
                    <div className="bg-[#1A1B2E] rounded-3xl p-6">
                        <h1 className="text-white text-3xl font-bold mb-6">
                            {decodeURIComponent(topic)}
                        </h1>
                        {content?.image_url && (
                            <div className="relative w-full h-48 mb-6">
                                <img
                                    src={content.image_url}
                                    alt={topic}
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        {content?.text_result && (
                            <div className="space-y-6">
                                {console.log(JSON.parse(content.text_result).notes[0])}
                                {/* Brief Overview */}
                                <div className="text-gray-300">
                                    <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
                                    <p>{JSON.parse(content.text_result).notes[0]}</p>
                                </div>

                                {/* Key Points */}
                                <div className="text-gray-300">
                                    <h2 className="text-xl font-semibold text-white mb-2">Key Points</h2>
                                    <p>{JSON.parse(content.text_result).notes[1]}</p>
                                </div>

                                {/* Detailed Explanation */}
                                <div className="text-gray-300">
                                    <h2 className="text-xl font-semibold text-white mb-2">Detailed Explanation</h2>
                                    <p>{JSON.parse(content.text_result).notes[2]}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat Section */}
                    <div className="bg-[#1A1B2E] rounded-3xl p-6 flex flex-col h-4/5">
                        <div className="mb-4 text-white">
                            <h2 className="text-xl font-semibold">AI Assistant</h2>
                            <p className="text-gray-400 text-sm">Ask questions about {decodeURIComponent(topic)}</p>
                        </div>

                        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg ${
                                        message.type === 'user'
                                            ? 'bg-[#6C5DD3] ml-auto max-w-[80%]'
                                            : 'bg-[#2A2B3E] mr-auto max-w-[80%]'
                                    }`}
                                >
                                    <p className="text-white whitespace-pre-wrap">
                                        {message.content}
                                    </p>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask a question about this topic..."
                                className="flex-1 bg-[#2A2B3E] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading}
                                className="bg-[#6C5DD3] text-white p-2 rounded-lg hover:bg-[#5D4EC4] disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPage;