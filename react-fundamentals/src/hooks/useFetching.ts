import { useState } from 'react';

type Return = [fetching: () => Promise<any>, isLoading: Boolean, error: string];

export const useFetching = (callback: () => void): Return => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};
