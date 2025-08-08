"use client"

import React, { useEffect, useState } from "react"
import TTSFlow from "./ttsflow.jsx"
import TTSFlowChart from "./ttsflow.jsx"

export const nodes = [
  { id: "Text", group: 1 },
  { id: "Linguistic Features", group: 1 },
  { id: "Acoustic Features", group: 2 },
  { id: "Mel-Spectrogram", group: 2 },
  { id: "Waveform", group: 3 },
  { id: "Character/Phoneme", group: 1 },
  { id: "Acoustic Model", group: 2 },
  { id: "Vocoder", group: 3 },
  { id: "Fully End-to-End", group: 4 },
]

export const links = [
  { source: "Text", target: "Linguistic Features" },
  { source: "Linguistic Features", target: "Acoustic Model" },
  { source: "Acoustic Model", target: "Mel-Spectrogram" },
  { source: "Mel-Spectrogram", target: "Vocoder" },
  { source: "Vocoder", target: "Waveform" },
  { source: "Character/Phoneme", target: "Acoustic Model" },
  { source: "Fully End-to-End", target: "Waveform" },
]

export default function Page() {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   fetch("/data/flare-2.json")
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  // }, [])

  return (
    <div className="w-full min-h-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Evaluation Result</h1> */}
      <TTSFlowChart />
    </div>
  )
}
