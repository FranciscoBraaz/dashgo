import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
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
    function findDate(data: FixedData[], createdAtMilliSeconds: number) {
      return data.findIndex(
        (data) => data.dateMilliSeconds === createdAtMilliSeconds,
      );
    }

    function orderDates(data: FixedData[]) {
      return data.sort((a, b) =>
        a.dateMilliSeconds > b.dateMilliSeconds ? 1 : -1,
      );
    }

    function formatData(users: UserData[]) {
      let fixedData: FixedData[] = [];
      users?.forEach((user, index) => {
        let createdAt = new Date(user.created_at);
        createdAt.setHours(0);
        createdAt.setMinutes(0);
        createdAt.setSeconds(0);
        createdAt.setMilliseconds(0);
        const createdAtMilliSeconds = createdAt.getTime();
        if (index > 0) {
          let searchedIndex = findDate(fixedData, createdAtMilliSeconds);
          if (searchedIndex === -1) {
            fixedData.push({
              dateMilliSeconds: createdAtMilliSeconds,
              amount: 1,
            });
          } else {
            fixedData[searchedIndex].amount++;
          }
        } else {
          fixedData.push({
            dateMilliSeconds: createdAtMilliSeconds,
            amount: 1,
          });
        }
      });

      return fixedData;
    }

    async function getUsers() {
      const response = await api.get('users/all');
      let newData: FixedData[] = [];
      if (response.data?.users.length > 0) {
        newData = formatData(response.data.users);
      }

      let sortedNewData: FixedData[] = orderDates(newData);
      let categoriesChart = sortedNewData.map(
        (data: FixedData) => data.dateMilliSeconds,
      );

      let seriesChart = sortedNewData.map((data: FixedData) => data.amount);

      setOptions((prevState) => ({
        ...prevState,
        xaxis: {
          ...prevState.xaxis,
          categories: categoriesChart,
        },
      }));

      setSeries([{ name: 'Subscribes', data: seriesChart }]);
    }

    getUsers();
  }, []);

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
