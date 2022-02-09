import { Button, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/FormComponents/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

type SignInFormData = {
  name: string;
};

const signInSchema = yup.object().shape({
  name: yup.string().required('User obrigatório'),
});

export default function Home() {
  const { userLogin } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    const response = await userLogin(values.name);
    if (response.status === 200) {
      router.push('/dashboard');
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
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
    </Flex>
  );
}
