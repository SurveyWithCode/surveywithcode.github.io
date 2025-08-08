"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export default function TTSFlowChart({ nodes, links }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 800
    const height = 400

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg.append("g").attr("stroke", "#999").attr("stroke-opacity", 0.6).selectAll("line").data(links).join("line").attr("stroke-width", 2)

    const node = svg.append("g").selectAll("rect").data(nodes).join("g").call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))

    node
      .append("rect")
      .attr("width", 150)
      .attr("height", 40)
      .attr("x", -75)
      .attr("y", -20)
      .attr("rx", 6)
      .attr("fill", (d) => d3.schemeCategory10[d.group])

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "white")
      .style("font-size", "12px")
      .text((d) => d.id)

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)

      node.attr("transform", (d) => `translate(${d.x},${d.y})`)
    })

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
  }, [])

  return <svg ref={svgRef} width="100%" height="500" viewBox="0 0 800 400" style={{ background: "#1e1e1e" }} />
}
