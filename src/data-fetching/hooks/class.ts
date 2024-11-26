import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { queryClient } from '../QueryProvider';
import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

// Create Class
const createClass = async (payload: { name: string; level: string }): Promise<IServerResponse<null>> => {
  const response = await axiosInstance.post(apiUrl.createClass, payload);
  return response?.data;
};

export const useCreateClassMutation = () => {
  const addClassMutation = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.CLASSES] });
    },
  });

  return { addClassMutation, isLoading: addClassMutation.isPending };
};

// Get Classes
interface IGetClass {
  id: string;
  name: string;
  level: string;
  subjects: { id: string; name: string }[];
  classrooms: { id: string; students: { id: string }[] }[];
}

const getClasses = async (): Promise<IServerResponse<IGetClass[]>> => {
  const response = await axiosInstance.get(apiUrl.getClasses);
  return response?.data;
};

export const useGetClassesQuery = () => {
  return useQuery({ queryFn: getClasses, queryKey: [TAGS.CLASSES] });
};

// Get Class Details
export interface IGetClassDetails {
  id: string;
  name: string;
  level: string;
  classrooms: { id: string; name: string; classTeacher: { id: string; name: string }; students: { id: string }[] }[];
}

const getClassDetails = async (classId: string): Promise<IServerResponse<IGetClassDetails>> => {
  const response = await axiosInstance.get(apiUrl.getClassDetails(classId));
  return response?.data;
};

export const useGetClassDetails = (classId: string) => {
  return useQuery({ queryKey: [TAGS.CLASS_DETAILS, classId], queryFn: () => getClassDetails(classId) });
};
