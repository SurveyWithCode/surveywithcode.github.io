// /components/TaxonomyTree.js
import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const TaxonomyTree = ({ data }) => {
  const svgRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    const container = containerRef.current
    const svg = d3.select(svgRef.current)
    const width = container.clientWidth
    const height = Math.max(container.clientHeight, 1200) // Ensure enough vertical space

    // Clear previous content
    svg.selectAll("*").remove()

    // Create zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
      })

    svg.call(zoom)

    const g = svg.append("g")

    // Create hierarchy and tree layout
    const root = d3.hierarchy(data)
    const treeLayout = d3
      .tree()
      .size([height - 100, width - 200])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2))

    treeLayout(root)

    // Create links
    const links = root.links()
    g.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      )
      .attr("fill", "none")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)

    // Create nodes
    const nodes = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)

    // Add node circles
    nodes
      .append("circle")
      .attr("r", 4)
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)

    // Add node labels with text wrapping
    nodes
      .append("text")
      .attr("x", (d) => (d.children ? -10 : 10))
      .attr("dy", 3)
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .style("font-size", (d) => {
        if (d.depth === 0) return "14px"
        if (d.depth === 1) return "12px"
        if (d.depth === 2) return "11px"
        return "10px"
      })
      .style("font-weight", (d) => (d.depth <= 1 ? "bold" : "normal"))
      .each(function (d) {
        const text = d3.select(this)
        const words = d.data.name.split(/[\s,]+/)
        let line = []
        let lineNumber = 0
        const lineHeight = 14
        const y = text.attr("y")
        const dy = parseFloat(text.attr("dy"))
        let tspan = text
          .text(null)
          .append("tspan")
          .attr("x", d.children ? -10 : 10)
          .attr("dy", dy + "em")

        for (let word of words) {
          line.push(word)
          tspan.text(line.join(" "))

          if (tspan.node().getComputedTextLength() > (d.depth === 3 ? 200 : 150) && line.length > 1 && d.depth > 2) {
            line.pop()
            tspan.text(line.join(" "))
            line = [word]
            tspan = text
              .append("tspan")
              .attr("x", d.children ? -10 : 10)
              .attr("dy", ++lineNumber * lineHeight + "px")
              .text(word)
          }
        }
      })

    // Add tooltips for leaf nodes
    nodes
      .filter((d) => !d.children)
      .append("title")
      .text((d) => d.data.name)

    // Center the root node
    const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.9)

    svg.call(zoom.transform, initialTransform)
  }, [data])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}

export default TaxonomyTree
