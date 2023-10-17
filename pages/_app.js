import '@/styles/globals.css'
import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp