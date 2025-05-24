import { useState, useEffect } from 'react';

// Define vocabulary quiz question type
interface QuizQuestion {
  id: number;
  word: string;
  definition: string;
  options: string[];
  correctAnswer: string;
}

// Mock quiz data (this would ideally come from an API or database)
const mockQuizData: QuizQuestion[] = [
  {
    id: 1,
    word: 'Serene',
    definition: 'A state of being calm, peaceful, and untroubled',
    options: ['Angry', 'Peaceful', 'Excited', 'Confused'],
    correctAnswer: 'Peaceful'
  },
  {
    id: 2,
    word: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing',
    options: ['Silent', 'Articulate', 'Boring', 'Rude'],
    correctAnswer: 'Articulate'
  },
  {
    id: 3,
    word: 'Resilient',
    definition: 'Able to withstand or recover quickly from difficult conditions',
    options: ['Weak', 'Strong', 'Fragile', 'Delicate'],
    correctAnswer: 'Strong'
  },
  {
    id: 4,
    word: 'Perplexed',
    definition: 'Completely baffled; very puzzled',
    options: ['Confused', 'Happy', 'Clear', 'Certain'],
    correctAnswer: 'Confused'
  },
  {
    id: 5,
    word: 'Meticulous',
    definition: 'Showing great attention to detail; very careful and precise',
    options: ['Careless', 'Precise', 'Messy', 'Lazy'],
    correctAnswer: 'Precise'
  }
];

interface VocabularyQuizProps {
  onQuizComplete: () => void;
}

export const VocabularyQuiz: React.FC<VocabularyQuizProps> = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  
  // Select random questions when the component mounts
  useEffect(() => {
    // Shuffle and select 3 random questions
    const shuffled = [...mockQuizData].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 3));
  }, []);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Check if the answer is correct
    const correct = answer === currentQuestion?.correctAnswer;
    setIsCorrect(correct);
    
    // Move to the next question after a brief delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // Quiz completed
        onQuizComplete();
      }
    }, 1000);
  };
  
  if (quizQuestions.length === 0) {
    return <div className="p-4 text-center">Loading quiz...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Vocabulary Quiz
      </h2>
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">{currentQuestion.word}</h3>
          <p className="mb-4 text-gray-700">{currentQuestion.definition}</p>
        </div>
        <p className="mt-4 mb-2 font-medium">Choose the correct synonym:</p>
      </div>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => !selectedAnswer && handleAnswerSelection(option)}
            disabled={selectedAnswer !== null}
            className={`w-full p-3 rounded-lg text-left transition-colors ${selectedAnswer === option
              ? option === currentQuestion.correctAnswer
                ? 'bg-green-100 border-green-500 border-2'
                : 'bg-red-100 border-red-500 border-2'
              : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-200'
            } ${isCorrect !== null && option === currentQuestion.correctAnswer && 'bg-green-100 border-green-500 border-2'}`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {isCorrect !== null && (
        <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isCorrect ? 'Correct! 👍' : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
        </div>
      )}
    </div>
  );
};