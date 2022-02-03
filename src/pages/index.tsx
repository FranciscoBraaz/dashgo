import { Button, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  passworD: string;
};

export default function Home() {
  const { register, handleSubmit, formState } = useForm();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  console.log(formState.errors);

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
            {...register('email', { required: 'E-mail obrigatório' })}
            error={formState.errors.email}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            {...register('password', { required: 'Senha obrigatória' })}
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
