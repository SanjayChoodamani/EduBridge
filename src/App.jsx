import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { ChatProvider } from './context/ChatContext';
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import LearningPage from './pages/LearningPage';

const App = () => {
  return (
    <QuizProvider>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/learn/:topic" element={<LearningPage />} />
        </Routes>
      </ChatProvider>
    </QuizProvider>

  )
}

export default App
