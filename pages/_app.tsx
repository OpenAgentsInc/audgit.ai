import "../styles/globals.css"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { TooltipProvider } from "@radix-ui/react-tooltip"

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>AudGit</title>
        <link href="/favicon.svg" rel="icon" type="image/svg" />
      </Head>
      <TooltipProvider>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </TooltipProvider>
    </>
  );
}
