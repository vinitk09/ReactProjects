import React from 'react';

interface ViewerProps {
  imageUrl: string;
  zoomLevel: number;
}

export const Viewer = React.forwardRef<HTMLDivElement, ViewerProps>(({ imageUrl, zoomLevel }, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center justify-center h-full overflow-hidden"
      style={{
        backgroundColor: '#f0f0f0',
      }}
    >
      <img
        src={imageUrl}
        alt="Zoomable content"
        style={{
          transform: `scale(${zoomLevel})`,
           transformOrigin: 'center',
          transition: 'transform 0.3s ease-in-out',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain', // Ensures the image maintains its aspect ratio
        }}
      />
    </div>
  );
});
