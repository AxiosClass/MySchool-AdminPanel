export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';

export const apiUrl = {
  // auth
  login: `/auth/login?type=admin`,
  // class
  createClass: `/class`,
  getClasses: `/classes`,
  getClassDetails: (classId: string) => `/class/${classId}`,
  getClassList: `/classes/list`,
  getClassroomList: (level: string) => `/classes/list/classroom/${level}`,
  //classroom
  createClassroom: `/classroom`,
  getClassroomSubjectsWithTeacher: (classroomId: string) => `/classroom/${classroomId}/subjects`,
  assignSubjectTeacher: 'classroom/subject-teacher',
  // subjects
  assignSubjects: '/subjects',
  getSubjects: (searchParams: string) => `/subjects${searchParams}`,

  // teacher
  addTeacher: `/teacher`,
  getTeachers: `/teachers`,
  getTeacherList: `/teachers/list`,
  // student
  addStudent: `/student`,
  getStudents: `/students`,
  // payment
  getPaymentSummary: (studentId: string) => `/payment/summary/${studentId}`,
  makePayment: `/payment`,
  getPayments: (searchParams: string) => `/payments${searchParams}`,
  // notice
  addNotice: `/notice`,
  getNotices: (searchParams: string) => `/notices${searchParams}`,
  updateNotice: (noticeId: string) => `/notice/${noticeId}`,
  deleteNotice: (noticeId: string) => `/notice/${noticeId}`,
};
