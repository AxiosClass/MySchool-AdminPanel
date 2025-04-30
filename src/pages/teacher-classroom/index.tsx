import { useParams } from 'react-router-dom';

export default function TeacherClassroom() {
  const { classroomId } = useParams();

  return <div>Teacher Class room {classroomId}</div>;
}
