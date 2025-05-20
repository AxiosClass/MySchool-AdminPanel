import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl, QK } from '@/api';
import { axiosInstance } from '@/api/axiosInstance';
import { NotesUpload } from '@/components/shared/NotesUpload';
import { NotesList } from '@/components/shared/NotesList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';

export default function TeacherNotes() {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: materials, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM_MATERIALS, classroomId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(apiUrl.getClassroomMaterials(classroomId!));
      return data?.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      for (const pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const { data } = await axiosInstance.post(apiUrl.uploadClassroomMaterial, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK.CLASSROOM_MATERIALS, classroomId] });
      toast.success('Material uploaded successfully');
      setOpen(false);
    },
    onError: (error: unknown) => {
      let message = 'Failed to upload material';
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
      ) {
        message = (error.response.data as { message?: string }).message || message;
      }
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (materialId: string) => {
      await axiosInstance.delete(apiUrl.deleteClassroomMaterial(materialId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK.CLASSROOM_MATERIALS, classroomId] });
      toast.success('Material deleted successfully');
    },
    onError: (error: unknown) => {
      let message = 'Failed to delete material';
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
      ) {
        message = (error.response.data as { message?: string }).message || message;
      }
      toast.error(message);
    },
  });

  const handleUpload = (formData: FormData) => {
    formData.append('classroomId', classroomId!);
    uploadMutation.mutate(formData);
  };

  const handleDelete = (materialId: string) => {
    deleteMutation.mutate(materialId);
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6 flex items-center justify-between'>
        <Button variant='ghost' onClick={() => navigate(-1)}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Classroom
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='flex items-center gap-2' variant='default'>
              <Upload className='h-4 w-4' /> Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Material</DialogTitle>
            </DialogHeader>
            <NotesUpload onUpload={handleUpload} isUploading={uploadMutation.isPending} />
            <DialogClose asChild>
              <Button variant='outline' className='mt-4 w-full'>
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <NotesList
          materials={materials ?? []}
          isLoading={isLoading}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      </div>
    </div>
  );
}
