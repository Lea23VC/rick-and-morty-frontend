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
    <div className="bg-main bg-cover">
      <Head>
        <title>{headTitle}</title>
      </Head>
      <main className="min-h-screen max-w-screen-lg m-auto">
        <Box className="py-32">
          <MainTitle />
          {children}
        </Box>
      </main>
    </div>
  );
}
