import { Html, Head, Main, NextScript } from "next/document";
import Layout from "~/components/Layout";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Layout>
          <Main />
        </Layout>
        <NextScript />
      </body>
    </Html>
  );
}
