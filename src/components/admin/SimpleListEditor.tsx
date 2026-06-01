'use client';

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

import { SimpleListEditorProps } from '@/libs/types';

import Button from '../ui/button';
import Input from '../ui/input';
import InputCard from '../ui/input-card';

const SimpleListEditor = ({
  className,
  lable,
  path,
  list,
  inputLable,
  placeholder,
  addItem,
  editItem,
  deletItem,
}: SimpleListEditorProps) => {
  const [input, setInput] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editIndex, setEditIndex] = useState<null | number>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addItem?.(path, input);
    setInput('');
  };

  const startEdit = (index: number, item: string) => {
    setEditIndex(index);
    setEditValue(item);
  };

  const savetEdit = (path: string, index: number, value: string) => {
    editItem?.(path, index, value);
    setEditIndex(null);
  };

  const cancleEdit = () => {
    setEditIndex(null);
  };

  return (
    <InputCard lable={lable || ''} className={className}>
      <div className="mb-4 flex items-center gap-3">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          label={inputLable}
        />

        <Button onClick={handleSubmit} variant="secondary" className="flex-1">
          +Add
        </Button>
      </div>

      <div>
        {list?.map((item, index) =>
          editIndex === index ? (
            <div
              key={index}
              className="flex items-center justify-between gap-3 border-b border-b-border py-2"
            >
              <Input
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
              />

              <Button
                onClick={() => savetEdit(path, index, editValue)}
                variant="secondary"
                className="flex-1"
              >
                🗸
              </Button>

              <Button
                onClick={cancleEdit}
                variant="secondary"
                className="flex-1"
              >
                🗙
              </Button>
            </div>
          ) : (
            <div
              key={index}
              className="flex items-center justify-between gap-3 border-b border-b-border py-2"
            >
              <p>{item}</p>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => startEdit(index, item)}
                  variant="secondary"
                  className="flex-1 border-0! p-0!"
                >
                  <Edit size={15} />
                </Button>

                <Button
                  onClick={() => deletItem(path, index)}
                  variant="secondary"
                  className="flex-1 border-0! p-0!"
                >
                  <Trash2 size={15} className="text-danger" />
                </Button>
              </div>
            </div>
          ),
        )}
      </div>
    </InputCard>
  );
};

export default SimpleListEditor;
