import { QK } from '@/api';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { TGetNotesQueryResult, updateNote } from '@/api/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorToast, uploadToCloudinary } from '@/helpers';
import { NoteForm, TNoteForm } from './NoteForm';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { usePopupState } from '@/hooks';
import { TMedia } from '@/lib/types';
import { FormSheet } from '../form';

type TEditNoteProps = { note: TGetNotesQueryResult[number]; onActionChange: (open: boolean) => void };
const formId = QK.NOTE + '_UPDATE';

export const EditNote = ({ note, onActionChange }: TEditNoteProps) => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const defaultValues = useMemo<TNoteForm>(() => {
    return { title: note.title, description: note.description, files: { old: note.media || [], new: [] } };
  }, [note]);

  const { mutateAsync: uploadFile } = useMutation({ mutationKey: [formId], mutationFn: uploadToCloudinary });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: updateNote,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.NOTE, { sectionId: note.classroomId }] });
      onOpenChange(false);
      onActionChange(false);
    },
    onError: errorToast,
  });

  const handleUpdateNote = async (formData: TNoteForm) => {
    const { files, ...restFormData } = formData;
    let newMedia: TMedia[] = [];
    if (files.new.length) newMedia = await uploadFile(files.new);
    mutate({ id: note.id, ...restFormData, media: { old: files.old, new: newMedia.length ? newMedia : [] } });
  };

  return (
    <>
      <Button className='justify-start gap-4' variant='ghost' size='sm' onClick={() => onOpenChange(true)}>
        <EditIcon size={20} /> Edit Note
      </Button>
      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Edit Note'
        description='Please fill all the fields'
        submitButtonTitle='Update'
        submitLoadingTitle='Updating...'
      >
        <NoteForm
          formId={formId}
          defaultValues={defaultValues}
          onSubmit={handleUpdateNote}
          sectionId={note.classroomId}
        />
      </FormSheet>
    </>
  );
};
