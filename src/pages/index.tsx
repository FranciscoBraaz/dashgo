import { Button, Flex, Spinner, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/FormComponents/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

type SignInFormData = {
  name: string;
};

const signInSchema = yup.object().shape({
  name: yup.string().required('User obrigatório'),
});

export default function Home() {
  const { userLogin, isAuthenticated, isLoadingAutoLogin } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router, isAuthenticated]);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    const response = await userLogin(values.name);
    if (response.status === 200) {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Head>
        <title>Dash Go</title>
        <meta name="description" content="Painel administrativo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        {isLoadingAutoLogin ? (
          <Spinner size="lg" />
        ) : (
          <Flex
            as="form"
            w="100%"
            maxW={360}
            bgColor="gray.800"
            p="8"
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Stack spacing="4">
              <Input
                name="user"
                label="Usuário"
                type="text"
                {...register('name')}
                error={formState.errors.name}
              />
            </Stack>

            {/* <Link href="/dashboard" passHref> */}
            <Button
              colorScheme="pink"
              mt="6"
              type="submit"
              size="lg"
              isLoading={formState.isSubmitting}
            >
              Entrar
            </Button>
            {/* </Link> */}
          </Flex>
        )}
      </Flex>
    </>
  );
}
