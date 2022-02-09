import { Box, Flex, SimpleGrid, Spinner, Text, theme } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useChartData } from '../hooks/useChartData';
import { api } from '../services/api';
import { requireAuthentication } from '../utils/requireAuthentication';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface UserData {
  name: string;
  email: string;
  created_at: string;
}

type FixedData = {
  dateMilliSeconds: number | Date;
  amount: number;
};

export default function Dashboard() {
  const { data, isLoading, isFetching, isError } = useChartData();
  const chartRef = useRef(null);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
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
  });

  useEffect(() => {
    if (data?.chartCategories && data?.chartSeries) {
      setOptions((prevState) => ({
        ...prevState,
        xaxis: { ...prevState.xaxis, categories: data.chartCategories },
      }));

      setSeries([{ name: 'Subscribes', data: data.chartSeries }]);
    }
  }, [data, isFetching, options]);

  return (
    <>
      <Head>
        <title>Dashboard | Dash Go</title>
      </Head>
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
                {isLoading && <Spinner size="sm" ml="4" />}
              </Text>
              <Chart
                //@ts-ignore
                options={options}
                series={series}
                height={160}
                type="area"
              />
            </Box>
            <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Inscritos da semana
                {isLoading && <Spinner size="sm" ml="4" />}
              </Text>
              <Chart
                //@ts-ignore
                options={options}
                series={series}
                height={160}
                type="area"
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  },
);
