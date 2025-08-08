"use client"

import React, { useEffect, useState } from "react"
import IndentedTree from "./indentedtree.jsx"

export default function Page() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/data/flare-2.json")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (
    <div className="w-full min-h-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* <h1 className="mt-2 text-4xl font-bold tracking-tight dark:text-slate-100">Evaluation Result</h1> */}
      <IndentedTree data={data} />
    </div>
  )
}
