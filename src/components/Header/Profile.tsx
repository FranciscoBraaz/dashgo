import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Francisco Braz</Text>
        <Text color="gray.500" fontSize="small">
          francisco_braaz@hotmail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Francisco Braz"
        src="https://github.com/FranciscoBraaz.png"
      />
    </Flex>
  );
}
