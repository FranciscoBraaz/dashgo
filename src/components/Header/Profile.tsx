import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Francisco Braz</Text>
          <Text color="gray.500" fontSize="small">
            francisco_braaz@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Francisco Braz"
        src="https://github.com/FranciscoBraaz.png"
        width="40px"
        height="40px"
      />
    </Flex>
  );
}
