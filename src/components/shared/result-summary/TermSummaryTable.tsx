import { cn } from '@/lib/utils';
import { TSubjectResult, TTermResultSummaryResult } from '@/api/query';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CommonTable } from '../CommonTable';
import { TableNoData } from '../TableNodata';

type TTermResultSummary = TTermResultSummaryResult[number];
type TTermSummaryTableProps = TTermResultSummary & {
  tableContainerClass?: string;
  tableHeaderClass?: string;
};

export const TermSummaryTable = ({
  termName,
  academicYear,
  classInfo,
  termGPA,
  termGrade,
  subjectResults,
  tableContainerClass,
  tableHeaderClass,
}: TTermSummaryTableProps) => (
  <CommonTable
    header={
      <TermSummaryTableHeader
        termName={termName}
        academicYear={academicYear}
        classInfo={classInfo}
        termGPA={termGPA}
        termGrade={termGrade}
        tableHeaderClass={tableHeaderClass}
      />
    }
    head={<TermSummaryTableHead />}
    tableContainerClassName={cn('px-6', tableContainerClass)}
    headerClassName='p-0'
  >
    <TermSummaryTableBody subjectResults={subjectResults} />
  </CommonTable>
);

type TTermSummaryTableHeaderProps = Pick<
  TTermResultSummary,
  'termName' | 'academicYear' | 'classInfo' | 'termGPA' | 'termGrade'
> & { tableHeaderClass?: string };

const TermSummaryTableHeader = ({
  termName,
  academicYear,
  classInfo,
  termGPA,
  termGrade,
  tableHeaderClass,
}: TTermSummaryTableHeaderProps) => (
  <div className={cn('flex items-center gap-4 bg-muted p-4', tableHeaderClass)}>
    <div className='mr-auto space-y-1'>
      <h2 className='text-lg font-semibold'>
        {termName} : {academicYear}
      </h2>
      <p className='font-medium'>
        Class : {classInfo.name} ({classInfo.level})
      </p>
    </div>
    <p className='rounded-lg border px-2 py-1 font-semibold'>Grade : {termGrade}</p>
    {termGPA && <GpaBadge gpa={termGPA} grade={termGrade} />}
  </div>
);

const TermSummaryTableHead = () => (
  <>
    <TableHead>Subject</TableHead>
    <TableHead>Breakdown</TableHead>
    <TableHead className='text-center'>Marks</TableHead>
    <TableHead className='text-center'>GPA</TableHead>
    <TableHead className='text-center'>Grade</TableHead>
  </>
);

// Sub Components
type TSubjectResultProps = TSubjectResult;
const SubjectResult = ({
  subjectName,
  obtainedMarks,
  fullMarks,
  gpa,
  grade,
  componentMarks,
}: TSubjectResultProps) => {
  const cellBase = 'border group-last:border-b-0';
  const centerCell = `${cellBase} text-center`;
  const leftCell = `${cellBase} border-l-0`;
  const rightCell = `${cellBase} border-r-0`;

  return (
    <TableRow className='group even:bg-muted'>
      <TableCell className={leftCell}>{subjectName}</TableCell>

      <TableCell className={cellBase}>
        <div className='space-y-2'>
          {Object.keys(componentMarks || {}).map((key) => (
            <ComponentBreakDown key={key} componentName={key} {...componentMarks[key]} />
          ))}
        </div>
      </TableCell>

      <TableCell className={centerCell}>
        {obtainedMarks}/ <span className='text-muted-foreground'>{fullMarks}</span>
      </TableCell>

      <TableCell className={centerCell}>{gpa}</TableCell>

      <TableCell className={rightCell}>
        <GardeBadge grade={grade} />
      </TableCell>
    </TableRow>
  );
};

type TTermSummaryTableBodyProps = { subjectResults: TSubjectResult[] };

const TermSummaryTableBody = ({ subjectResults }: TTermSummaryTableBodyProps) => {
  if (!subjectResults.length) return <TableNoData colSpan={5} message='No Result found' />;

  return subjectResults.map((subjectResult) => (
    <SubjectResult key={subjectResult.subjectId} {...subjectResult} />
  ));
};

type TComponentBreakDownProps = TSubjectResult['componentMarks'][string] & { componentName: string };
const ComponentBreakDown = ({ componentName, obtained, total }: TComponentBreakDownProps) => {
  const reach = (obtained / total) * 100;

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between gap-4'>
        <h3 className='uppercase'>{componentName}</h3>
        <p>
          {obtained}/{total}
        </p>
      </div>
      <div className='w-full rounded-full bg-gray-200'>
        <div style={{ width: `${reach}%` }} className='h-2 rounded-full bg-primary-100' />
      </div>
    </div>
  );
};

// Helper Components
type TGpaBadgeProps = { gpa: number; grade: string };
const GpaBadge = ({ gpa, grade }: TGpaBadgeProps) => {
  const { isAPlus, isPassed, isFailed } = getGradeStatus(grade);

  return (
    <div
      className={cn(
        'rounded-lg px-2 py-1 font-semibold text-white',
        isAPlus && 'bg-primary-400',
        isPassed && 'bg-blue-500',
        isFailed && 'bg-destructive',
      )}
    >
      GPA : {gpa.toFixed(2)}
    </div>
  );
};

const GardeBadge = ({ grade }: { grade: string }) => {
  const { isAPlus, isPassed, isFailed } = getGradeStatus(grade);

  return (
    <div
      className={cn(
        'mx-auto flex size-8 items-center justify-center rounded-lg text-white',
        isAPlus && 'bg-primary-400',
        isPassed && 'bg-blue-500',
        isFailed && 'bg-destructive',
      )}
    >
      {grade}
    </div>
  );
};

const getGradeStatus = (grade: string) => {
  const isAPlus = grade === 'A+';
  const isPassed = ['A', 'A-', 'B', 'C', 'D'].includes(grade);
  const isFailed = grade === 'F';

  return { isAPlus, isPassed, isFailed };
};
