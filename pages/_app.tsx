import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/themes/mainThemeMUI";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Layout from "../src/components/layouts/mainLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
}
