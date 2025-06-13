import { CommonSelect } from '../form';

type TYearPickerProps = { year: string; onYearChange: (year: string) => void; years: string[] };

export const YearPicker = ({ year, onYearChange, years }: TYearPickerProps) => {
  const yearOptions = years.map((year) => ({ label: year, value: year }));

  return <CommonSelect className='ml-auto max-w-40' value={year} onChange={onYearChange} options={yearOptions} />;
};
