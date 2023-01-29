//modules
import Head from "next/head";

//MUI components
import Box from "@mui/material/Box";

//components
import MainTitle from "../home/mainTitle";

//types and interfaces
import { pageLayoutProps } from "../../ts/types/layouts.types";

export default function PageLayout({ children, headTitle }: pageLayoutProps) {
  return (
    <div>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}
