"use client"

import React, { useEffect, useState } from "react"
import SurveyTaxonomyTree from "./transformer"
import TaxonomyDiagram from "./deepseekdiagram"
import TaxonomyTree from "./qwendiagram"
import GrokTaxonomyTree from "./grokdiagram"

// const taxonomyData = {
//   name: "X-formers",
//   children: [
//     {
//       name: "Module Level",
//       children: [
//         {
//           name: "Attention",
//           children: [
//             {
//               name: "Sparse",
//               children: [
//                 {
//                   leaf: true,
//                   width: 300,
//                   height: 60,
//                   content: "Star-Transformer[1], Longformer[2], ETC[3], BigBird[4], Sparse Transformer[5]...",
//                 },
//                 // Add other leaf nodes similarly
//               ],
//             },
//             // Add other categories
//           ],
//         },
//         // Add other sub-categories
//       ],
//     },
//     // Add other top-level categories (Arch. Level, Pre-Train, App.)
//   ],
// }
const taxonomyData = {
  name: "X-formers",
  children: [
    {
      name: "Module Level",
      children: [
        {
          name: "Attention",
          children: [
            {
              name: "Sparse",
              children: [
                { name: "Star-Transformer, Longformer, ETC, BigBird, Sparse Transformer, BP-Transformer, Image Transformer, Axial Transformer" },
                { name: "Routing Transformer, Reformer, SAC, Sparse Sinkhorn Attention" },
              ],
            },
            { name: "Linearized", children: [{ name: "Linear Transformer, Performer, RFA, Delta Net" }] },
            { name: "Prototype", children: [{ name: "Clustered Attention, Informer" }] },
            { name: "Memory / Compress", children: [{ name: "MCA, Set Transformer, Linformer" }] },
            { name: "Low-rank", children: [{ name: "Low-rank Attention, CSALR, Nyströmformer" }] },
            {
              name: "Prior Attention",
              children: [
                { name: "Local Transformer, Gaussian Transformer" },
                { name: "Predictive Attention Transformer, Realformer, Lazyformer" },
                { name: "CAMTL" },
                { name: "Average Attention, Hard-Coded Gaussian Attention, Synthesizer" },
              ],
            },
            {
              name: "Multi-head",
              children: [
                { name: "Disagreement regularization, Guiding attention, Talking-head Attention, Collaborative MHA" },
                { name: "Adaptive Attention Span, Multi-Scale Transformer" },
                { name: "Dynamic Routing" },
              ],
            },
          ],
        },
        {
          name: "Position Encoding",
          children: [
            { name: "Absolute", children: [{ name: "BERT, PE on BERT, FLOATER" }] },
            { name: "Relative", children: [{ name: "Shaw relative, Music Transformer, T5, Transformer-XL, DeBERTa" }] },
            { name: "Other Rep.", children: [{ name: "TUPE, Roformer" }] },
            { name: "Implicit Rep.", children: [{ name: "Complex Embedding, R-Transformer, CPE" }] },
          ],
        },
        {
          name: "LayerNorm",
          children: [
            { name: "Placement", children: [{ name: "post-LN, pre-LN" }] },
            { name: "Substitutes", children: [{ name: "AdaNorm, scaled l2 normalization, PowerNorm" }] },
            { name: "Norm-free", children: [{ name: "ReZero-Transformer" }] },
          ],
        },
        {
          name: "FFN",
          children: [
            { name: "Activ. Func.", children: [{ name: "Swish, GELU, GLU" }] },
            { name: "Enlarge Capacity", children: [{ name: "Product-key Memory, Gshard, Switch Transformer, Expert Prototyping, Hash Layer" }] },
            { name: "Dropping", children: [{ name: "All-Attention layer, other dropping approaches" }] },
          ],
        },
      ],
    },
    {
      name: "Arch. Level",
      children: [
        { name: "Lightweight", children: [{ name: "Lite Transformer, Funnel Transformer, DeLighT" }] },
        { name: "Connectivity", children: [{ name: "Realformer, Predictive Attention Transformer, Transparent Attention, Feedback Transformer" }] },
        { name: "ACT", children: [{ name: "UT, CCTransformer, DeeBERT, PABEE, early exiting methods" }] },
        {
          name: "Divide & Conquer",
          children: [
            { name: "Recurrence", children: [{ name: "Transformer-XL, Compressive Transformer, Memformer, ERNIE-Doc" }] },
            { name: "Hierarchy", children: [{ name: "HiBERT, hierarchical approaches, Hi-Transformer, TENER, TNT" }] },
          ],
        },
        { name: "Alt. Arch.", children: [{ name: "ET, Macaron, Sandwich, MAN, DARTSformer" }] },
      ],
    },
    {
      name: "Pre-Train",
      children: [
        { name: "Encoder", children: [{ name: "BERT, RoBERTa, BigBird" }] },
        { name: "Decoder", children: [{ name: "GPT, GPT-2, GPT-3" }] },
        { name: "Enc.Dec.", children: [{ name: "BART, T5, Switch Transformer" }] },
      ],
    },
    {
      name: "App.",
      children: [
        { name: "NLP", children: [{ name: "BERT, ET, Transformer-XL, Compressive Transformer, TENER" }] },
        { name: "CV", children: [{ name: "Image Transformer, DETR, ViT, Swin, ViViT" }] },
        { name: "Audio", children: [{ name: "Speech Transformer, Streaming Transformer, Reformer-TTS, Music Transformer" }] },
        { name: "Multimodal", children: [{ name: "VisualBERT, VLBERT, VideoBERT, M6, Chimera, DALL-E, CogView" }] },
      ],
    },
  ],
}

export default function Page() {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   fetch("/data/flare-2.json")
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  // }, [])

  return (
    <div>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Evaluation</h1>
      <SurveyTaxonomyTree height={800} taxonomyData={taxonomyData} />
      {/* <TaxonomyDiagram data={taxonomyData} /> */}
      {/* <TaxonomyTree data={taxonomyData} /> */}
      {/* <GrokTaxonomyTree taxonomyData={taxonomyData} /> */}
    </div>
  )
}
