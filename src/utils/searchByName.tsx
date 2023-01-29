import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export function searchByName(
  setTitle: Dispatch<SetStateAction<string>>,
  name: string,
  label: string,
  router: NextRouter
): void {
  setTitle(name != "" ? `Searching ${label.toLowerCase()}: ${name}...` : label);
  router.push({
    pathname: router.pathname,
    query: { ...router.query, name: name, page: 1 },
  });
}
