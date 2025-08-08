"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export default function IndentedTree({ data }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const width = 1200;
    const dx = 20; // vertical spacing between nodes
    const dy = 180; // horizontal spacing between levels

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().nodeSize([dx, dy]);
    treeLayout(root);

    d3.select(svgRef.current).selectAll("*").remove();

    // -dy / 3
    // -dx
    // width
    // dx * (root.height + 10)
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, dx * (600 + 10)])
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font", "10px Katex_Main");

    // Links
    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    // Nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    // Rectangle for each node
    node
      .append("rect")
      .attr("x", -40)
      .attr("y", -10)
      .attr("width", 80)
      .attr("height", 20)
      .attr("rx", 4)
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("stroke", "#333");

    // Text inside rectangle
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .text((d) => d.data.name);
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
