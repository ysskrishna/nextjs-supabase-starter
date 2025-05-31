import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Image
            src="https://github.com/ysskrishna.png"
            alt="Y. Siva Sai Krishna"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">Y. Siva Sai Krishna</p>
            <p className="text-sm text-muted-foreground">@ysskrishna</p>
          </div>
        </div>

        <div className="text-sm text-center md:text-right">
          <Link
            href="https://github.com/ysskrishna/nextjs-supabase-starter"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/ysskrishna/nextjs-supabase-starter
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://www.youtube.com/@ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Youtube className="h-5 w-5" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            href="https://www.producthunt.com/@ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M13.604 8.4h-3.77V12h3.77c1.004 0 1.81-.806 1.81-1.8s-.806-1.8-1.81-1.8zm.396 6.5h-4.166V19h-2.54V5h6.706c2.407 0 4.354 1.947 4.354 4.35 0 1.93-1.27 3.55-3.02 4.12l3.2 5.53h-2.938l-2.844-5.025c.432-.12.748-.252.748-.252" />
            </svg>
            <span className="sr-only">Product Hunt</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
