import { takeCategory, takeLimit, takePage, takeQuery, takeSort } from '../selectors/filter.selector';
import { useTypedSelector } from './useTypedSelector';

/**
 * Take every field from filter
 *
 * @returns every filter value
 */
export const useFilter = () => {
  const category = useTypedSelector(takeCategory);
  const query = useTypedSelector(takeQuery);
  const limit = useTypedSelector(takeLimit);
  const sort = useTypedSelector(takeSort);
  const page = useTypedSelector(takePage);

  return { category, query, limit, sort, page };
};
