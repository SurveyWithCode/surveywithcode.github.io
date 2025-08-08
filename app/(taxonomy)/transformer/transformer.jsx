
import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

export default function SurveyTaxonomyTree({ width = 1200, height = 1200, taxonomyData }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    d3.select(ref.current).selectAll("*").remove()

    const svg = d3.select(ref.current).attr("viewBox", [0, 0, width, height]).style("font", "12px")

    const g = svg.append("g").attr("transform", `translate(40, ${height / 2})`)

    const root = d3.hierarchy(taxonomyData)
    root.x0 = height / 2
    root.y0 = 0

    const treeLayout = d3.tree().nodeSize([30, 220]) // vertical, horizontal spacing
    treeLayout(root)

    root.each((d) => {
      d._x = d.x - height / 2 // center vertically
      d._y = d.y
    })

    // Draw links
    g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", (d) => {
        const src = { x: d.source._x, y: d.source._y }
        const tgt = { x: d.target._x, y: d.target._y }
        return `M${src.y},${src.x}C${(src.y + tgt.y) / 2},${src.x} ${(src.y + tgt.y) / 2},${tgt.x} ${tgt.y},${tgt.x}`
      })

    const node = g
      .append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d._y},${d._x})`)

    const calcRect = (text, level) => {
      const maxWidth = level === 1 ? 140 : level === 2 ? 180 : 220
      const approx = Math.min(maxWidth, Math.max(60, text.length * 6))
      const lines = wrapText(text, Math.floor(approx / 6))
      return { w: approx + 16, h: lines.length * 14 + 12, lines }
    }

    function wrapText(text, maxChars) {
      if (!text) return [""]
      const words = text.split(/[ ,]+/)
      const lines = []
      let cur = ""
      for (const w of words) {
        if ((cur + " " + w).trim().length <= maxChars) cur = (cur + " " + w).trim()
        else {
          lines.push(cur)
          cur = w
        }
      }
      if (cur) lines.push(cur)
      return lines
    }

    // Rectangles
    node
      .append("rect")
      .attr("x", (d) => {
        const { w } = calcRect(d.data.name, d.depth)
        return -w / 2 // center horizontally
      })
      .attr("y", (d) => {
        const { h } = calcRect(d.data.name, d.depth)
        return -h / 2 // center vertically
      })
      .attr("width", (d) => calcRect(d.data.name, d.depth).w)
      .attr("height", (d) => calcRect(d.data.name, d.depth).h)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", "#fff")
      .attr("stroke", "#333")
      .attr("stroke-width", (d) => (d.depth === 0 ? 1.5 : 1))

    // Text centered inside rectangles
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", (d) => {
        const { h, lines } = calcRect(d.data.name, d.depth)
        // vertical center minus half total text height, adjusted for first line dy
        return -h / 2 + 14 / 2
      })
      .each(function (d) {
        const { lines } = calcRect(d.data.name, d.depth)
        const textEl = d3.select(this)
        for (let i = 0; i < lines.length; i++) {
          textEl
            .append("tspan")
            .attr("x", 0) // keep centered
            .attr("dy", i === 0 ? 0 : "1.1em")
            .text(lines[i].replace(/\s+/g, " "))
        }
      })
      .attr("fill", "#111")
      .style("font-size", (d) => (d.depth === 1 ? "11px" : d.depth === 2 ? "10px" : "9px"))

    // Zoom + pan
    svg.call(
      d3.zoom().on("zoom", (event) => {
        g.attr("transform", event.transform)
      })
    )

    // Optional collapse/expand (same as before) ...
  }, [width, height, taxonomyData])

  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <svg ref={ref} width={width} height={height} />
    </div>
  )
}
