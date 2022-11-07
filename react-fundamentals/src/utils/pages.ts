export const getTotalCount = (totalCount = 10, limit = 10) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages = 1) => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
