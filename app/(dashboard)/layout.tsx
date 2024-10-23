import Link from 'next/link';
import { Home, User } from 'lucide-react';
import Profile from '@/components/profile';

const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    Icon: <Home className="size-5" />,
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    Icon: <User className="size-5" />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-[270px_1fr] gap-4">
      <aside className="flex flex-col border-r bg-muted/30 p-5">
        <ul className="flex flex-col gap-1">
          {routes.map(({ title, path, Icon }, index) => (
            <li key={index} className="rounded-lg hover:bg-muted">
              <Link className="flex items-center gap-2 p-2" href={path}>
                {Icon} {title}
              </Link>
            </li>
          ))}
        </ul>

        <Profile />
      </aside>

      <section className="overflow-hidden">{children}</section>
    </main>
  );
}

export default DashboardLayout;
