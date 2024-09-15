import { Logo, PageTitle } from '@/components/shared';

export default function LoginPage() {
  return (
    <PageTitle title='Login'>
      <div className='bg-baseLight-400 relative flex h-screen items-center justify-center overflow-hidden'>
        <img
          className='absolute -top-5 left-1/2 translate-x-[-50%] md:-top-40'
          width={700}
          src='/public/asset/education/bro.png'
          alt=''
        />
        <div>
          <Logo></Logo>
        </div>
        <img
          className='absolute -bottom-5 left-1/2 translate-x-[-50%] md:-bottom-28'
          width={700}
          src='/public/asset/high-school/bro.png'
          alt=''
        />
      </div>
    </PageTitle>
  );
}
