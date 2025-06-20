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
  getAssignedSubjects: (classId: string) => `/class/${classId}/subjects`,
  updateClass: (classId: string) => `/class/${classId}`,
  deleteClass: (classId: string) => `/class/${classId}`,

  //classroom
  createClassroom: `/classroom`,
  assignSubjectTeacher: 'classroom/subject-teacher',
  getSubjectListForClassroom: (classroomId: string) => `/classroom/${classroomId}/subjects`,
  deleteSubjectTeacher: (classSubjectTeacherId: string) => `/classroom/subject-teacher/${classSubjectTeacherId}`,
  getClassroomsForTeacher: (teacherId: string) => `/classrooms/teacher/${teacherId}`,
  getClassroomDetails: (classroomId: string) => `/classroom/${classroomId}`,
  addNote: `/classroom/note`,
  getNotes: (classroomId: string, searchParams: string) => `/classroom/${classroomId}/notes${searchParams}`,
  updateNote: (noteId: string) => `/classroom/note/${noteId}`,
  deleteNote: (noteId: string) => `/classroom/note/${noteId}`,
  getTeacherSubjects: (classroomId: string) => `/classroom/${classroomId}/teacher-subjects`,
  updateClassroom: (classroomId: string) => `/classroom/${classroomId}`,
  deleteClassroom: (classroomId: string) => `/classroom/${classroomId}`,

  // subjects
  createSubject: `/subject`,
  getSubjects: (searchParams: string) => `/subjects${searchParams}`,
  deleteSubject: (subjectId: string) => `/subject/${subjectId}`,

  // teacher
  addTeacher: `/teacher`,
  getTeachers: (searchParams: string) => `/teachers${searchParams}`,
  getTeacherList: `/teachers/list`,

  // student
  addStudent: `/student`,
  getStudents: (searchParams: string) => `/students${searchParams}`,
  issueNfcCard: `/student/issue-nfc`,
  getStudentInfo: (studentId: string) => `/student/${studentId}`,
  getStudentDetails: (studentId: string) => `/student/${studentId}/details`,
  getStudentListForPayment: `/students/list`,
  getStudentClassInfo: (studentId: string) => `/student/${studentId}/class`,
  updateStudent: (studentId: string) => `/student/${studentId}`,

  // payment
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

  // attendance
  getAttendanceForClassroom: (classroomId: string, date: string) =>
    `/attendances/classroom/${classroomId}?date=${date}`,
  addAttendance: '/attendance',
  deleteAttendance: (attendanceId: string) => `/attendance/${attendanceId}`,
  getAttendancesForStudent: ({ start, end, studentId }: { start: string; end: string; studentId: string }) =>
    `/attendances/student/${studentId}?start=${start}&end=${end}`,
  getAttendanceSummaryForStudent: (studentId: string) => `/attendance/summary/${studentId}`,

  // metadata
  getAttendanceSummary: '/meta-data/attendance/summary',
  getAttendanceTrends: '/meta-data/attendance/trends',
  getPaymentTrends: '/meta-data/payment/trends',

  // admin
  createAdmin: '/admin',
  getAdmins: (query: string) => `/admins${query}`,
  deleteAdmin: (email: string) => `/admin/${email}`,
  resetPassword: (email: string) => `/admin/reset-password/${email}`,

  //term
  addTerm: '/term',
  getTerms: (searchParams: string) => `/terms${searchParams}`,
  updateTerm: (termId: string) => `/term/${termId}`,
  updateTermStatus: (termId: string) => `/term/${termId}/status`,
  deleteTerm: (termId: string) => `/term/${termId}`,
  getOngoingTerm: `/term/ongoing`,

  // term result
  addTermResult: `/term-result`,
  getStudentsWithTermResult: (searchParams: string) => `/term-result/students${searchParams}`,
  getTermsResultSummary: (studentId: string, year: string) => `/term-result/summary/${studentId}?${year}`,

  // actions
  giveDiscount: `/actions/discount`,
  promoteStudent: `/actions/promote`,
};
