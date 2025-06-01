import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaLinkedin, FaYoutube, FaProductHunt } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 md:px-6">
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

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://www.youtube.com/@ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaYoutube className="h-5 w-5" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            href="https://www.producthunt.com/@ysskrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaProductHunt className="h-5 w-5" />
            <span className="sr-only">Product Hunt</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
