export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';
// export const SERVER_ADDRESS = 'https://my-school-server-cyan.vercel.app/api/v1';

export const apiUrl = {
  // auth
  login: (type: string) => `/auth/login?type=${type}`,
  // class
  createClass: `/class`,
  getClasses: `/classes`,
  getClassDetails: (classId: string) => `/class/${classId}`,
  getClassList: `/classes/list`,
  getClassroomList: (level: string) => `/classes/list/classroom/${level}`,
  assignSubjects: 'class/subjects',
  //classroom
  createClassroom: `/classroom`,
  getSubjectsWithTeacher: (classroomId: string) => `/classroom/${classroomId}/subjects`,
  assignSubjectTeacher: 'classroom/subject-teacher',
  deleteSubjectTeacher: (classSubjectTeacherId: string) => `/classroom/subject-teacher/${classSubjectTeacherId}`,
  getClassroomsForTeacher: (teacherId: string) => `/classrooms/teacher/${teacherId}`,
  // subjects
  createSubject: `/subject`,
  getSubjects: (searchParams: string) => `/subjects${searchParams}`,
  deleteSubject: (subjectId: string) => `/subject/${subjectId}`,
  // teacher
  addTeacher: `/teacher`,
  getTeachers: `/teachers`,
  getTeacherList: `/teachers/list`,
  // student
  addStudent: `/student`,
  getStudents: `/students`,
  issueNfcCard: `/student/issue-nfc`,
  getStudentInfo: `/student/mine`,
  // payment
  getPaymentSummary: (studentId: string) => `/payment/summary/${studentId}`,
  makePayment: `/payment`,
  getPayments: (searchParams: string) => `/payments${searchParams}`,
  // notice
  addNotice: `/notice`,
  getNotices: (searchParams: string) => `/notices${searchParams}`,
  updateNotice: (noticeId: string) => `/notice/${noticeId}`,
  deleteNotice: (noticeId: string) => `/notice/${noticeId}`,
  getMyNotices: `/notices/mine`,
  // holidays
  addHoliday: `/holiday`,
  getHolidays: `/holidays`,
  // exam
  addExam: `/exam`,
  getExams: (searchParams: string) => `/exams${searchParams}`,
  updateExam: (examId: string) => `/exam/${examId}`,
  deleteExam: (examId: string) => `/exam/${examId}`,
  // attendance
  getAttendanceForClassroom: (classroomId: string, range: number) =>
    `/attendances/classroom/${classroomId}?range=${range}`,
  addAttendance: '/attendance',
  deleteAttendance: (attendanceId: string) => `/attendance/${attendanceId}`,
  getAttendancesForStudent: ({ start, end }: { start: string; end: string }) =>
    `/attendances/student?start=${start}&end=${end}`,
  // metadata
  getAttendanceSummary: '/meta-data/attendance/summary',
  getAttendanceTrends: '/meta-data/attendance/trends',
  getPaymentTrends: '/meta-data/payment/trends',
  // admin
  createAdmin: '/admin',
  getAdmins: (query: string) => `/admins${query}`,
  deleteAdmin: (email: string) => `/admin/${email}`,
  resetPassword: (email: string) => `/admin/reset-password/${email}`,
};
