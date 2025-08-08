import { useEffect, useRef } from "react"
import * as d3 from "d3"

const GrokTaxonomyTree = ({ taxonomyData }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    const width = 1600
    const height = 1200
    const margin = { top: 20, right: 300, bottom: 20, left: 100 }

    // Create tree layout (horizontal)
    const tree = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right])
    const root = d3.hierarchy(taxonomyData)
    tree(root)

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Create SVG
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height).append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Draw links
    svg
      .selectAll(".link")
      .data(root.links())
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
      .attr("stroke", "#555")
      .attr("stroke-width", "1.5px")

    // Draw nodes
    const node = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d) => (d.data.isLeaf ? "#69b3a2" : "#999"))

    // Add text labels with multi-line support
    node
      .append("text")
      .attr("dy", (d) => (d.data.isLeaf ? 4 : -10))
      .attr("x", (d) => (d.data.isLeaf ? 10 : -10))
      .style("text-anchor", (d) => (d.data.isLeaf ? "start" : "end"))
      .style("font-size", "12px")
      .each(function (d) {
        const lines = d.data.name.split("\\\\")
        const text = d3.select(this)
        lines.forEach((line, i) => {
          text
            .append("tspan")
            .attr("x", d.data.isLeaf ? 10 : -10)
            .attr("dy", i === 0 ? 0 : 14)
            .text(line)
        })
      })
  }, [])

  return (
    <div style={{ overflow: "auto" }}>
      <h1>SurveyWithCode Taxonomy</h1>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default GrokTaxonomyTree
