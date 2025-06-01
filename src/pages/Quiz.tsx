import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BookOpen, Code, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const API_BASE_URL = 'http://localhost:8000/api';

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<'javascript' | 'php' | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const javascriptQuestions: Question[] = [
    {
      id: 1,
      question: "Dans quel élément on met le code javascript ?",
      options: ["<script>", "<js>", "<body>", "<link>"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Quel attribut utiliser pour faire référence à un script javascript externe ?",
      options: ["src", "rel", "type", "href"],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "Comment afficher \"hello\" sur un message alert ?",
      options: ["msg(\"hello\")", "alertbox(\"hello\")", "documentwrite(\"hello\")", "alert(\"hello\")"],
      correctAnswer: 3
    }
  ];

  const phpQuestions: Question[] = [
    {
      id: 1,
      question: "Que signifie PHP ?",
      options: ["Page Helper Process", "Programming Home Pages", "PHP: Hypertext Preprocessor"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "Quelle fonction retourne la longueur d'une chaine de texte ?",
      options: ["strlen", "strlength", "length", "substr"],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "Sachant que $num = 6. Quelle est la valeur de : $num += 2 ?",
      options: ["3", "8", "10", "12"],
      correctAnswer: 1
    }
  ];

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = async () => {
    const questions = selectedQuiz === 'javascript' ? javascriptQuestions : phpQuestions;
    let correctCount = 0;

    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / questions.length) * 20;
    
    try {
      const token = localStorage.getItem('auth_token'); // Get token from localStorage
      const response = await axios.post(`${API_BASE_URL}/quiz-results`, {
          score: score,
          quiz_type: selectedQuiz // Ajout du type de quiz
      }, {
          headers: {
              'Authorization': `Bearer ${token}` // Add Authorization header
          }
      });

        if (response.data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Résultat enregistré!',
                text: `Votre note: ${score.toFixed(2)}/20 (${correctCount}/${questions.length} bonnes réponses)`,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Erreur d'enregistrement",
                description: response.data.message || "Une erreur est survenue côté serveur.",
            });
        }

    } catch (error: unknown) {
        console.error("Erreur lors de l'envoi du résultat du quiz:", error);
        let errorMessage = "Une erreur est survenue lors de l'envoi du résultat du quiz.";
        
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        toast({
            variant: "destructive",
            title: "Erreur API",
            description: errorMessage,
        });
    } finally {
        setShowResults(true);
    }
};

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setAnswers({});
    setShowResults(false);
  };

  if (!selectedQuiz) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            Quiz
          </h1>
          <p className="text-muted-foreground">
            Si on clique sur Quiz, on aura :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="cursor-pointer card-hover bg-gradient-to-br from-blue-400 to-blue-600 text-white"
            onClick={() => setSelectedQuiz('javascript')}
          >
            <CardContent className="p-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                <div className="relative bg-blue-800/50 rounded-lg p-6 mb-4">
                  <div className="text-yellow-300 text-4xl font-bold mb-2">WEB</div>
                  <div className="text-yellow-400 text-3xl font-bold">DEVELOPMENT</div>
                  <Code className="absolute top-2 right-2 h-8 w-8 text-yellow-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Quizz : N°1</h3>
              <p className="text-blue-100">Test Javascript</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer card-hover bg-gradient-to-br from-purple-400 to-purple-600 text-white"
            onClick={() => setSelectedQuiz('php')}
          >
            <CardContent className="p-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                <div className="relative bg-purple-800/50 rounded-lg p-6 mb-4">
                  <div className="text-cyan-300 text-4xl font-bold mb-2">DATA</div>
                  <Database className="absolute top-2 right-2 h-8 w-8 text-cyan-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Quizz : N°2</h3>
              <p className="text-purple-100">Test PHP</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Si on clique sur Quiz1, on aura par exemple :
          </p>
        </div>
      </div>
    );
  }

  const questions = selectedQuiz === 'javascript' ? javascriptQuestions : phpQuestions;
  const quizTitle = selectedQuiz === 'javascript' ? 'Quiz 1 Javascript' : 'Quiz 2 PHP';
  const quizSubtitle = selectedQuiz === 'javascript' ? 'Tester vos Connaissances en javascript' : 'Tester vos Connaissances en PHP';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">{quizTitle}</h1>
        <p className="text-cyan-600 font-medium underline">{quizSubtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="border-2 border-blue-300">
          <CardContent className="p-8 space-y-8">
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-800">
                  {index + 1}. {question.question}
                </h3>
                
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-${optionIndex}`} />
                      <Label htmlFor={`q${question.id}-${optionIndex}`} className="cursor-pointer">
                        {String.fromCharCode(97 + optionIndex)}. {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <div className="flex gap-4 justify-center pt-6">
              <Button 
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < questions.length}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Submit result
              </Button>
              
              <Button 
                onClick={resetQuiz}
                variant="outline"
                className="px-8 py-3"
              >
                Retour aux quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showResults && (
        <Card className="max-w-3xl mx-auto bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Résultats du Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="font-medium">{index + 1}. {question.question}</p>
                    <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      Votre réponse: {question.options[userAnswer]} 
                      {!isCorrect && ` (Correct: ${question.options[question.correctAnswer]})`}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-blue-100 rounded-lg text-center">
              <p className="text-blue-800">
                Si on clique sur "submit result", une fenêtre d'alerte affiche la note et la note sera envoyée vers la base de données.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Quiz;
