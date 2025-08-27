import { QueryClient } from '@tanstack/react-query';

// Function to create a new QueryClient instance
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Avoid refetching fresh data that was just fetched on the server
        staleTime: 1000 * 20, // 20 seconds
        // Keep data in the cache for a while
        gcTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });
}
