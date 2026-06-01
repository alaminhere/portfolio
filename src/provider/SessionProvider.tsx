'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

const SessionProviderWrap = ({ children }: { children: ReactNode }) => {
  return <SessionProvider> {children} </SessionProvider>;
};

export default SessionProviderWrap;
