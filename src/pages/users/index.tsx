import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
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
import React, { useEffect, useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { truncate } from '../../utils/truncate';
import { getUsers, useUsers } from '../../hooks/useUsers';
import { GetServerSideProps } from 'next';
import { requireAuthentication } from '../../utils/requireAuthentication';

export default function Users() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMediumVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} max="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mg="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner sm="small" color="gray.500" ml="4" />
              )}
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
                {isMediumVersion && 'Criar novo'}
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <>
              <Flex justify="center">
                <Spinner />
              </Flex>
            </>
          ) : isError ? (
            <Flex justify="center">
              <Text>Falha ao carregar usuários</Text>
            </Flex>
          ) : (
            <>
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
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {isMediumVersion
                              ? user.email
                              : truncate(user.email, 10)}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.created_at}</Td>}

                      {isMediumVersion && (
                        <Td style={{ textAlign: 'end' }}>
                          <Link href={`/users/edit/${user.id}`} passHref>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              pr={['0.2rem', '0.5rem']}
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              {isWideVersion ? 'Editar' : ''}
                            </Button>
                          </Link>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={200}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  },
);
