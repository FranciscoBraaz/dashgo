import { Box, Button, Stack } from '@chakra-ui/react';
import React from 'react';

export function Pagination() {
  return (
    <Stack
      direction="row"
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <Button
          fontSize="xs"
          size="sm"
          width="4"
          colorScheme="pink"
          disabled
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          1
        </Button>
        <Button
          fontSize="xs"
          size="sm"
          width="4"
          colorScheme="pink"
          bgColor="gray.700"
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          2
        </Button>
        <Button
          fontSize="xs"
          size="sm"
          width="4"
          colorScheme="pink"
          bgColor="gray.700"
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          3
        </Button>
      </Stack>
    </Stack>
  );
}
