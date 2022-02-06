import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { truncate } from '../../utils/truncate';

export default function Users() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    fetch('https://localhost:3000/api/users')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} max="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mg="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link href="users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                pr={['0.4rem', '0.5rem']}
                leftIcon={<Icon as={RiAddLine} fontSize="16" />}
              >
                {isWideVersion && 'Criar novo'}
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuários</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                {isWideVersion && <Th width="8"></Th>}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Francisco Braz</Text>
                    <Text fontSize="sm" color="gray.300">
                      {isWideVersion
                        ? 'francisco_braaz@hotmail.com'
                        : truncate('francisco_braaz@hotmail.com', 10)}
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>01 de Janeiro, 2022</Td>}

                {isWideVersion && (
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      Editar
                    </Button>
                  </Td>
                )}
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
