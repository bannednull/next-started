import Link from 'next/link';

const routes = [
  {
    title: 'Home',
    path: '/',
  },
];

export default function Home() {
  return (
    <>
      <header>
        <nav className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 py-4 text-muted-foreground">
          <h1 className="text-xl font-bold text-foreground">Brand</h1>
          <ul className="mx-auto flex items-center gap-1">
            {routes.map(({ title, path }, index) => (
              <li key={index} className="hover:text-foreground">
                <Link href={path}>{title}</Link>
              </li>
            ))}
          </ul>
          <Link href="/signin" className="hover:text-foreground">
            Sign In
          </Link>
          <Link
            className="rounded-lg bg-blue-500 p-2 px-4 text-sm text-white hover:bg-blue-700 dark:text-foreground"
            href="/signup"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-screen-lg">
        <p>Wellcome</p>
      </main>
    </>
  );
}
