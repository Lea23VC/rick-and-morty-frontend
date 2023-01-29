import Stack from "@mui/material/Stack";
import { paginationInfo } from "../../ts/types/info.types";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";
import { useRouter as UseRouter } from "next/router";
//styled MUI components
import { StyledPagination as Pagination } from "../styledMuiComponents/StyledPagination";

//utils
import pageCalculator from "../../utils/pageCalculator";

export default function paginationFunction({ info }: paginationInfo) {
  const router = UseRouter();
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Pagination
        count={info.pages}
        color="primary"
        defaultPage={1}
        page={pageCalculator(info)}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={{
              pathname: router.pathname,
              query: { ...router.query, page: item.page },
            }}
            scroll={false}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
