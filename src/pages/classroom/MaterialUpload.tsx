import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QK } from '@/api';
import { toast } from 'sonner';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { uploadMaterial } from '@/api/query/classroomQuery';

type MaterialUploadProps = {
  classroomId: string;
};

export default function MaterialUpload({ classroomId }: MaterialUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: async () => {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('classroomId', classroomId);
      return uploadMaterial(formData);
    },
    onSuccess: () => {
      toast.success('Material uploaded successfully');
      setFile(null);
      setTitle('');
      setDescription('');
      queryClient.invalidateQueries({ queryKey: [QK.CLASSROOM_MATERIALS, classroomId] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to upload material');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }
    if (!title) {
      toast.error('Please enter a title');
      return;
    }
    uploadFile();
  };

  return (
    <Card className='w-full max-w-xl'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <FaCloudUploadAlt className='text-xl' />
          Upload Material
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='file'>File</Label>
            <Input
              id='file'
              type='file'
              onChange={handleFileChange}
              accept='.pdf,.mp3,.mp4,audio/*,video/*'
              className='cursor-pointer'
            />
            {file && <p className='text-sm text-muted-foreground'>Selected: {file.name}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter material title'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description (Optional)</Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter material description'
              rows={3}
            />
          </div>

          <Button type='submit' disabled={isPending} className='w-full'>
            {isPending ? 'Uploading...' : 'Upload Material'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
