import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { makeServer } from '../services/mirage';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { ProtectRoute } from '../components/ProtectedRoute';

// if (process.env.NODE_ENV === 'development') {

// }

makeServer();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <ProtectRoute> */}
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
        {/* </ProtectRoute> */}
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
