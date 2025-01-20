export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';

export const apiUrl = {
  // auth
  login: `${SERVER_ADDRESS}/auth/login?type=admin`,
  // class
  createClass: `${SERVER_ADDRESS}/class`,
  getClasses: `${SERVER_ADDRESS}/classes`,
  getClassDetails: (classId: string) => `${SERVER_ADDRESS}/class/${classId}`,
  //classroom
  createClassroom: `${SERVER_ADDRESS}/classroom`,
  // teacher
  addTeacher: `${SERVER_ADDRESS}/teacher`,
  getTeachers: `${SERVER_ADDRESS}/teachers`,
  getTeacherList: `${SERVER_ADDRESS}/teachers/list`,
  // student
  addStudent: `${SERVER_ADDRESS}/student`,
  getStudents: `${SERVER_ADDRESS}/students`,
  // payment
  getPaymentSummary: (studentId: string) => `${SERVER_ADDRESS}/payment/summary/${studentId}`,
  makePayment: `${SERVER_ADDRESS}/payment`,
  getPayments: `${SERVER_ADDRESS}/payments`,
};
