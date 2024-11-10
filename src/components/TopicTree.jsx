import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { scienceTopics } from '../data/scienceTopics';
import { useNavigate } from 'react-router-dom';

const TopicTree = () => {
    const [expandedItems, setExpandedItems] = useState({});
    const navigate = useNavigate();

    const toggleExpand = (key) => {
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleTopicClick = (mainTopic, subTopic, topic) => {
        const fullTopic = `${ mainTopic } - ${ subTopic } - ${ topic }`;
        navigate(`/learn/${ encodeURIComponent(fullTopic) }`);
    };

    return (
        <div className="bg-[#1A1B2E] rounded-3xl p-6">
            <h3 className="text-white text-xl font-bold mb-6">7th Grade Science Topics</h3>
            <div className="space-y-4">
                {Object.entries(scienceTopics["7th Science"]).map(([category, topics]) => (
                    <div key={category} className="space-y-2">
                        <button
                            className="flex items-center space-x-2 w-full text-left hover:bg-[#2A2B3E] p-2 rounded-lg text-white"
                            onClick={() => toggleExpand(category)}
                        >
                            {expandedItems[category] ? (
                                <ChevronDown className="w-5 h-5" />
                            ) : (
                                <ChevronRight className="w-5 h-5" />
                            )}
                            <span className="font-semibold">{category}</span>
                        </button>

                        {expandedItems[category] && (
                            <div className="ml-6 space-y-2">
                                {topics.map((topic) => (
                                    <button
                                        key={topic}
                                        className="flex items-center space-x-2 w-full text-left text-gray-300 hover:text-white hover:bg-[#2A2B3E] p-2 rounded-lg"
                                        onClick={() => handleTopicClick("7th Science", category, topic)}
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        <span>{topic}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicTree;