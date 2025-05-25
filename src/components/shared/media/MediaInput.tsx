import { TMedia } from '@/lib/types';
import { ChangeEvent, useMemo, useRef } from 'react';

type TFile = TMedia[] | File[];
type TMediaInputProps = {
  value: TFile[];
  onChange: (value: TFile[]) => void;
  onDelete?: (id: string) => Promise<void>;
};

export const MediaInput = ({ value, onChange }: TMediaInputProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  console.log({ value });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);

    if (!files || files.length === 0) return;
    onChange(files as unknown as TFile[]);
  };

  const previewUrls = useMemo<TMedia[]>(() => {
    const files =
      value
        ?.map((eachValue) => {
          if (eachValue instanceof File)
            return {
              url: URL.createObjectURL(eachValue),
              type: eachValue.type,
              id: `${new Date().getTime()}-${eachValue.name}`,
            };

          if ('id' in eachValue && 'url' in eachValue && 'type' in eachValue) return eachValue;
          return null;
        })
        .filter((file): file is TMedia => file !== null) || [];

    return files;
  }, [value]);

  return (
    <>
      <div className='flex flex-wrap gap-4 gap-x-4'>
        {previewUrls.map((preview) => (
          <div key={preview.id}>
            {preview.type === 'IMAGE'}
            {preview.url} {preview.type}
          </div>
        ))}
      </div>
      <input type='file' accept='image/*,application/pdf' ref={fileRef} onChange={handleFileChange} />
    </>
  );
};
