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
      <main className="w-full min-w-0  px-2 pt-4">
        <div className="grid grid-cols-3 mt-4">
          <div className="col-span-2 w-full  pl-20 pr-8">
            <HomePage />
          </div>
          <ForceGraph data={data} />
        </div>
      </main>
    </Body>
  )
}
