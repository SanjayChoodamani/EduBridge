// context/QuizContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const QuizContext = createContext(undefined);

export const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchQuizData = async (topic) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/questions/', {
                topic,
                level: "easy"
            });
            console.log(response.data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch quiz data');
            }
            
            setQuizData(response.data);
            return response.data;
        } catch (err) {
            setError(err.message);
            console.error('Error fetching quiz data:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Providing initial value to context
    const value = {
        quizData,
        isLoading,
        error,
        fetchQuizData
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};