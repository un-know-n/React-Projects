export const categories = [
  'all',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
] as const;

export const sorts = [
  { name: 'newest', sortProps: { title: 'id', order: 'asc' } },
  { name: 'oldest', sortProps: { title: 'id', order: 'desc' } },
  { name: 'high price', sortProps: { title: 'price', order: 'desc' } },
  { name: 'low price', sortProps: { title: 'price', order: 'asc' } },
  { name: 'from A to Z', sortProps: { title: 'title', order: 'asc' } },
  { name: 'from Z to A', sortProps: { title: 'title', order: 'desc' } },
] as const;

export const limit = 6;

export const defaultFilter = {
  sort: sorts[0],
  category: categories[0],
  query: '',
  limit: limit,
  page: 1,
};
