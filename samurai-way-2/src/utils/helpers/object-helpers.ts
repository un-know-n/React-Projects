export const updateObjectInArray = (
  items: any,
  compareValue: any,
  objPropName: any,
  newObjProps: any,
) => {
  return items.map((item: any) => {
    if (item[objPropName] === compareValue) return { ...item, ...newObjProps };
    return item;
  });
};
