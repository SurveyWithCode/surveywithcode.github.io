import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function SearchBar() {
  return (
    <div className="max-md:hidden px-2 sm:px-4 lg:px-16">
      <div className="swr-search relative flex items-center text-gray-900 dark:text-gray-300 contrast-more:text-gray-800 contrast-more:dark:text-gray-300">
        <input
          spellCheck="false"
          autoComplete="off"
          className="rounded-lg px-3 py-2 transition-all w-full md:w-64 lg:w-96 text-base leading-tight md:text-sm bg-black/[.05] dark:bg-gray-50/10 placeholder:text-gray-600 dark:placeholder:text-gray-400 contrast-more:border contrast-more:border-current [&amp;::-webkit-search-cancel-button]:appearance-none"
          placeholder="Search"
          role="combobox"
          type="search"
          aria-expanded="false"
          aria-autocomplete="list"
          data-headlessui-state=""
          // value=""
        />
        <kbd className="absolute my-1.5 select-none pointer-events-none end-1.5 transition-all h-5 rounded bg-swr-bg px-1.5 font-mono text-[11px] font-medium text-gray-600 dark:text-gray-400 border swr-border contrast-more:text-current items-center gap-1 flex max-sm:hidden not-prose">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  )
}
