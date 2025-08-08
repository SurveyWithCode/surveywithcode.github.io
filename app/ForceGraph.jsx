"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export default function ForceGraph({ data }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!data) return

    const width = 928
    const height = 600

    // Remove old SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Build hierarchy
    const root = d3.hierarchy(data)
    const links = root.links()
    const nodes = root.descendants()

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY())

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("max-width", "100%")
      .style("height", "auto")

    // Draw links
    const link = svg.append("g").attr("stroke", "#999").attr("stroke-opacity", 0.6).selectAll("line").data(links).join("line")

    // Drag behavior
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }
      function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
      }
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }
      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
    }

    // Draw nodes
    const node = svg
      .append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", (d) => (d.children ? null : "#000"))
      .attr("stroke", (d) => (d.children ? null : "#fff"))
      .attr("r", 3.5)
      .call(drag(simulation))

    node.append("title").text((d) => d.data.name)

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
    })

    return () => simulation.stop()
  }, [data])

  return <svg ref={svgRef}></svg>
}
