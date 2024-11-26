export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';

export const apiUrl = {
  // auth
  login: `${SERVER_ADDRESS}/auth/login?type=admin`,
  // class
  createClass: `${SERVER_ADDRESS}/class`,
  getClasses: `${SERVER_ADDRESS}/classes`,
  getClassDetails: (classId: string) => `${SERVER_ADDRESS}/class/${classId}`,
  // teacher
  addTeacher: `${SERVER_ADDRESS}/teacher`,
  getTeachers: `${SERVER_ADDRESS}/teachers`,
};
