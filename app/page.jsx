"use client"

import React, { useEffect, useState } from "react"
import HomePage from "./homepage.mdx"
import Body from "@/components/body"
import ForceGraph from "./ForceGraph"

export default function Page() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/data/flare-2.json")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (
    <Body>
      <main className="w-full min-w-0 px-2 md:px-4 pt-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
          <div className="xl:col-span-2 w-full px-2 md:px-4 xl:pl-20 xl:pr-8">
            <HomePage />
          </div>
          <div className="w-full xl:w-auto">
            <ForceGraph data={data} />
          </div>
        </div>
      </main>
    </Body>
  )
}
