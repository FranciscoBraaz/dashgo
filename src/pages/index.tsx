import { Button, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/FormComponents/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  passworD: string;
};

const signInSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
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
            name="email"
            label="E-mail"
            type="email"
            {...register('email')}
            error={formState.errors.email}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            {...register('password')}
            error={formState.errors.password}
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
