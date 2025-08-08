import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function MenuHeader() {
  return (
    <div className="flex gap-4 overflow-x-auto nextra-scrollbar py-1.5 max-md:hidden">
      <a
        className="focus-visible:nextra-focus text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 ring-inset transition-colors aria-[current]:font-medium aria-[current]:subpixel-antialiased aria-[current]:text-current"
        href="/docs"
      >
        Documentation
      </a>
      {/* <a
        className="focus-visible:nextra-focus text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 ring-inset transition-colors aria-[current]:font-medium aria-[current]:subpixel-antialiased aria-[current]:text-current"
        href="/api"
        aria-current="true"
      >
        <span className="badge-new">API</span>
      </a>
      <button
        className="text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 ring-inset transition-colors items-center flex gap-1.5 cursor-pointer"
        id="headlessui-menu-button-_R_3md7lb_"
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
        data-headlessui-state=""
      >
        Versions
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" height="14" className="*:origin-center *:transition-transform *:rotate-90">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button> */}
      <a
        className="focus-visible:nextra-focus text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 ring-inset transition-colors aria-[current]:font-medium aria-[current]:subpixel-antialiased aria-[current]:text-current"
        href="/blog"
      >
        Blog
      </a>
      <a
        className="focus-visible:nextra-focus text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 ring-inset transition-colors aria-[current]:font-medium aria-[current]:subpixel-antialiased aria-[current]:text-current"
        href="/about"
      >
        About
      </a>
      <a
        className="focus-visible:nextra-focus text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 ring-inset transition-colors aria-[current]:font-medium aria-[current]:subpixel-antialiased aria-[current]:text-current"
        href="/showcase"
      >
        Showcase
      </a>
      <a
        className="focus-visible:nextra-focus text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100 whitespace-nowrap text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 ring-inset transition-colors aria-[current]:font-medium aria-[current]:subpixel-antialiased aria-[current]:text-current"
        href="/sponsors"
      >
        Sponsors
      </a>
    </div>
  )
}
