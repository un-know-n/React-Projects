import { takeCategory, takeLimit, takePage, takeQuery, takeSort } from '../selectors/filter.selector';
import { useTypedSelector } from './useTypedSelector';

export const useFilter = () => {
  const category = useTypedSelector(takeCategory);
  const query = useTypedSelector(takeQuery);
  const limit = useTypedSelector(takeLimit);
  const sort = useTypedSelector(takeSort);
  const page = useTypedSelector(takePage);

  return { category, query, limit, sort, page };
};
