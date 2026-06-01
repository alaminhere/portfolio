import { useState } from 'react';
import { SkillFormData } from './types';

type InitialSkill = SkillFormData | null;

export const useFormHelpersSkills = (initialSkill: InitialSkill) => {
  const [form, setForm] = useState(
    initialSkill ?? {
      title: '',
      slug: '',
      techStack: [],
    },
  );

  const getField = <T,>(obj: T, path: string): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return path.split('.').reduce((sum: any, crr) => sum[crr], obj);
  };

  const setField = <T,>(obj: T, path: string, value: unknown): T => {
    const clone = structuredClone(obj);
    const keys = path.split('.');
    const lastKey = keys.pop()!;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keys.reduce((sum: any, crr) => sum[crr], clone)[lastKey] = value;
    return clone;
  };

  const addItem = <T,>(path: string, value: T) => {
    setForm(prev => {
      const current = getField(prev, path);
      const currenttValue = Array.isArray(current)
        ? [...current, value]
        : value;

      return setField(prev, path, currenttValue);
    });
  };

  const editItem = <T,>(path: string, index: number, value: T) => {
    setForm(prev => {
      const current = getField(prev, path);
      const currenttValue = Array.isArray(current)
        ? current.map((v, i) => (i === index ? value : v))
        : value;

      return setField(prev, path, currenttValue);
    });
  };

  const deletItem = (path: string, index: number) => {
    setForm(prev => {
      const current = getField(prev, path);
      const currenttValue =
        Array.isArray(current) && current.filter((_, i) => i !== index);

      return setField(prev, path, currenttValue);
    });
  };

  return {
    form,
    setForm,
    getField,
    setField,
    addItem,
    editItem,
    deletItem,
  };
};
