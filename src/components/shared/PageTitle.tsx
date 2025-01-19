import { PropsWithChildren, useEffect } from 'react';

type TPageTitleProps = PropsWithChildren<{ title: string }>;
export const PageTitle = ({ title, children }: TPageTitleProps) => {
  useEffect(() => {
    document.title = `MySchool | ${title}`;
    return () => {
      document.title = 'MySchool';
    };
  }, [title]);

  return children;
};
