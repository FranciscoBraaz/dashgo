import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

export default function Home() {
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
      >
        <Stack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              type="email"
              name="email"
              bgColor="gray.900"
              focusBorderColor="pink.500"
              variant="filled"
              _hover={{ bgColor: 'gray.900' }}
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              type="password"
              name="password"
              bgColor="gray.900"
              variant="filled"
              focusBorderColor="pink.500"
              _hover={{ bgColor: 'gray.900' }}
              size="lg"
            />
          </FormControl>
        </Stack>

        <Button colorScheme="pink" mt="6" type="submit" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
