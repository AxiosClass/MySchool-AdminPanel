import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface NotesUploadProps {
  onUpload: (formData: FormData) => void;
  isUploading?: boolean;
}

export function NotesUpload({ onUpload, isUploading }: NotesUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    description?: string;
  }>();

  const onSubmit = (data: { title: string; description?: string }) => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }
    formData.append('file', selectedFile);

    // Log for debugging
    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    onUpload(formData);
    reset();
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' {...register('title', { required: 'Title is required' })} placeholder='Enter note title' />
        {errors.title && <p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor='description'>Description (Optional)</Label>
        <Textarea id='description' {...register('description')} placeholder='Enter note description' />
      </div>

      <div>
        <Label htmlFor='file'>File</Label>
        <div className='mt-1 flex items-center gap-4'>
          <Input id='file' name='file' type='file' onChange={handleFileChange} accept='*' />

          {selectedFile && (
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-500'>{selectedFile.name}</span>
              <Button type='button' variant='ghost' size='icon' onClick={removeFile}>
                <X className='h-4 w-4' />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button type='submit' disabled={isUploading}>
        <Upload className='mr-2 h-4 w-4' />
        {isUploading ? 'Uploading...' : 'Upload Note'}
      </Button>
    </form>
  );
}
