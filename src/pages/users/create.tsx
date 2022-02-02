import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

export default function CreateUser() {
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} max="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" w="100%" spacing={['6', '8']}>
              <Input name="name" type="text" label="Nome" />
              <Input name="email" type="email" label="Email" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" w="100%" spacing={['6', '8']}>
              <Input name="password" type="password" label="Senha" />
              <Input
                name="password_confirmation"
                type="password"
                label="Comfirmação da senha"
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button colorScheme="pink">Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
