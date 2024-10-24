import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import Link from 'next/link';

const routes = [
  {
    title: 'Home',
    path: '/',
  },
];

export default async function Home() {
  const session = await auth();

  return (
    <>
      <header>
        <nav className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 py-4 text-muted-foreground">
          <p className="text-xl font-bold text-foreground">Brand</p>
          <ul className="mx-auto flex items-center gap-1">
            {routes.map(({ title, path }, index) => (
              <li key={index} className="hover:text-foreground">
                <Link href={path}>{title}</Link>
              </li>
            ))}
          </ul>
          {!session ? (
            <>
              <Link href="/signin" className="hover:text-foreground">
                Sign In
              </Link>
              <Link
                className="rounded-lg bg-blue-500 p-2 px-4 text-sm text-white hover:bg-blue-700 dark:text-foreground"
                href="/signup"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
          )}
        </nav>
      </header>

      <main className="mx-auto max-w-screen-lg">
        <div className="pb-5 pt-20">
          <h1 className="mx-auto max-w-3xl text-center text-7xl font-extrabold">
            Get Your{' '}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              SaaS
            </span>{' '}
            Up and Running in{' '}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              Record
            </span>{' '}
            Time
          </h1>
        </div>

        <div className="space-x-4 py-5 text-center">
          <Button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white" size="lg">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            <Github /> Start on Github (~2)
          </Button>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4">
          <div className="py-5">
            <p className="text-sm text-muted-foreground">
              <strong className="mb-3 block text-xl text-foreground">Save time</strong> Setup list
              in minutes for quick launches.
            </p>
          </div>
          <div className="py-5">
            <p className="text-sm text-muted-foreground">
              <strong className="mb-3 block text-xl text-foreground">Optimization</strong> Security,
              performance and SEO optimized from day one.
            </p>
          </div>
          <div className="py-5">
            <p className="text-sm text-muted-foreground">
              <strong className="mb-3 block text-xl text-foreground">Modern technology</strong>
              Harness the power of Next.js, Zod, and more.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
