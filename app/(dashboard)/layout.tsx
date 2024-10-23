import Link from 'next/link';
import { Home } from 'lucide-react';

const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    Icon: <Home className="size-5" />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-[270px_1fr] gap-4">
      <aside className="flex flex-col border-r bg-muted/30 p-5">
        <ul className="flex flex-col gap-1">
          {routes.map(({ title, path, Icon }, index) => (
            <li key={index} className="hover:bg-muted rounded-lg">
              <Link className="flex items-center gap-2 p-2" href={path}>
                {Icon} {title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <section className="overflow-hidden">{children}</section>
    </main>
  );
}

export default DashboardLayout;
