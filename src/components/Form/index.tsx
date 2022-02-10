import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../FormComponents/Input';
import * as yup from 'yup';

const createUserSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
  passwordConfirmation: yup
    .string()
    .required('Senha obrigatória')
    .oneOf([null, yup.ref('password')], 'Senhas diferentes'),
});

const editUserSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string(),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'Senhas diferentes'),
});

type CreateUserFormData = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

type EditUserFormData = {
  email: string;
  name: string;
  password?: string;
  passwordConfirmation?: string;
};

interface FormProps {
  handleCallback: SubmitHandler<CreateUserFormData | EditUserFormData>;
  initialValues?: CreateUserFormData | EditUserFormData;
  isEdit?: boolean;
}

export function Form({
  handleCallback,
  initialValues,
  isEdit = false,
}: FormProps) {
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(isEdit ? editUserSchema : createUserSchema),
    defaultValues: isEdit
      ? {
          name: initialValues?.name,
          email: initialValues?.email,
          password: initialValues?.password,
          passwordConfirmation: initialValues?.passwordConfirmation,
        }
      : null,
  });

  useEffect(() => {
    if (isEdit) {
      reset({
        name: initialValues?.name,
        email: initialValues?.email,
        password: initialValues?.password,
        passwordConfirmation: initialValues?.passwordConfirmation,
      });
    }
    if (!firstRender && initialValues !== null) {
      setLoading(false);
    } else {
      setFirstRender(false);
    }
  }, [reset, isEdit, initialValues, firstRender]);

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handleCallback)}
      flex="1"
      borderRadius={8}
      bg="gray.800"
      p={['4', '8']}
    >
      <Heading size="lg" fontWeight="normal">
        Usuários
        {loading && <Spinner sm="small" color="gray.500" ml="4" />}
      </Heading>

      <Divider my="6" borderColor="gray.700" />
      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" w="100%" spacing={['6', '8']}>
          <Input
            name="name"
            type="text"
            label="Nome"
            {...register('name')}
            error={formState.errors.name}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            {...register('email')}
            error={formState.errors.email}
          />
        </SimpleGrid>
        <SimpleGrid minChildWidth="240px" w="100%" spacing={['6', '8']}>
          <Input
            name="password"
            type="password"
            label="Senha"
            {...register('password')}
            error={formState.errors.password}
          />
          <Input
            name="password_confirmation"
            type="password"
            label="Comfirmação da senha"
            {...register('passwordConfirmation')}
            error={formState.errors.passwordConfirmation}
          />
        </SimpleGrid>
      </VStack>
      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href="/users" passHref>
            <Button colorScheme="whiteAlpha">Cancelar</Button>
          </Link>
          <Button
            isLoading={formState.isSubmitting}
            type="submit"
            colorScheme="pink"
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
