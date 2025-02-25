// Next
import Head from "next/head";

export default function Header({ header }: { header?: string }) {
  const pageTitle = header ? `v3 | ${header}` : "v3";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="sup" />
        <meta name="keywords" content="Vercel, Portfolio, website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
        <link rel="icon" type="image/x-icon" href="/images/wife/crop.jpg" />
        <meta property="og:image" content="/images/wife/crop.jpg" />
      </Head>
    </>
  );
}
