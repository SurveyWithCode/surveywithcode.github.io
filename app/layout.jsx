import "./globals.css"
// import "./index.css"
// import "../styles/custom.css"
import { ThemeProvider } from "next-themes"
import localFont from "next/font/local"
import Body from "@/components/body"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { AuthProvider } from "@/contexts/auth"
import ErrorBoundary from "@/components/ErrorBoundary"
// import { SurveyWithCodeFonts } from "./fonts"
// import { NextAuthProviders } from "@/components/auth/auth-provider"
// import { AuthProvider } from "@/contexts/auth"
// import { useThemeConfig } from "@/contexts/theme";

const surveyWithCodeFonts = localFont({
  src: [
    {
      path: "./../public/serif/SurveyWithCode-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../public/serif/SurveyWithCode-Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./../public/serif/SurveyWithCode-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../public/serif/SurveyWithCode-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-survey-with-code",
  display: "swap",
})

export const metadata = {
  title: "SurveyWithCode - From Research to Reproducibility",
  description:
    "SurveyWithCode is a curated platform that connects research survey papers with their corresponding implementations, codebases, and benchmarks. Designed for the AI and ML research community, it enables fast discovery of state-of-the-art summaries alongside practical code resources, accelerating understanding, comparison, and experimentation.",
  icons: {
    icon: "/favicon.ico", // for standard favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default async function RootLayout({ children }) {
  // const themeConfig = useThemeConfig()

  return (
    <html lang="en" suppressHydrationWarning dir="ltr" className={surveyWithCodeFonts.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico"></link>
        <meta
          name="description"
          content="SurveyWithCode is a curated platform that connects research survey papers with their corresponding implementations, codebases, and benchmarks. Designed for the AI and ML research community, it enables fast discovery of state-of-the-art summaries alongside practical code resources, accelerating understanding, comparison, and experimentation."
        />

        <meta name="author" content="Survey With Code" />

        <meta name="theme-color" content="#ffffff"></meta>
        <title>SurveyWithCode (代码综述) - From Research to Reproducibility</title>

        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
        <link rel="manifest" href="/site.webmanifest"></link>

        {/* <link rel="preload" href="/serif/SurveyWithCode-Bold.woff2" as="font" type="font/woff2"></link>
        <link rel="preload" href="/serif/SurveyWithCode-BoldItalic.woff2" as="font" type="font/woff2"></link>
        <link rel="preload" href="/serif/SurveyWithCode-Regular.woff2" as="font" type="font/woff2"></link>
        <link rel="preload" href="/serif/SurveyWithCode-Italic.woff2" as="font" type="font/woff2"></link> */}
      </head>
      <body className="nextra-banner-hidden">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <AuthProvider>
              <div dir="ltr">
                <Header />
                {children}
                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
