export type TTeacher = {
  id: string;
  name: string;
  nid: string;
  phone: string;
  dob: Date | string;
  bloodGroup: string;
  salary: number;
  address: string;
  education: TTeacherEducation;
};

export type TTeacherEducation = {
  degree: string;
  passedYear: string;
};
