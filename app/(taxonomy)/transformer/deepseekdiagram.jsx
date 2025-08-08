import { useRef, useEffect } from "react"
import * as d3 from "d3"

const TaxonomyDiagram = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || !svgRef.current) return

    // Setup dimensions and margins
    const width = 1200
    const height = 800
    const margin = { top: 20, right: 200, bottom: 20, left: 50 }

    // Clear previous SVG content
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Create main SVG group
    const g = svg.attr("width", width).attr("height", height).append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Create hierarchy from data
    const root = d3.hierarchy(data)
    const treeWidth = width - margin.left - margin.right
    const treeHeight = height - margin.top - margin.bottom

    // Create tree layout (right-to-left orientation)
    const tree = d3.tree().size([treeHeight, treeWidth]).nodeSize([60, 180])(root)

    // Draw links (reverse direction)
    const links = g
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => treeWidth - d.y)
          .y((d) => d.x)
      )
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)

    // Create node groups
    const nodes = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", (d) => `node ${d.children ? "node--internal" : "node--leaf"}`)
      .attr("transform", (d) => `translate(${treeWidth - d.y},${d.x})`)

    // Add circles to nodes
    nodes
      .append("circle")
      .attr("r", 4)
      .attr("fill", (d) => (d.depth === 0 ? "#555" : d.depth === 1 ? "#888" : d.depth === 2 ? "#aaa" : "#ccc"))

    // Add text labels
    nodes
      .append("text")
      .attr("dy", (d) => (d.children ? -12 : 12))
      .attr("dx", (d) => (d.children ? -6 : 6))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .style("font-size", (d) => {
        if (d.depth === 0) return "16px"
        if (d.depth === 1) return "12px"
        return "10px"
      })
      .style("fill", "#333")

    // Add detailed leaf content
    nodes
      .filter((d) => d.data.leaf)
      .append("foreignObject")
      .attr("width", (d) => d.data.width || 200)
      .attr("height", (d) => d.data.height || 100)
      .attr("x", 10)
      .attr("y", -10)
      .html(
        (d) => `
        <div style="
          font-size: 9px;
          line-height: 1.2;
          padding: 4px;
          background: #f8f8f8;
          border-radius: 4px;
          border: 1px solid #eee;
        ">
          ${d.data.content}
        </div>
      `
      )
  }, [data])

  return <svg ref={svgRef} style={{ display: "block", margin: "0 auto" }} />
}

export default TaxonomyDiagram
