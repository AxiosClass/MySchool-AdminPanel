export type TClassroom = {
  id: string;
  name: string;
  createdAt: Date;
  classId: string;
  classTeacherId: string;
};

export type TObject<TValue = string> = Record<string, TValue>;
