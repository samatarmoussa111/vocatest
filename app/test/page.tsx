"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  mockLessons,
  getWordsByLessonId,
  getTranslationsByWordId,
  getLessonById,
} from "@/lib/mock-data";
import {
  TestTube,
  Play,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
} from "lucide-react";

interface QuizState {
  lessonId: string;
  words: Array<{ id: string; frenchWord: string }>;
  currentWordIndex: number;
  userAnswer: string;
  score: number;
  feedback: "correct" | "incorrect" | null;
  isComplete: boolean;
  showingFeedback: boolean;
}

export default function TestPage() {
  const searchParams = useSearchParams();
  const [activeQuiz, setActiveQuiz] = useState<QuizState | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Handle direct lesson testing from URL params
  useEffect(() => {
    const lessonParam = searchParams.get("lessons");
    if (lessonParam) {
      startQuiz(lessonParam);
    }
  }, [searchParams]);

  const startQuiz = (lessonId: string) => {
    const words = getWordsByLessonId(lessonId);
    if (words.length === 0) return;

    setActiveQuiz({
      lessonId,
      words: words.map((w) => ({ id: w.id, frenchWord: w.frenchWord })),
      currentWordIndex: 0,
      userAnswer: "",
      score: 0,
      feedback: null,
      isComplete: false,
      showingFeedback: false,
    });
    setIsQuizModalOpen(true);
  };

  const submitAnswer = () => {
    if (!activeQuiz || activeQuiz.showingFeedback) return;

    const currentWord = activeQuiz.words[activeQuiz.currentWordIndex];
    const translations = getTranslationsByWordId(currentWord.id);
    const userAnswerLower = activeQuiz.userAnswer.toLowerCase().trim();

    const isCorrect = translations.some(
      (t) => t.englishWord.toLowerCase() === userAnswerLower
    );

    setActiveQuiz((prev) =>
      prev
        ? {
            ...prev,
            feedback: isCorrect ? "correct" : "incorrect",
            score: isCorrect ? prev.score + 1 : prev.score,
            showingFeedback: true,
          }
        : null
    );
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;

    const nextIndex = activeQuiz.currentWordIndex + 1;
    const isLastQuestion = nextIndex >= activeQuiz.words.length;

    setActiveQuiz((prev) =>
      prev
        ? {
            ...prev,
            currentWordIndex: nextIndex,
            userAnswer: "",
            feedback: null,
            showingFeedback: false,
            isComplete: isLastQuestion,
          }
        : null
    );
  };

  const resetQuiz = () => {
    if (!activeQuiz) return;

    setActiveQuiz((prev) =>
      prev
        ? {
            ...prev,
            currentWordIndex: 0,
            userAnswer: "",
            score: 0,
            feedback: null,
            isComplete: false,
            showingFeedback: false,
          }
        : null
    );
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setIsQuizModalOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (activeQuiz?.showingFeedback) {
        nextQuestion();
      } else {
        submitAnswer();
      }
    }
  };

  const currentWord = activeQuiz?.words[activeQuiz.currentWordIndex];
  const currentTranslations = currentWord
    ? getTranslationsByWordId(currentWord.id)
    : [];
  const progress = activeQuiz
    ? ((activeQuiz.currentWordIndex + (activeQuiz.showingFeedback ? 1 : 0)) /
        activeQuiz.words.length) *
      100
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Test Your Knowledge
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose a lesson to start your vocabulary quiz
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockLessons.map((lesson) => {
          const wordCount = getWordsByLessonId(lesson.id).length;

          return (
            <Card
              key={lesson.id}
              className="group transition-all hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <TestTube className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                </div>
                <CardDescription>
                  {wordCount} {wordCount === 1 ? "word" : "words"} to test
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  onClick={() => startQuiz(lesson.id)}
                  className="w-full"
                  disabled={wordCount === 0}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isQuizModalOpen} onOpenChange={setIsQuizModalOpen}>
        <DialogContent className="sm:max-w-md">
          {activeQuiz && !activeQuiz.isComplete && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {getLessonById(activeQuiz.lessonId)?.title} Quiz
                </DialogTitle>
                <DialogDescription>
                  Question {activeQuiz.currentWordIndex + 1} of{" "}
                  {activeQuiz.words.length}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <Progress value={progress} className="w-full" />

                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {currentWord?.frenchWord}
                  </div>

                  {!activeQuiz.showingFeedback ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Type the English translation"
                        value={activeQuiz.userAnswer}
                        onChange={(e) =>
                          setActiveQuiz((prev) =>
                            prev
                              ? { ...prev, userAnswer: e.target.value }
                              : null
                          )
                        }
                        onKeyPress={handleKeyPress}
                        autoFocus
                      />
                      <Button
                        onClick={submitAnswer}
                        className="w-full"
                        disabled={!activeQuiz.userAnswer.trim()}
                      >
                        Submit Answer
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div
                        className={`flex items-center justify-center gap-2 text-lg font-medium ${
                          activeQuiz.feedback === "correct"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {activeQuiz.feedback === "correct" ? (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            Correct!
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5" />
                            Incorrect
                          </>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>
                          Your answer:{" "}
                          <span className="font-medium">
                            {activeQuiz.userAnswer}
                          </span>
                        </p>
                        <p>
                          Correct answers:{" "}
                          {currentTranslations
                            .map((t) => t.englishWord)
                            .join(", ")}
                        </p>
                      </div>

                      <Button onClick={nextQuestion} className="w-full">
                        {activeQuiz.currentWordIndex + 1 >=
                        activeQuiz.words.length
                          ? "Finish Quiz"
                          : "Next Question"}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Score: {activeQuiz.score} /{" "}
                  {activeQuiz.currentWordIndex +
                    (activeQuiz.showingFeedback ? 1 : 0)}
                </div>
              </div>
            </>
          )}

          {activeQuiz?.isComplete && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Quiz Complete!
                </DialogTitle>
                <DialogDescription>
                  {getLessonById(activeQuiz.lessonId)?.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {activeQuiz.score} / {activeQuiz.words.length}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {Math.round(
                      (activeQuiz.score / activeQuiz.words.length) * 100
                    )}
                    % correct
                  </div>
                </div>

                <div className="space-y-2">
                  {activeQuiz.score === activeQuiz.words.length && (
                    <Badge variant="default" className="text-sm">
                      Perfect Score!
                    </Badge>
                  )}
                  {activeQuiz.score >= activeQuiz.words.length * 0.8 &&
                    activeQuiz.score < activeQuiz.words.length && (
                      <Badge variant="secondary" className="text-sm">
                        Great Job!
                      </Badge>
                    )}
                  {activeQuiz.score >= activeQuiz.words.length * 0.6 &&
                    activeQuiz.score < activeQuiz.words.length * 0.8 && (
                      <Badge variant="outline" className="text-sm">
                        Good Effort!
                      </Badge>
                    )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={resetQuiz}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button onClick={closeQuiz} className="flex-1">
                    Done
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
