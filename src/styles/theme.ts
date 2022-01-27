import { extendTheme } from '@chakra-ui/react';

const colors = {
  gray: {
    '900': '#181b23',
    '800': '#1F2829',
    '700': '#353646',
    '600': '#4B4D63',
    '500': '#616488',
    '400': '#797D9A',
    '300': '#9699B8',
    '200': '#B3B5C6',
    '100': '#D1D2DC',
    '50': '#EEEEF2',
  },
};

const fonts = {
  heading: 'Roboto',
  body: 'Roboto',
};

export const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
});
