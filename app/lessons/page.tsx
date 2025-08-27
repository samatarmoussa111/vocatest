import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockLessons, getWordsByLessonId } from "@/lib/mock-data"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"

export default function LessonsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">Your French Lessons</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Continue your French vocabulary journey with these interactive lessons
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockLessons.map((lesson) => {
          const wordCount = getWordsByLessonId(lesson.id).length
          const createdDate = new Date(lesson.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })

          return (
            <Card key={lesson.id} className="group transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  {createdDate}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    {wordCount} {wordCount === 1 ? "word" : "words"} to learn
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/lessons/${lesson.id}`}>
                      View Lesson
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="rounded-lg border bg-muted/50 p-6">
          <h2 className="mb-2 text-xl font-semibold">Ready to test your knowledge?</h2>
          <p className="mb-4 text-muted-foreground">Take a quiz to see how well you know your French vocabulary</p>
          <Button asChild size="lg">
            <Link href="/test">Start Quiz</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
