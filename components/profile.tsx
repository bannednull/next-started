import { auth } from '@/auth';
import Image from 'next/image';

async function Profile() {
  const session = await auth();
  if (!session) return null;

  return (
    <div className="mt-auto flex items-center gap-2 rounded-lg border p-2 text-sm">
      <Image
        className="rounded-full"
        src={session.user?.image || '/default.jpg'}
        width={30}
        height={30}
        alt="profile"
      />
      {session.user?.email}
    </div>
  );
}

export default Profile;
