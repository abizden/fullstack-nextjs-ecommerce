import { Layout } from '../../components/layout/Layout';
import { SignInButton } from '../../components/auth/SignInButton';
import { useEffect } from 'react';
import router from 'next/router';

export default function SignIn() {
  return (
    <Layout>
      <SignInButton />
    </Layout>
  );
}
