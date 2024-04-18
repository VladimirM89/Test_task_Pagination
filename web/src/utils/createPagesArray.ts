import { PAGES_RANGE } from "@/constants/constants";

const createPagesArray = (currentPage: number, totalPages: number): Array<number> => {
  let array: Array<number> = [];

  const minLimit = Math.trunc(PAGES_RANGE / 2);

  if (currentPage <= minLimit) {
    for (let i = 1; i <= PAGES_RANGE; i++) {
      array.push(i);
    }
    return array;
  }

  if (currentPage >= totalPages - minLimit) {
    for (let i = totalPages; i > totalPages - PAGES_RANGE; i--) {
      array.unshift(i);
    }
    return array;
  }

  for (let i = currentPage - minLimit; i <= currentPage + minLimit; i++) {
    array.push(i);
  }

  return array;
}

export default createPagesArray;
