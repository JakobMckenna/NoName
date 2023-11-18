import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <html data-theme="garden" lang="en">
      <Component {...pageProps} />
  </html>
  );
};

export default MyApp;
