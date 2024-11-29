import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { queryClient } from '../QueryProvider';
import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

// ********* crate class ********* \\
interface IAddClassPayload {
  name: string;
  level: string;
  admissionFee: number;
  monthlyFee: number;
}

const createClass = async (payload: IAddClassPayload): Promise<IServerResponse<null>> => {
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

  return { createClass: addClassMutation, isLoading: addClassMutation.isPending };
};

// ********* get classes ********* \\
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
  return useQuery({
    queryFn: getClasses,
    queryKey: [TAGS.CLASSES],
  });
};

// ********* get class details ********* \\

interface IGetClassDetails {
  id: string;
  name: string;
  level: string;
  classrooms: { id: string; name: string; classTeacher: { id: string; name: string }; students: { id: string }[] }[];
}

const getClassDetails = async (classId: string): Promise<IServerResponse<IGetClassDetails>> => {
  const response = await axiosInstance.get(apiUrl.getClassDetails(classId));
  return response?.data;
};

export const useGetClassDetailsQuery = (classId: string, skip?: boolean) => {
  return useQuery({ queryKey: [TAGS.CLASS_DETAILS, classId], queryFn: () => getClassDetails(classId), enabled: !skip });
};
