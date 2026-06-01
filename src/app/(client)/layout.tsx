import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/SmoothScroll';
import { ReactNode } from 'react';

/*---------------------------------------------------*
 * Client Layout                                     *
 * Wraps all client pages with the shared layout.    *
 *---------------------------------------------------*/
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {/* <EmberBackground /> */}
      <SmoothScroll />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
