'use client';

import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { deleteSkill } from '@/actions/skillsAction';
import handleAlert from '@/libs/handleAlert';
import { SkillFormData } from '@/libs/types';

import Button from '../ui/button';

const AdminSkillsCard = ({ data }: { data: SkillFormData[] }) => {
  if (data.length === 0) {
    return 'No skills found!';
  }

  return data.map((item, index) => (
    <div
      key={index}
      className="flex justify-between gap-5 border-t border-t-border py-3 hover:bg-surface-hover"
    >
      <p className="line-clamp-1 text-text">{item.title}</p>

      <div className="flex gap-2">
        <Link href={`/admin/edit-skill/${item.slug}`}>
          <Button variant="secondary" size="sm">
            <Eye size={14} className="text-success" />
            view
          </Button>
        </Link>

        <Link href={`/admin/edit-skill/${item.slug}`}>
          <Button variant="secondary" size="sm">
            <Pencil size={10} className="text-primary" />
            Edit
          </Button>
        </Link>

        <Button
          onClick={async () => {
            const res = await deleteSkill(item.slug);
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

export default AdminSkillsCard;
