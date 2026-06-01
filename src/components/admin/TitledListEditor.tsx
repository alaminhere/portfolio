'use client';

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

import Button from '../ui/button';
import Input from '../ui/input';
import InputCard from '../ui/input-card';

interface List {
  title: string;
  description: string;
}

interface Props {
  className?: string;
  lable?: string;
  path: string;
  list: List[];
  TitlePlaceholder: string;
  DesPlaceholder: string;
  addItem?: <T>(path: string, value: T) => void;
  editItem?: <T>(path: string, index: number, value: T) => void;
  deletItem: (path: string, index: number) => void;
}

const TitledListEditor = ({
  className,
  lable,
  path,
  list,
  TitlePlaceholder,
  DesPlaceholder,
  addItem,
  editItem,
  deletItem,
}: Props) => {
  const [input, setInput] = useState({
    title: '',
    description: '',
  });

  const [editValue, setEditValue] = useState({
    title: '',
    description: '',
  });

  const [editIndex, setEditIndex] = useState<null | number>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addItem?.(path, input);
    setInput({
      title: '',
      description: '',
    });
  };

  const startEdit = <T extends { title: string; description: string }>(
    index: number,
    item: T,
  ) => {
    setEditIndex(index);
    setEditValue(item);
  };

  const savetEdit = <T extends { title: string; description: string }>(
    index: number,
    item: T,
  ) => {
    editItem?.(path, index, item);
    setEditIndex(null);
  };

  const cancleEdit = () => {
    setEditIndex(null);
  };

  return (
    <InputCard lable={lable} className={`space-y-3 ${className}`}>
      <Input
        value={input.title}
        onChange={e =>
          setInput(prev => ({
            ...prev,
            title: e.target.value,
          }))
        }
        placeholder={TitlePlaceholder}
      />

      <div className="mb-4 flex items-center gap-3">
        <Input
          value={input.description}
          onChange={e =>
            setInput(prev => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder={DesPlaceholder}
        />

        <Button onClick={handleSubmit} variant="secondary" className="flex-1">
          +Add
        </Button>
      </div>

      <div className="space-y-3">
        {list?.map((item, index) =>
          editIndex === index ? (
            <div
              key={index}
              className="space-y-4 border-b border-b-border py-2"
            >
              <div className="space-y-2">
                <Input
                  value={editValue.title}
                  onChange={e =>
                    setEditValue(prev => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />

                <Input
                  value={editValue.description}
                  onChange={e =>
                    setEditValue(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" onClick={cancleEdit} variant="secondary">
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={() => savetEdit(index, editValue)}
                  variant="primary"
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="flex items-center justify-between gap-3 border-b border-b-border py-2"
            >
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={() => startEdit(index, item)}
                  variant="secondary"
                  className="flex-1 border-0! p-0!"
                >
                  <Edit size={15} />
                </Button>

                <Button
                  type="button"
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

export default TitledListEditor;
