import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FileIcon, Trash2, X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface RawMaterial {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  publicId: string;
  classroomId: string;
  uploadedAt: string;
  updatedAt: string;
}

interface NotesListProps {
  materials: RawMaterial[];
  isLoading: boolean;
  onDelete: (materialId: string) => void;
  isDeleting: boolean;
}

function PreviewDialog({
  fileUrl,
  fileType,
  onClose,
  title,
}: {
  fileUrl: string;
  fileType: string;
  onClose: () => void;
  title: string;
}) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to detect main type (image, video, audio, pdf, other)
  const type = fileType.split('/')[0].toLowerCase();
  const isPDF = fileType === 'application/pdf';
  const isImage = type === 'image';
  const isVideo = type === 'video';
  const isAudio = type === 'audio';
  const isText =
    fileType.includes('text/') || fileType.includes('application/json') || fileType.includes('application/javascript');
  const isCode = fileType.includes('application/x-') || fileType.includes('text/plain');

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [fileUrl]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70' onClick={onClose}>
      <div
        className='relative max-h-[90vh] w-full max-w-5xl rounded-md bg-white p-4'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <div className='flex items-center gap-2'>
            {(isImage || isPDF) && (
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='icon' onClick={handleZoomOut}>
                  <ZoomOut className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={handleZoomIn}>
                  <ZoomIn className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={handleRotate}>
                  <RotateCcw className='h-4 w-4' />
                </Button>
              </div>
            )}
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X />
            </Button>
          </div>
        </div>

        <div className='flex max-h-[70vh] items-center justify-center overflow-auto'>
          {isLoading ? (
            <div className='flex h-40 items-center justify-center'>
              <Skeleton className='h-8 w-8 rounded-full' />
            </div>
          ) : (
            <>
              {isImage && (
                <img
                  src={fileUrl}
                  alt={title}
                  className='max-h-[70vh] object-contain'
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              )}
              {isVideo && (
                <video controls className='max-h-[70vh] max-w-full' controlsList='nodownload'>
                  <source src={fileUrl} type={fileType} />
                  Your browser does not support the video tag.
                </video>
              )}
              {isAudio && (
                <audio controls className='w-full'>
                  <source src={fileUrl} type={fileType} />
                  Your browser does not support the audio element.
                </audio>
              )}
              {isPDF && (
                <iframe
                  src={`${fileUrl}#toolbar=0&navpanes=0`}
                  title={title}
                  className='h-[70vh] w-full'
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }}
                  frameBorder='0'
                />
              )}
              {(isText || isCode) && (
                <div className='max-h-[70vh] w-full overflow-auto rounded bg-gray-50 p-4'>
                  <pre className='whitespace-pre-wrap font-mono text-sm'>{fileUrl}</pre>
                </div>
              )}
              {!(isImage || isVideo || isAudio || isPDF || isText || isCode) && (
                <div className='flex flex-col items-center justify-center gap-4 p-6'>
                  <FileIcon className='h-12 w-12 text-gray-500' />
                  <p className='text-center text-gray-700'>No preview available for this file type.</p>
                  <Button variant='outline' className='gap-2' asChild>
                    <a href={fileUrl} download>
                      <Download className='h-4 w-4' />
                      Download file
                    </a>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {(isImage || isVideo || isAudio || isPDF) && (
          <div className='mt-4 flex justify-end'>
            <Button variant='outline' className='gap-2' asChild>
              <a href={fileUrl} download>
                <Download className='h-4 w-4' />
                Download
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function NotesList({ materials, isLoading, onDelete, isDeleting }: NotesListProps) {
  const [previewMaterial, setPreviewMaterial] = useState<RawMaterial | null>(null);

  if (isLoading) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-3/4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='mt-2 h-4 w-2/3' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!materials?.length) {
    return (
      <div className='flex h-40 items-center justify-center rounded-lg border border-dashed'>
        <p className='text-sm text-gray-500'>No materials uploaded yet</p>
      </div>
    );
  }

  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {materials.map((material) => (
          <Card key={material.id}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>{material.title}</CardTitle>
              <Button variant='ghost' size='icon' onClick={() => onDelete(material.id)} disabled={isDeleting}>
                <Trash2 className='h-4 w-4 text-red-500' />
              </Button>
            </CardHeader>
            <CardContent>
              <div className='mb-2 flex items-center gap-2'>
                <FileIcon className='h-4 w-4 text-gray-500' />
                <Button
                  variant='link'
                  className='p-0 text-sm text-blue-500 hover:underline'
                  onClick={() => setPreviewMaterial(material)}
                >
                  Preview
                </Button>
              </div>
              {material.description && <p className='mt-2 text-sm text-gray-500'>{material.description}</p>}
              <div className='mt-4 flex items-center justify-between text-xs text-gray-500'>
                <span>{format(new Date(material.updatedAt), 'MMM d, yyyy')}</span>
                <a href={material.fileUrl} download className='text-xs text-blue-500 hover:underline'>
                  Download
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {previewMaterial && (
        <PreviewDialog
          fileUrl={previewMaterial.fileUrl}
          fileType={previewMaterial.fileType}
          title={previewMaterial.title}
          onClose={() => setPreviewMaterial(null)}
        />
      )}
    </>
  );
}
