'use client';

import { useActionState, useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { Pencil } from 'lucide-react';

import { updateProfile } from '@/actions/profileActions';
import handleAlert from '@/libs/handleAlert';

import Button from '../ui/button';
import Input from '../ui/input';
import Textarea from '../ui/textrea';

const FormUpdateProfile = ({ userData }: { userData: User[] }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [state, formAction, isPending] = useActionState(updateProfile, null);

  useEffect(() => {
    if (!state) return;

    handleAlert(state.status, state.message);

    if (state.status) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsEditing(false);
    }
  }, [state]);

  const user = userData[0];

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex justify-end">
        {!isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={15} />
            Edit profile
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          type="text"
          name="fullName"
          label="Full name"
          placeholder="MD. Al-Amin"
          defaultValue={user?.name ?? ''}
          disabled={!isEditing}
        />
      </div>

      <Textarea
        name="bio"
        label="Bio"
        placeholder="Full-stack developer building real-time apps."
        defaultValue={user?.bio ?? ''}
        disabled={!isEditing}
      />

      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          type="text"
          name="github"
          label="GitHub"
          placeholder="https://github.com/al-amin"
          defaultValue={user?.github ?? ''}
          disabled={!isEditing}
        />

        <Input
          type="text"
          name="linkedin"
          label="LinkedIn"
          placeholder="https://linkedin.com/in/al-amin"
          defaultValue={user?.linkedin ?? ''}
          disabled={!isEditing}
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          type="text"
          name="facebook"
          label="Facebook"
          placeholder="https://facebook.com/al-amin"
          defaultValue={user?.facebook ?? ''}
          disabled={!isEditing}
        />

        <Input
          type="tel"
          name="whatsapp"
          label="Whatsapp"
          placeholder="+880 1XXX-XXXXXX"
          defaultValue={user?.whatsapp ?? ''}
          disabled={!isEditing}
        />
      </div>

      <Input
        type="text"
        name="resume"
        label="Resume"
        placeholder="https://drive.google.com/.."
        defaultValue={user?.resume ?? ''}
        disabled={!isEditing}
      />

      <Input
        type="text"
        name="location"
        label="Location"
        placeholder="Dhaka, Bangladesh"
        defaultValue={user?.location ?? ''}
        disabled={!isEditing}
      />

      {isEditing && (
        <div className="mt-8 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending} loading={isPending}>
            Save changes
          </Button>
        </div>
      )}
    </form>
  );
};

export default FormUpdateProfile;
