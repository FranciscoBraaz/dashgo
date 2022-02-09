import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { requireAuthentication } from '../utils/requireAuthentication';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[500],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: 'series1', data: [30, 120, 10, 20, 61, 18, 109] }];

export default function Dashboard() {
  return (
    <Flex flexDir="column">
      <Header />

      <Flex w="100%" maxW={1480} mx="auto" px="6" my="6">
        <Sidebar />

        <SimpleGrid
          height="fit-content"
          flex="1"
          gap="4"
          minChildWidth="320px"
          align="flex-start"
        >
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            {/*@ts-ignore */}
            <Chart options={options} series={series} height={160} type="area" />
          </Box>
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            {/*@ts-ignore */}
            <Chart options={options} series={series} height={160} type="area" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  },
);
