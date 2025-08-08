"use client"

import React, { useEffect, useState } from "react"
import Tree from "./tree"

export default function Page() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/data/flare-2.json")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (
    <div>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Evaluation Result</h1>
      <Tree data={data} />
    </div>
  )
}
