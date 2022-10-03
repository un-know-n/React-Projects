export const updateObjectInArray = (
  items,
  compareValue,
  objPropName,
  newObjProps,
) => {
  return items.map((item) => {
    if (item[objPropName] === compareValue) return { ...item, ...newObjProps };
    return item;
  });
  // ...state,
  //   usersData: state.usersData.map((user) => {
  //   if (user.id === action.userId) return { ...user, followed: true };
  //   return user;
  // }),
};