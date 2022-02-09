import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { userData } = useAuth();
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{userData?.name}</Text>
          <Text color="gray.500" fontSize="small">
            {userData?.email ?? 'Email privado'}
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name={userData?.name}
        src={userData?.avatar ?? ''}
        width="40px"
        height="40px"
      />
    </Flex>
  );
}
