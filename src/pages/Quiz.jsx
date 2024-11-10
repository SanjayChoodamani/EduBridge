import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const { quizData } = useQuiz();
    const navigate = useNavigate();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Parse the JSON string from API response and structure the questions
    const parseQuestions = () => {
        if (!quizData || !quizData.questions) return null;
        try {
            // Parse the JSON string from the API response
            const parsedData = JSON.parse(quizData.questions);

            // Log the parsed data to see its structure
            console.log("Parsed quiz data:", parsedData);

            // Return the questions array
            return parsedData;
        } catch (error) {
            console.error("Error parsing quiz data:", error);
            return null;
        }
    };

    const questions = parseQuestions();

    React.useEffect(() => {
        if (!quizData) {
            navigate('/dashboard');
        }
    }, [quizData, navigate]);

    if (!quizData || !questions) {
        return <div className="min-h-screen bg-[#0A0B14] p-8 text-white">Loading...</div>;
    }

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question['Correct Answer']) {
                correctAnswers += 1;
            }
        });
        setScore(correctAnswers);
        setShowResults(true);
    };

    const handleSubmit = () => {
        if (Object.keys(selectedAnswers).length < questions.length) {
            alert('Please answer all questions before submitting!');
            return;
        }
        calculateScore();
    };

    if (showResults) {
        return (
            <div className="min-h-screen bg-[#0A0B14] p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#1A1B2E] rounded-3xl p-8 text-center">
                        <h1 className="text-white text-4xl font-bold mb-6">Quiz Results</h1>
                        <div className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                            {score} / {questions.length}
                        </div>
                        <p className="text-gray-300 text-xl mb-8">
                            {score === questions.length ? 'Perfect Score! 🎉' :
                                score >= questions.length * 0.7 ? 'Great Job! 👏' :
                                    score >= questions.length * 0.5 ? 'Good Effort! 💪' :
                                        'Keep Practicing! 📚'}
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-[#6C5DD3] hover:bg-[#5D4EC4] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                        >
                            Try Another Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0B14] p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#1A1B2E] rounded-3xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-white text-3xl font-bold">Quiz</h1>
                        <div className="text-gray-400">
                            {Object.keys(selectedAnswers).length}/{questions.length} answered
                        </div>
                    </div>

                    <div className="space-y-8">
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="bg-[#2A2B3E] rounded-xl p-6">
                                <h3 className="text-white text-xl mb-6">
                                    <span className="text-[#6C5DD3] font-bold mr-2">
                                        {questionIndex + 1}.
                                    </span>
                                    {question.Question}
                                </h3>
                                <div className="grid gap-3">
                                    {['A', 'B', 'C', 'D'].map((option) => (
                                        <button
                                            key={option}
                                            className={`w-full text-left p-4 rounded-lg transition-colors ${selectedAnswers[questionIndex] === option
                                                    ? 'bg-[#6C5DD3] text-white'
                                                    : 'bg-[#1A1B2E] text-gray-300 hover:bg-[#3A3B4E]'
                                                }`}
                                            onClick={() => handleAnswerSelect(questionIndex, option)}
                                        >
                                            <span className="inline-block w-8 font-semibold">
                                                {option})
                                            </span>
                                            {question[option]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#6C5DD3] hover:bg-[#5D4EC4] text-white px-12 py-4 rounded-xl font-semibold text-lg transition-colors"
                        >
                            Submit Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;