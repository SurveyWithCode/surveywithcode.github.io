"use client"

import React, { useEffect, useState } from "react"
import Taxonomy from "./toxonomy"

export default function Page() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/data/flare-2.json")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (
    <div>
      <h1 className="mt-2 text-4xl font-bold tracking-tight dark:text-slate-100">Evaluation Result (This page could be change)</h1>
      <Taxonomy data={data} />
    </div>
  )
}
