import { Layout } from '../../components/layout/Layout';
import { SignInButton } from '../../components/auth/SignInButton';
import { useEffect } from 'react';
import router from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { getEnv } from '../../utils/env';
import { dehydrate, QueryClient } from 'react-query';

export default function SignIn() {
  return (
    <Layout>
      <SignInButton />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
