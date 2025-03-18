export const orderByFormat = (
  orderBy: string[],
  name: string,
): 'asc' | 'desc' | undefined => {
  if (orderBy) {
    const order = orderBy.find(
      (order) => order === name || order === `-${name}`,
    );
    if (order) {
      return order === name ? 'asc' : 'desc';
    }
  }
  return undefined;
};
