import React, { useState } from 'react';
import * as Separator from '@radix-ui/react-separator';

interface ResizablePanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
}

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  left,
  right,
  defaultSize = 400,
  minSize = 300,
}) => {
  const [size, setSize] = useState(defaultSize);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    const startX = e.pageX;
    const startSize = size;

    const handleMouseMove = (e: MouseEvent) => {
      const newSize = Math.max(minSize, startSize + (e.pageX - startX));
      setSize(newSize);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex h-full">
      <div style={{ width: size }} className="flex-shrink-0">
        {left}
      </div>
      <Separator.Root
        className={`w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize transition-colors ${
          isResizing ? 'bg-blue-500' : ''
        }`}
        onMouseDown={handleMouseDown}
      />
      <div className="flex-grow">
        {right}
      </div>
    </div>
  );
};