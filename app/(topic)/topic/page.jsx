"use client"

import React, { useEffect, useState } from "react"

export default function Page() {
//   const [data, setData] = useState([])

//   useEffect(() => {
//     fetch("/data/flare-2.json")
//       .then((res) => res.json())
//       .then((data) => setData(data))
//   }, [])

  return (
    <div>
      <div className="mx-auto flex max-w-(--nextra-content-width)">
        <div className="max-xl:hidden h-0 w-64 shrink-0"></div>
        <aside
          id="_r_0_"
          className="nextra-sidebar print:hidden transition-all ease-in-out max-md:hidden flex flex-col h-[calc(100dvh-var(--nextra-navbar-height))] top-(--nextra-navbar-height) shrink-0 w-64 hidden"
        >
          <div className="p-4 overflow-y-auto nextra-scrollbar nextra-mask grow"></div>
          <div className="sticky bottom-0 bg-nextra-bg nextra-sidebar-footer border-t nextra-border flex items-center gap-2 py-4 mx-4">
            <button
              title="Change theme"
              className="cursor-pointer h-7 rounded-md px-2 text-xs font-medium transition-colors text-gray-600 dark:text-gray-400 flex items-center gap-2 grow"
              id="headlessui-listbox-button-_r_3_"
              type="button"
              aria-haspopup="listbox"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <svg fill="currentColor" viewBox="2 2 20 20" stroke="currentColor" height="12">
                <path strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              Dark
            </button>
            <button
              className="transition cursor-pointer rounded-md p-2 text-gray-600 dark:text-gray-400"
              aria-expanded="true"
              aria-controls="_r_0_"
              title="Collapse sidebar"
              type="button"
              data-headlessui-state=""
            >
              <svg viewBox="0 0 16 16" fill="currentColor" height="12" className="">
                <path d="M4.177 7.823l2.396-2.396A.25.25 0 017 5.604v4.792a.25.25 0 01-.427.177L4.177 8.177a.25.25 0 010-.354z"></path>
                <path
                  fillRule="evenodd"
                  d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25H9.5v-13H1.75zm12.5 13H11v-13h3.25a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25z"
                ></path>
              </svg>
            </button>
          </div>
        </aside>
        <nav className="nextra-toc order-last max-xl:hidden w-64 shrink-0 print:hidden" aria-label="table of contents"></nav>
        <article className="w-full min-w-0 break-words min-h-[calc(100vh-var(--nextra-navbar-height))] text-slate-700 dark:text-slate-200 pb-8 px-4 pt-4 md:px-12 nextra-body-typesetting-article">
          <div className="border inline-flex rounded-md items-stretch nextra-border float-end overflow-hidden">
            <button className="transition cursor-pointer ps-2 pe-1 flex gap-2 text-sm font-medium items-center" type="button" data-headlessui-state="">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16">
                <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"></path>
              </svg>
              Copy page
            </button>
            <button
              className="cursor-pointer h-7 rounded-md px-2 text-xs font-medium transition-colors text-gray-600 dark:text-gray-400 rounded-none"
              id="headlessui-listbox-button-_r_9_"
              type="button"
              aria-haspopup="listbox"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" width="12" className="rotate-90">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
          <div id="nextra-skip-nav"></div>
          <main data-pagefind-body="true">
            <h1 className="tracking-tight dark:text-slate-100 font-bold mt-2 text-4xl">Blog</h1>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold">Nextra 4</h3>
              <p className="my-6 leading-7 opacity-80">
                App Router support, Turbopack support, compiled by React Compiler, new Rust-powered search Pagefind, RSC i18n, server/client components, smallest bundle size EVER
                for a Nextra-powered website, GitHub Alert Syntax, new _meta.global file and more.{" "}
                <a
                  href="https://the-guild.dev/blog/nextra-4?utm_source=nextra.site&amp;utm_campaign=blog_page&amp;utm_content=blog_link"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-visible:nextra-focus text-primary-600 underline hover:no-underline decoration-from-font [text-underline-position:from-font]"
                >
                  Read more&nbsp;
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                    height="1em"
                    className="inline align-baseline shrink-0"
                  >
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </a>
              </p>
              <time dateTime="2024-01-13T00:00:00.000Z" className="text-sm opacity-50">
                January 13, 2024
              </time>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold">Nextra 3 – Your Favourite MDX Framework, Now on 🧪 Steroids</h3>
              <p className="my-6 leading-7 opacity-80">
                MDX 3, new i18n, new _meta files with JSX support, more powerful TOC, remote MDX, better bundle size, MathJax, new code block styles, shikiji, ESM-only and more.{" "}
                <a
                  href="https://the-guild.dev/blog/nextra-3?utm_source=nextra.site&amp;utm_campaign=blog_page&amp;utm_content=blog_link"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-visible:nextra-focus text-primary-600 underline hover:no-underline decoration-from-font [text-underline-position:from-font]"
                >
                  Read more&nbsp;
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                    height="1em"
                    className="inline align-baseline shrink-0"
                  >
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </a>
              </p>
              <time dateTime="2023-12-12T00:00:00.000Z" className="text-sm opacity-50">
                December 12, 2023
              </time>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold">Nextra 2 – Next.js Static Site Generator</h3>
              <p className="my-6 leading-7 opacity-80">
                Here are what the new version of Nextra 2 Framework includes.{" "}
                <a
                  href="https://the-guild.dev/blog/nextra-2?utm_source=nextra.site&amp;utm_campaign=blog_page&amp;utm_content=blog_link"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-visible:nextra-focus text-primary-600 underline hover:no-underline decoration-from-font [text-underline-position:from-font]"
                >
                  Read more&nbsp;
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                    height="1em"
                    className="inline align-baseline shrink-0"
                  >
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </a>
              </p>
              <time dateTime="2023-01-24T00:00:00.000Z" className="text-sm opacity-50">
                January 24, 2023
              </time>
            </div>
          </main>
          <div className="mt-12 mb-8 text-xs text-gray-600 text-end dark:text-gray-400">
            Last updated on <time dateTime="2025-07-28T14:57:51.000Z">July 28, 2025</time>
          </div>
        </article>
      </div>
    </div>
  )
}
