import { useState as UseState, useEffect as UseEffect } from "react";
import { useRouter as UseRouter } from "next/router";

export function useCurrentPage() {
  const router = UseRouter();
  const [page, setPage] = UseState(router.query.page ?? 1);

  UseEffect(() => {
    if (router.isReady && router.query.page) {
      setPage(router.query.page);
    } else return;
  }, [router.query]);

  return [page];
}
