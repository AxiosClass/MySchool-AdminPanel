import { QK } from '@/api';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { PlusIcon } from 'lucide-react';
import { NoteForm, TNoteForm } from './NoteForm';
import { FormSheet } from '../form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessageGen, uploadToCloudinary } from '@/helpers';
import { addNote } from '@/api/query';
import { TMedia } from '@/lib/types';
import { toast } from 'sonner';

const formId = QK.NOTE + '_ADD';
type TAddNoteProps = { sectionId: string };

export const AddNote = ({ sectionId }: TAddNoteProps) => {
  const qc = useQueryClient();

  const { open, onOpenChange } = usePopupState();
  const { mutateAsync: uploadFile } = useMutation({ mutationKey: [formId], mutationFn: uploadToCloudinary });

  const { mutate: handleAddNote } = useMutation({
    mutationKey: [formId],
    mutationFn: addNote,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.NOTE, { sectionId }] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const onAddNote = async (formData: TNoteForm) => {
    const { title, description, files } = formData;

    let media: TMedia[] = [];
    if (files.new.length) media = await uploadFile(files.new);
    handleAddNote({ classroomId: sectionId, title, description, ...(media.length && { media }) });
  };

  return (
    <>
      <Button variant='outline' onClick={() => onOpenChange(true)}>
        <PlusIcon size={16} />
        Add Note
      </Button>
      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Note'
        description='Provide the following information to add note'
        submitButtonTitle='Add'
        submitLoadingTitle='Adding...'
      >
        <NoteForm formId={formId} onSubmit={onAddNote} />
      </FormSheet>
    </>
  );
};
