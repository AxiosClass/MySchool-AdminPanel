import { PropsWithChildren, useEffect } from 'react';

interface IProps extends PropsWithChildren {
  title: string;
}

export const PageTitle = ({ title, children }: IProps) => {
  useEffect(() => {
    document.title = `MySchool | ${title}`;
  }, [title]);

  return children;
};
