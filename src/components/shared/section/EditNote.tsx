import { TGetNotesQueryResult } from '@/api/query';
import { NoteForm, TNoteForm } from './NoteForm';
import { usePopupState } from '@/hooks';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { FormSheet } from '../form';
import { QK } from '@/api';
import { useMemo } from 'react';

type TEditNoteProps = { note: TGetNotesQueryResult[number] };

const formId = QK.NOTE + '_UPDATE';

export const EditNote = ({ note }: TEditNoteProps) => {
  const { open, onOpenChange } = usePopupState();

  const defaultValues = useMemo<TNoteForm>(() => {
    return { title: note.title, description: note.description, files: { old: note.media || [], new: [] } };
  }, [note]);

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
        <NoteForm formId={formId} defaultValues={defaultValues} onSubmit={() => {}} />
      </FormSheet>
    </>
  );
};
