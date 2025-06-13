import { SUBJECT_TYPE } from '@/lib/types';

export type TSubjectType =
  | SUBJECT_TYPE.CQ_MCQ
  | SUBJECT_TYPE.CQ_MCQ_PRACTICAL
  | SUBJECT_TYPE.WRITTEN_FULL
  | SUBJECT_TYPE.WRITTEN_HALF;

export const generateMarkReport = (marks: Record<string, number>, subjectType: TSubjectType) => {
  const subjectMarkSchema = {
    [SUBJECT_TYPE.CQ_MCQ]: {
      cq: { total: 70, pass: 23 },
      mcq: { total: 30, pass: 10 },
    },
    [SUBJECT_TYPE.CQ_MCQ_PRACTICAL]: {
      cq: { total: 50, pass: 17 },
      mcq: { total: 25, pass: 8 },
      practical: { total: 25, pass: 8 },
    },
    [SUBJECT_TYPE.WRITTEN_FULL]: {
      written: { total: 100, pass: 33 },
    },
    [SUBJECT_TYPE.WRITTEN_HALF]: {
      written: { total: 50, pass: 17 },
    },
  };

  const schema = subjectMarkSchema[subjectType];

  const allMarks = Object.entries(schema).map(([title, { total, pass }]) => ({
    title,
    obtainedMarks: marks[title] ?? 0,
    totalMarks: total,
    passMarks: pass,
  }));

  const isWrittenHalf = subjectType === SUBJECT_TYPE.WRITTEN_HALF;

  const obtainedMarks = allMarks.reduce((acc, marks) => (acc += marks.obtainedMarks), 0);
  const isPassed = isWrittenHalf ? obtainedMarks >= 17 : obtainedMarks >= 33;
  const isAPlus = isWrittenHalf ? obtainedMarks >= 40 : obtainedMarks >= 80;
  const grade = getGrade(obtainedMarks, isWrittenHalf ? 50 : 100);

  return { allMarks, obtainedMarks, isPassed, isAPlus, total: isWrittenHalf ? 50 : 100, grade };
};

export const getGrade = (obtainedMarks: number, totalMarks: number): string => {
  if (totalMarks <= 0) return 'F';

  const percentage = (obtainedMarks / totalMarks) * 100;

  if (percentage >= 80) return 'A+';
  if (percentage >= 70) return 'A';
  if (percentage >= 60) return 'A−';
  if (percentage >= 50) return 'B';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
};

export const getGradeFromGpa = (gpa: number) => {
  if (gpa >= 5) return 'A+';
  else if (gpa >= 4) return 'A';
  else if (gpa >= 3.5) return 'A-';
  else if (gpa >= 3) return 'B';
  else if (gpa >= 2) return 'C';
  else if (gpa >= 1) return 'D';
  else return 'F';
};
