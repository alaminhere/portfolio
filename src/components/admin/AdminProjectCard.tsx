'use client';

import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { deleteProject } from '@/actions/projectActions';
import handleAlert from '@/libs/handleAlert';

import Button from '../ui/button';

interface Props {
  slug: string;
  title: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
}

const AdminProjectCard = ({ data }: { data: Props[] }) => {
  return data.map(item => (
    <div
      key={item.slug}
      className="hover:bg-surface-hover flex justify-between gap-5 border-t border-t-border py-3"
    >
      <p className="line-clamp-1 text-text">{item.title}</p>

      <div className="flex gap-2">
        <Link href={`/projects/${item.slug}`}>
          <Button variant="secondary" size="sm">
            <Eye size={14} className="text-success" />
            view
          </Button>
        </Link>

        <Link href={`/admin/edit-case/${item.slug}`}>
          <Button variant="secondary" size="sm">
            <Pencil size={10} className="text-primary" />
            Edit
          </Button>
        </Link>

        <Button
          onClick={async () => {
            const res = await deleteProject(item.slug, item.image.public_id);
            handleAlert(res.status, res.message);
          }}
          variant="secondary"
          size="sm"
        >
          <Trash2 size={12} className="text-danger" />
          Delete
        </Button>
      </div>
    </div>
  ));
};

export default AdminProjectCard;
