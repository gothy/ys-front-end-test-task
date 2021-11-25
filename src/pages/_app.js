import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import theme from '../theme';

const queryClient = new QueryClient({
  retry: 0,
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
