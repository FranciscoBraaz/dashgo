import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
  return (
    <Flex flexDir="column">
      <Header />

      <Flex w="100%" maxW={1480} mx="auto" px="6" my="6">
        <Sidebar />
      </Flex>
    </Flex>
  );
}
