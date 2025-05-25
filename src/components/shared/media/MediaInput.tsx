import { Input } from '@/components/ui/input';
import { UploadIcon, XIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useRef } from 'react';
import { FaFilePdf } from 'react-icons/fa6';

type TOldFile = { type: string; url: string; id: string };
type TMediaInputProps = {
  value: { old: TOldFile[]; new: File[] };
  onChange: (value: { old: TOldFile[]; new: File[] }) => void;
  onOldFileRemove?: (file: TOldFile) => void;
};

export const MediaInput = ({ value, onChange, onOldFileRemove }: TMediaInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalFiles = value.old.length + value.new.length;

  useEffect(() => {
    return () => {
      value.new.forEach((file) => URL.revokeObjectURL(file as unknown as string));
    };
  }, [value.new]);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange({ ...value, new: [...value.new, ...files] });
  };

  const removeNewFile = (index: number) => {
    const updatedNew = [...value.new];
    updatedNew.splice(index, 1);
    onChange({ ...value, new: updatedNew });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeOldFile = (file: TOldFile) => {
    const updatedOld = value.old.filter((f) => f.id !== file.id);
    onChange({ ...value, old: updatedOld });
    onOldFileRemove?.(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <Input
        className='hidden'
        type='file'
        multiple
        accept='image/*,application/pdf'
        ref={fileInputRef}
        onChange={handleFilesChange}
      />
      <button
        type='button'
        onClick={() => fileInputRef.current?.click()}
        className='flex h-40 w-full flex-col items-center justify-center gap-4 rounded border border-dashed px-3 py-1 text-sm'
      >
        <UploadIcon className='text-primary' />
        {!!totalFiles && (
          <p className='font-semibold text-muted-foreground'>
            Total : {totalFiles > 1 ? `${totalFiles} files` : `${totalFiles} file`} Has Been Selected
          </p>
        )}
      </button>

      <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {value?.old?.map((file) => (
          <MediaPreviewCard key={file.id} src={file.url} type={file.type} onRemove={() => removeOldFile(file)} />
        ))}

        {value?.new?.map((file, index) => (
          <MediaPreviewCard
            key={index}
            src={URL.createObjectURL(file)}
            type={file.type}
            name={file.name}
            onRemove={() => removeNewFile(index)}
          />
        ))}
      </div>
    </div>
  );
};

type MediaPreviewCardProps = { src: string; type: string; name?: string; onRemove?: () => void };
export const MediaPreviewCard = ({ src, type, name, onRemove }: MediaPreviewCardProps) => {
  const isImage = type.startsWith('image/');

  return (
    <div className='relative rounded text-sm'>
      {isImage ? (
        <img src={src} alt={name || 'media'} className='h-32 w-full rounded object-cover' />
      ) : (
        <div className='flex h-32 flex-col items-center justify-center gap-4 rounded-md border border-dashed p-2'>
          <FaFilePdf className='text-primary' size={32} />
          <p className='line-clamp-1 break-all text-center text-muted-foreground'>{name || src.split('/').pop()}</p>
        </div>
      )}

      <button
        type='button'
        onClick={onRemove}
        className='absolute right-2 top-2 rounded-md bg-black/90 p-1 text-xs text-white'
      >
        <XIcon size={16} />
      </button>
    </div>
  );
};
