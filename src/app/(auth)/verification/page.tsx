import { cookies } from 'next/headers';
import Image from 'next/image';

import FromVerification from '@/components/auth/From-Verification';

const Page = async () => {
  const cookieStore = await cookies();

  const verifyEmail = cookieStore.get('VERIFY_EMAIL')?.value ?? null;

  return (
    <section>
      <div className="app-container flex min-h-screen max-w-3xl items-center justify-center">
        <div className="w-full flex-col-reverse rounded-xl md:flex md:flex-row md:border md:border-border">
          {/* Left */}
          <div className="mt-10 flex w-full flex-col items-start justify-center gap-5 md:mt-0 md:w-1/2 md:items-center md:p-10 stagger">
            <div className="text-start">
              <h2>Check your email</h2>
              <p>We sent a 6-digit code to your email</p>
            </div>

            <FromVerification verifyEmail={verifyEmail} />
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center justify-center bg-surface p-5 md:w-1/2 relative">
            <Image src="/login_.webp" alt="login" width={500} height={600} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
