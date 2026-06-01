import { ReactNode } from 'react';

import AdminShell from '@/components/admin/AdminShell';

/*---------------------------------------------------
 * Admin Layout
 * Provides the shared layout for all admin pages.
 *---------------------------------------------------*/

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
