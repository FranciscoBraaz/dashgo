import { Box, BoxProps, Stack, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface NavSectionProps extends BoxProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children, ...rest }: NavSectionProps) {
  return (
    <Box {...rest}>
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
