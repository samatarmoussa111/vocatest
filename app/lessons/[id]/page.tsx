import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getLessonById,
  getWordsByLessonId,
  getTranslationsByWordId,
} from "@/lib/mock-data";
import { ArrowLeft, BookOpen } from "lucide-react";

interface LessonDetailPageProps {
  params: {
    id: string;
  };
}

export default function LessonDetailPage({ params }: LessonDetailPageProps) {
  const lesson = getLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  const words = getWordsByLessonId(lesson.id);
  const createdDate = new Date(lesson.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/lessons">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Link>
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold sm:text-3xl">{lesson.title}</h1>
        </div>

        <p className="text-muted-foreground">
          Created on {createdDate} • {words.length}{" "}
          {words.length === 1 ? "word" : "words"}
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-6">Vocabulary Words</h2>

        {words.map((word, index) => {
          const translations = getTranslationsByWordId(word.id);
          const primaryTranslation = translations.find((t) => t.isPrimary);
          const alternativeTranslations = translations.filter(
            (t) => !t.isPrimary
          );

          return (
            <div
              key={word.id}
              className="pb-6 border-b border-border last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-primary mb-2">
                    {word.frenchWord}
                  </h3>
                  <div className="space-y-1">
                    {primaryTranslation && (
                      <p className="text-lg font-bold text-foreground">
                        {primaryTranslation.englishWord}
                      </p>
                    )}
                    {alternativeTranslations.length > 0 && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {alternativeTranslations
                          .map((t) => t.englishWord)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground sm:text-right">
                  #{index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {words.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No words found in this lesson.
          </p>
          <Button asChild>
            <Link href="/admin">Add Words</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
