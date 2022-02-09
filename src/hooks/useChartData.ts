import { useQuery } from 'react-query';
import { api } from '../services/api';

interface User {
  name: string;
  email: string;
  created_at: string;
}

type GetChartData = {
  chartCategories: number[];
  chartSeries: number[];
};

type FixedData = {
  dateMilliSeconds: number;
  amount: number;
};

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

function formatData(users: User[]) {
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

export async function getChartData(): Promise<GetChartData> {
  const response = await api.get('users/all');
  let newData: FixedData[] = [];
  if (response.data?.users.length > 0) {
    newData = formatData(response.data.users);
  }

  let sortedNewData: FixedData[] = orderDates(newData);
  let chartCategories = sortedNewData.map(
    (data: FixedData) => data.dateMilliSeconds,
  );

  let chartSeries = sortedNewData.map((data: FixedData) => data.amount);

  return {
    chartCategories,
    chartSeries,
  };
}

export function useChartData() {
  return useQuery('users', () => getChartData());
}
