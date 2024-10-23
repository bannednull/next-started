import Link from 'next/link';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        className="absolute left-6 top-6 select-none rounded-full border p-2 px-4 pr-4 text-sm"
        href="/"
      >
        Home
      </Link>
      <div className="flex h-screen flex-col items-center justify-center">
        <section className="mx-auto my-5 w-full max-w-xs">{children}</section>
      </div>
    </>
  );
}

export default AuthLayout;
