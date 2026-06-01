'use client';

import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

import { createSkill, updateSkill } from '@/actions/skillsAction';
import handleAlert from '@/libs/handleAlert';
import { SkillFormData } from '@/libs/types';
import { useFormHelpersSkills } from '@/libs/useFormHelpersSkills';

import Button from '../ui/button';
import Input from '../ui/input';
import InputCard from '../ui/input-card';

import SimpleListEditor from './SimpleListEditor';

type InitialSkill = SkillFormData | null;

const FormAddSkill = ({ initialSkill }: { initialSkill: InitialSkill }) => {
  const isEdit = initialSkill !== null;
  const actionRole = isEdit ? updateSkill : createSkill;

  const [state, formAction, isPending] = useActionState(actionRole, null);

  const { form, setForm, addItem, editItem, deletItem } =
    useFormHelpersSkills(initialSkill);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>();

  const onSubmit = () => {
    const data = {
      ...form,
      slug:
        form.slug ||
        slugify(form.title, {
          lower: true,
          strict: true,
        }),
    };

    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      if (!isEdit) {
        reset();

        setForm({
          title: '',
          slug: '',
          techStack: [],
        });
      }
    }

    handleAlert(state.status, state.message.toString());
  }, [isEdit, reset, setForm, state]);

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-7xl space-y-4"
    >
      <InputCard lable="Basic skill info" className="space-y-4">
        <Input
          value={form.title}
          {...register('title', {
            required: 'Title is required',
          })}
          error={errors.title}
          onChange={e => addItem('title', e.target.value)}
          label="Title"
          placeholder="Title"
        />

        <SimpleListEditor
          className="m-0! border-none! p-0!"
          placeholder="Tech stack"
          addItem={addItem}
          editItem={editItem}
          deletItem={deletItem}
          path="techStack"
          list={form.techStack}
        />
      </InputCard>

      <Button disabled={isPending} loading={isPending} type="submit">
        {isEdit ? 'Update Skill' : 'Save skill'}
      </Button>
    </form>
  );
};

export default FormAddSkill;
