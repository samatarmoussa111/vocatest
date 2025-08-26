"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Check,
  Edit,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import {
  mockLessons,
  getWordsByLessonId,
  getTranslationsByWordId,
} from "@/lib/mock-data";
import Link from "next/link";

interface WordWithTranslations {
  frenchWord: string;
  translations: { english: string; isPrimary: boolean }[];
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("create");
  const [currentStep, setCurrentStep] = useState(1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [words, setWords] = useState<WordWithTranslations[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [currentTranslations, setCurrentTranslations] = useState([
    { english: "", isPrimary: true },
  ]);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  const nextStep = () => {
    if (currentStep === 1 && !lessonTitle.trim()) {
      toast("Please enter a lesson title");
      return;
    }
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const addTranslationField = () => {
    setCurrentTranslations([
      ...currentTranslations,
      { english: "", isPrimary: false },
    ]);
  };

  const removeTranslationField = (index: number) => {
    if (currentTranslations.length > 1) {
      const updated = currentTranslations.filter((_, i) => i !== index);
      // Ensure at least one primary translation exists
      if (!updated.some((t) => t.isPrimary)) {
        updated[0].isPrimary = true;
      }
      setCurrentTranslations(updated);
    }
  };

  const addWordToLesson = () => {
    if (!currentWord.trim()) {
      toast("Please enter a French word");
      return;
    }

    const validTranslations = currentTranslations.filter((t) =>
      t.english.trim()
    );
    if (validTranslations.length === 0) {
      toast("Please add at least one translation");
      return;
    }

    setWords([
      ...words,
      { frenchWord: currentWord, translations: validTranslations },
    ]);
    setCurrentWord("");
    setCurrentTranslations([{ english: "", isPrimary: true }]);

    toast(`Word "${currentWord}" added to lesson`);
  };

  const removeWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const submitLesson = () => {
    if (words.length === 0) {
      toast("Please add at least one word to the lesson");
      return;
    }

    console.log("Creating lesson:", { title: lessonTitle, words });
    toast(
      `Lesson "${lessonTitle}" ${
        editingLessonId ? "updated" : "created"
      } with ${words.length} words`
    );

    resetForm();
    setActiveTab("manage");
  };

  const resetForm = () => {
    setCurrentStep(1);
    setLessonTitle("");
    setWords([]);
    setCurrentWord("");
    setCurrentTranslations([{ english: "", isPrimary: true }]);
    setEditingLessonId(null);
  };

  const updateTranslation = (index: number, english: string) => {
    const updated = [...currentTranslations];
    updated[index].english = english;
    setCurrentTranslations(updated);
  };

  const setPrimaryTranslation = (index: number) => {
    const updated = currentTranslations.map((t, i) => ({
      ...t,
      isPrimary: i === index,
    }));
    setCurrentTranslations(updated);
  };

  const handleEditLesson = (lessonId: string) => {
    const lesson = mockLessons.find((l) => l.id === lessonId);
    if (lesson) {
      setEditingLessonId(lessonId);
      setLessonTitle(lesson.title);

      // Load existing words and translations
      const lessonWords = getWordsByLessonId(lessonId);
      const wordsWithTranslations = lessonWords.map((word) => {
        const translations = getTranslationsByWordId(word.id);
        return {
          frenchWord: word.frenchWord,
          translations: translations.map((t) => ({
            english: t.englishWord,
            isPrimary: t.isPrimary,
          })),
        };
      });

      setWords(wordsWithTranslations);
      setCurrentStep(1);
      setActiveTab("create");
    }
  };

  const handleDeleteLesson = (lessonId: string, lessonTitle: string) => {
    if (confirm(`Are you sure you want to delete "${lessonTitle}"?`)) {
      console.log("Delete lesson:", lessonId);
      toast(`Lesson "${lessonTitle}" deleted`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Create new lessons and manage existing vocabulary content
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">
            {editingLessonId ? "Edit Lesson" : "Create Lesson"}
          </TabsTrigger>
          <TabsTrigger value="manage">Manage Lessons</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          {editingLessonId && (
            <div className="mb-4">
              <Button variant="outline" onClick={resetForm}>
                Cancel Editing
              </Button>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <div
                className={`h-px w-16 ${
                  currentStep >= 2 ? "bg-primary" : "bg-muted"
                }`}
              />
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Lesson Title</span>
              <span>Add Words</span>
            </div>
          </div>

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Lesson Title</CardTitle>
                <CardDescription>
                  {editingLessonId
                    ? "Update the title for this lesson"
                    : "Enter the title for your new vocabulary lesson"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lesson-title">Lesson Title</Label>
                  <Input
                    id="lesson-title"
                    placeholder="e.g., Les émotions"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={nextStep}>
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Add Vocabulary Words</CardTitle>
                  <CardDescription>
                    Add French words and their English translations to &quot;
                    {lessonTitle}&quot;
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="french-word">French Word</Label>
                    <Input
                      id="french-word"
                      placeholder="e.g., fatigué"
                      value={currentWord}
                      onChange={(e) => setCurrentWord(e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>English Translations</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addTranslationField}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Translation
                      </Button>
                    </div>
                    {currentTranslations.map((translation, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder={
                              index === 0
                                ? "Primary translation"
                                : "Alternative translation"
                            }
                            value={translation.english}
                            onChange={(e) =>
                              updateTranslation(index, e.target.value)
                            }
                          />
                        </div>
                        <Button
                          type="button"
                          variant={
                            translation.isPrimary ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setPrimaryTranslation(index)}
                        >
                          {translation.isPrimary ? "Primary" : "Set Primary"}
                        </Button>
                        {currentTranslations.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTranslationField(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button onClick={addWordToLesson} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Word to Lesson
                  </Button>
                </CardContent>
              </Card>

              {words.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Words in Lesson ({words.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {words.map((word, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{word.frenchWord}</div>
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">
                                {
                                  word.translations.find((t) => t.isPrimary)
                                    ?.english
                                }
                              </span>
                              {word.translations.filter(
                                (t) => !t.isPrimary && t.english.trim()
                              ).length > 0 && (
                                <span>
                                  {" + "}
                                  {
                                    word.translations.filter(
                                      (t) => !t.isPrimary && t.english.trim()
                                    ).length
                                  }{" "}
                                  alternatives
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeWord(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
                <Button onClick={submitLesson} disabled={words.length === 0}>
                  <Check className="mr-2 h-4 w-4" />
                  {editingLessonId ? "Update Lesson" : "Create Lesson"}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <div className="space-y-4">
            {mockLessons.map((lesson) => {
              const words = getWordsByLessonId(lesson.id);
              return (
                <Card key={lesson.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {lesson.title}
                        </CardTitle>
                        <CardDescription>
                          Created:{" "}
                          {new Date(lesson.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {words.length} {words.length === 1 ? "word" : "words"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {words.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">
                          Sample Words:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {words.slice(0, 5).map((word) => {
                            const translations = getTranslationsByWordId(
                              word.id
                            );
                            const primaryTranslation = translations.find(
                              (t) => t.isPrimary
                            );
                            return (
                              <span
                                key={word.id}
                                className="inline-block rounded-md bg-muted px-2 py-1 text-xs"
                              >
                                {word.frenchWord} →{" "}
                                {primaryTranslation?.englishWord}
                              </span>
                            );
                          })}
                          {words.length > 5 && (
                            <span className="inline-block rounded-md bg-muted px-2 py-1 text-xs">
                              +{words.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/lesson/${lesson.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditLesson(lesson.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDeleteLesson(lesson.id, lesson.title)
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
