import type { DehydratedState } from '@tanstack/react-query';
import merge from 'deepmerge';
import { useMatches } from 'react-router';

function isDehydratedState(data: unknown): data is DehydratedState {
  return (
    typeof data === 'object' &&
    data !== null &&
    'mutations' in data &&
    'queries' in data
  );
}

const useDehydratedState = (): DehydratedState => {
  const matches = useMatches();

  const dehydratedStates = matches
    .map(
      (match) => (match.data as { dehydratedState?: unknown })?.dehydratedState,
    )
    .filter(isDehydratedState);

  return dehydratedStates.reduce(
    (accumulator, currentValue) => merge(accumulator, currentValue),
    {} as DehydratedState,
  );
};

export { useDehydratedState };
