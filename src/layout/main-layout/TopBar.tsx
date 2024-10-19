import { RiSearchLine } from 'react-icons/ri';

export const TopBar = () => {
  return (
    <div className='flex items-center justify-center gap-3 py-6'>
      <input
        className='w-full max-w-[380px] rounded-full bg-gray-50 px-3 py-2'
        placeholder='Search by ID'
      />
      <div className='rounded-full bg-red-600 p-2 text-white'>
        <RiSearchLine size={20} />
      </div>
    </div>
  );
};
