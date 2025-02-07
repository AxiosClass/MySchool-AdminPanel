import { useEffect } from 'react';

export const PageTitle = ({ title }: TPageTitleProps) => {
  useEffect(() => {
    document.title = `MySchool | ${title}`;
    return () => {
      document.title = 'MySchool';
    };
  }, [title]);

  return null;
};

type TPageTitleProps = { title: string };
