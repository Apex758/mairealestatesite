import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';

interface SortableImageProps {
  id: string;
  index: number;
  url: string;
  onDelete: () => void;
}

export function SortableImage({ id, url, onDelete }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-white rounded-lg shadow-sm"
      {...attributes}
    >
      <img
        src={url}
        alt="Property"
        className="w-full h-48 object-cover rounded-lg"
      />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
        <button
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors mr-2"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <div
          {...listeners}
          className="p-2 bg-gray-800 text-white rounded-full cursor-move hover:bg-gray-700 transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}