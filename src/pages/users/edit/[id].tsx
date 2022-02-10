import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../components/Sidebar';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';
import { useRouter } from 'next/router';
import { Form } from '../../../components/Form';
import { GetServerSideProps } from 'next';
import { requireAuthentication } from '../../../utils/requireAuthentication';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../../../components/Header'), {
  ssr: false,
});

type EditUserFormData = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<EditUserFormData>(null);

  useEffect(() => {
    async function getUser() {
      const response = await api.get(`/users/${id}`);
      const user = response.data?.user;
      setData({
        name: user?.name,
        email: user?.email,
        password: '',
        passwordConfirmation: '',
      });
    }

    getUser();
  }, [id]);

  const editUser = useMutation(
    async (user: EditUserFormData) => {
      const response = await api.patch(`users/${id}`, {
        user: {
          ...user,
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

  const handleEditUser: SubmitHandler<EditUserFormData> = async (values) => {
    await editUser.mutateAsync(values);
  };

  return (
    <>
      <Head>
        <title>Usuários - editar | Dash Go</title>
      </Head>
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} max="auto" px="6">
          <Sidebar />
          <Form
            handleCallback={handleEditUser}
            initialValues={data}
            isEdit={true}
          />
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
