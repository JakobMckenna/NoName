import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <html data-theme="lofi" lang="en">
      <Component {...pageProps} />
    </html>
  );
};

export default MyApp;
