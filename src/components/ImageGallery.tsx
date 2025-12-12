'use client';

import { useState } from 'react';
import { IdeaImage } from '@/lib/types';

interface ImageGalleryProps {
  images: IdeaImage[];
}

// Get image URL from file path
function getImageUrl(image: IdeaImage): string {
  return `/api/images/${image.filePath}`;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<IdeaImage | null>(null);

  const downloadImage = async (image: IdeaImage) => {
    try {
      const response = await fetch(getImageUrl(image));
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.type}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No images generated yet
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-square">
              <img
                src={getImageUrl(image)}
                alt={image.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-medium">{image.label}</h4>
                <p className="text-gray-300 text-sm mt-1 line-clamp-2">{image.prompt}</p>
              </div>
            </div>

            {/* Download button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(image);
              }}
              className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              title="Download image"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={getImageUrl(selectedImage)}
              alt={selectedImage.label}
              className="w-full rounded-lg"
            />

            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl font-semibold">{selectedImage.label}</h3>
                <p className="text-gray-400 mt-1 max-w-2xl">{selectedImage.prompt}</p>
              </div>
              <button
                onClick={() => downloadImage(selectedImage)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
