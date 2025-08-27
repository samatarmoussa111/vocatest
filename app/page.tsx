import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Trophy, ArrowRight, Check } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Master French Vocabulary
          <span className="block text-primary">The Smart Way</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
          Join thousands of learners who are mastering French vocabulary through our interactive lessons, personalized
          quizzes, and proven learning methods.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="text-lg">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg bg-transparent">
            Sign In
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Why Choose Vocatest?</h2>
          <p className="text-lg text-muted-foreground">Everything you need to master French vocabulary effectively</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="mx-auto h-12 w-12 text-primary" />
              <CardTitle>Interactive Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Learn with carefully crafted lessons that adapt to your pace and learning style
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Trophy className="mx-auto h-12 w-12 text-primary" />
              <CardTitle>Smart Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Test your knowledge with intelligent quizzes that focus on your weak areas
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="mx-auto h-12 w-12 text-primary" />
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Monitor your learning journey with detailed analytics and achievements</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Learn French Vocabulary 3x Faster</h2>
            <div className="space-y-4">
              {[
                "Personalized learning paths based on your progress",
                "Multiple translation options for better understanding",
                "Spaced repetition system for long-term retention",
                "Mobile-first design for learning on the go",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 text-primary" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-8">
            <div className="text-center">
              <div className="mb-4 text-4xl font-bold text-primary">1000+</div>
              <p className="mb-2 font-semibold">French Words</p>
              <p className="text-sm text-muted-foreground">Carefully selected vocabulary across multiple categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="rounded-lg border bg-primary/5 p-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Join our community and start mastering French vocabulary today
          </p>
          <Button size="lg" className="text-lg">
            Create Your Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
