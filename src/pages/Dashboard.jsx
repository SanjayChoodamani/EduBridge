import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wand2 } from 'lucide-react';
import TopicTree from '../components/TopicTree';
import Navbar from '../components/Navbar';
import { useQuiz } from '../context/QuizContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { fetchQuizData, isLoading } = useQuiz();
    const [topic, setTopic] = useState('');

    const handleGetQuiz = async () => {
        if (!topic.trim()) {
            alert('Please enter a topic');
            return;
        }

        try {
            await fetchQuizData(topic);
            navigate('/quiz');
        } catch (error) {
            alert('Failed to fetch quiz data. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0B14] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-8 mt-8">
                    {/* Left Column */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 space-y-6">
                        {/* Brand Card */}
                        <div>
                        <div className="bg-[#1A1B2E] rounded-3xl p-8 relative overflow-hidden my-4">
                            <div className="absolute top-4 left-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h2 className="text-white text-4xl font-bold mt-12 leading-tight">
                                Interactive<br />Learning<br />Platform
                            </h2>
                            <p className="text-gray-400 mt-4">
                                Explore topics with AI assistance
                            </p>
                        </div>

                        {/* Topic Tree */}
                        <TopicTree />

                        </div>
                        
                        {/* Center Section */}
                        <div className="md:col-span-1">
                            <div className="bg-[#6C5DD3] rounded-3xl p-8 h-full relative overflow-hidden">
                                {/* Logo and Toggle */}
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center space-x-2">
                                        <Sparkles className="w-6 h-6 text-white" />
                                        <span className="text-white text-xl font-semibold">EduBridge</span>
                                    </div>
                                </div>

                                {/* Main Title */}
                                <div className="text-center mb-8">
                                    <h1 className="text-white text-5xl font-bold leading-tight">
                                        Your AI<br />Prompt<br />Companion
                                    </h1>
                                </div>

                                {/* Central Orb */}
                                <div className="relative w-full aspect-square">
                                    <div className="absolute inset-0 bg-[#1A1B2E] rounded-full">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 blur-lg opacity-50"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>
                                            </div>
                                        </div>
                                        {/* Binary Ring */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-full h-full border-4 border-dashed border-gray-600 rounded-full animate-spin-slow"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="space-y-6 ">
                            {/* Toggle Switch */}
                            {/* <div className="flex items-center gap-4 justify-end">
                                <img
                                    src=""
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full "
                                />
                                <button
                                    className="text-gray-300 hover:text-white"
                                >
                                    Logout
                                </button>
                            </div> */}


                            {/* Prompts Counter */}
                            <div className="bg-[#1A1B2E] rounded-3xl p-8">
                                <h3 className="text-white text-6xl font-bold">Quiz</h3>
                                <p className="text-gray-400 mt-2">Test Your Knowlege</p>
                            </div>

                            {/* Feature Cards */}
                            <div className="space-y-6">
                                <div className="bg-[#1A1B2E] rounded-3xl p-8">
                                    <div className="w-12 h-12 bg-[#E6936C] rounded-full flex items-center justify-center mb-4">
                                        <Wand2 className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-white text-xl font-semibold mb-2">Enter your topic</h3>
                                    <div className='flex align-middle gap-3'>
                                        <input
                                            className='text-white bg-transparent p-3 max-w-[300px] border-gray-300 border-2 rounded-md'
                                            type="text"
                                            placeholder="Enter your topic"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                        />
                                        <button
                                            className='border-2 px-6 bg-slate-50 rounded-md gap-10 disabled:opacity-50'
                                            onClick={handleGetQuiz}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Loading...' : 'Get'}
                                        </button>

                                    </div>

                                </div>

                                <div className="bg-[#1A1B2E] rounded-3xl p-8">
                                    <div className="w-12 h-12 bg-[#6C5DD3] rounded-full flex items-center justify-center mb-4">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-white text-xl font-semibold mb-2">Result Enhancer</h3>
                                    <p className="text-gray-400">Boost your prompt precision with keywords.</p>
                                </div>

                                {/* Templates Section */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;