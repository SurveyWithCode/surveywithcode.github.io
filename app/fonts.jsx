import localFont from "next/font/local";

export const SurveyWithCodeFonts = localFont({
  src: [
    {
      path: "/serif/SurveyWithCode-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/serif/SurveyWithCode-Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "/serif/SurveyWithCode-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "/serif/SurveyWithCode-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-survey-with-code",
  display: "swap",
})
