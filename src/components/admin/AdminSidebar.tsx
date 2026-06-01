import clsx from 'clsx';

import Abatar from './Abatar';
import AdminMenu from './AdminMenu';

const AdminSidebar = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <aside
      className={clsx(
        'p-5 bg-surface fixed md:static md:flex flex-col top-0 left-0',
        'w-full max-w-70 md:max-w-75 min-h-full transition-all duration-200 z-50',
        isOpen ? '' : 'transform -translate-x-full md:translate-x-0',
      )}
    >
      <div className="space-y-0 border-b border-b-border pb-4">
        <Abatar />
      </div>

      <AdminMenu onToggle={onToggle} />
    </aside>
  );
};

export default AdminSidebar;
