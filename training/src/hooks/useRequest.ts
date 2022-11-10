import { useEffect, useState } from 'react';

export const useRequest = (request: Function) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    request()
      .then((res: any) => setData(res))
      .catch((err: any) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return [data, error, loading];
};
