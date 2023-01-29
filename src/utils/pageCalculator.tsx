import { pagination } from "../ts/types/info.types";

export default function pageCalculator(paginationInfo: pagination) {
  switch (true) {
    case paginationInfo.prev !== undefined:
      if (paginationInfo.prev) return paginationInfo.prev + 1;
      break;

    case paginationInfo.next !== undefined:
      if (paginationInfo.next) return paginationInfo.next - 1;
      break;

    default:
      return 1;
  }
  return 1;
}
