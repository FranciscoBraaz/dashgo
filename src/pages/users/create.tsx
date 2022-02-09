import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';
import { Form } from '../../components/Form';
import { GetServerSideProps } from 'next';
import { requireAuthentication } from '../../utils/requireAuthentication';
import Head from 'next/head';

type CreateUserFormData = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
        router.push('/users');
      },
    },
  );

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values,
  ) => {
    await createUser.mutateAsync(values);
  };

  return (
    <>
      <Head>
        <title>Usuários - criar | Dash Go</title>
      </Head>
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} max="auto" px="6">
          <Sidebar />
          <Form handleCallback={handleCreateUser} />
        </Flex>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  },
);
