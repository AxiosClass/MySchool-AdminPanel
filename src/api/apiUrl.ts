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
  getAssignedSubjects: (classId: string) => `/class/${classId}/subjects`,
  assignSubject: `/class/subjects`,
  //classroom
  createClassroom: `/classroom`,
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
