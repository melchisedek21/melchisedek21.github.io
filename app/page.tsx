"use client"

import { useState } from "react"

export default function TribuVibes() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://formspree.io/f/xlgawgnd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setEmail("")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-5 py-10 text-center">
        {/* Hero */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
          Aider les jeunes adultes à se faire des{" "}
          <span className="text-primary">amis compatibles</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Découverte + cercles + interactions sociales. <br />
          Une app d&apos;<strong>amitié moderne</strong>, pas de rencontre.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-16">
          <FeatureCard
            title="Découvrir"
            description="Connecte via des activités et passions communes, pas juste des photos."
          />
          <FeatureCard
            title="Explorer"
            description="Vois l'univers des gens : leurs vibes, leurs projets, leurs kiffs du moment."
          />
          <FeatureCard
            title="Parler"
            description="Chat de groupe ou 1-à-1 pour organiser des sorties facilement."
          />
          <FeatureCard
            title="Rejoindre"
            description="Intègre des cercles locaux selon tes intérêts : sport, gaming, arts..."
          />
        </div>

        {/* Waitlist */}
        <div className="bg-card border border-border rounded-xl p-8 max-w-lg mx-auto my-16 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Sois le premier au courant
          </h2>
          <p className="text-muted-foreground mb-6">
            L&apos;app arrive bientôt. Inscris-toi pour un accès anticipé et aide-nous à
            créer les premiers cercles à Gatineau.
          </p>

          {isSubmitted ? (
            <div className="bg-primary/10 text-primary rounded-lg p-4 font-medium">
              Merci ! Tu seras notifié dès le lancement.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ton email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "..." : "M'inscrire"}
              </button>
            </form>
          )}

          <small className="block mt-4 text-muted-foreground text-sm">
            Pas de spam. Promis.
          </small>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <p className="font-semibold text-foreground mb-4">Bientôt disponible</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              App Store
            </button>
            <button className="bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Google Play
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-muted-foreground text-sm">
          <p>
            Fait par Melchisedek et Emmanuella pour créer plus de connexions réelles
            partout au Canada et dans d&apos;autres pays d&apos;ailleurs. © 2026
          </p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
