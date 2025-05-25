import { QK } from '@/api';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { PlusIcon } from 'lucide-react';
import { NoteForm } from './NoteForm';
import { FormSheet } from '../form';

// import { MediaInput } from '../media';

const formId = QK.NOTE + '_ADD';
type TAddNoteProps = { sectionId: string };

export const AddNote = ({ sectionId }: TAddNoteProps) => {
  const { open, onOpenChange } = usePopupState();
  console.log(sectionId);

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
        <NoteForm formId={formId} />
      </FormSheet>
    </>
  );
};
