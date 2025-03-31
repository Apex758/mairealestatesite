import React from 'react';
import { PropertyPage } from '../pages/PropertyPage';

interface PropertyPreviewProps {
  property: any;
  onClose: () => void;
}

export function PropertyPreview({ property, onClose }: PropertyPreviewProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="sticky top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-medium">Preview Mode</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Close Preview
        </button>
      </div>
      <PropertyPage previewData={property} />
    </div>
  );
}