import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

export default function SurveyTaxonomyTree({ height = 800, taxonomyData }) {
  const ref = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!ref.current || !containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const width = containerWidth

    d3.select(ref.current).selectAll("*").remove()

    const svg = d3.select(ref.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", height)
      .style("font", "12px")

    const g = svg.append("g").attr("transform", `translate(60, ${height / 2})`)

    let i = 0
    const duration = 750

    const root = d3.hierarchy(taxonomyData)
    root.x0 = height / 2
    root.y0 = 0

    // Initialize the tree with all nodes expanded
    // Remove the collapse initialization - all nodes will be expanded by default
    console.log('Tree initialized with nodes:', root.descendants().length)
    
    function collapse(d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    const calcRect = (text, level) => {
      const maxWidth = level === 1 ? 140 : level === 2 ? 180 : 220
      const approx = Math.min(maxWidth, Math.max(60, text.length * 6))
      const lines = wrapText(text, Math.floor(approx / 6))
      const fontSize = level === 1 ? 11 : level === 2 ? 10 : 9
      const lineHeight = fontSize * 1.1 // TikZ-style tighter spacing
      const padding = 16
      
      // TikZ-style height calculation: account for actual text metrics
      const textHeight = lines.length === 1 
        ? fontSize + 4 // Single line with some breathing room
        : fontSize + (lines.length - 1) * lineHeight + 4 // Multi-line with proper spacing
      
      return { 
        w: approx + padding, 
        h: textHeight + padding, 
        lines 
      }
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

    function update(source) {
      const treeLayout = d3.tree().nodeSize([30, 180]) // Adjust spacing
      const treeData = treeLayout(root)

      const nodes = treeData.descendants()
      const links = treeData.links()

      // Normalize for fixed-depth and adjust positioning
      nodes.forEach((d) => {
        d._x = d.x - height / 2 // center vertically
        // Custom positioning for each level
        switch (d.depth) {
          case 0:
            d._y = 0 // Root at origin
            break
          case 1:
            d._y = 140 // First level close to root
            break
          case 2:
            d._y = 300 // Second level
            break
          case 3:
            d._y = 480 // Third level
            break
          default:
            d._y = 480 + (d.depth - 3) * 180 // Deeper levels
        }
      })

      // Update the nodes
      const node = g.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i))

      // Enter any new nodes at the parent's previous position
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .style("cursor", (d) => (d._children ? "pointer" : "default"))
        .on("click", (event, d) => {
          if (d.children) {
            d._children = d.children
            d.children = null
          } else {
            d.children = d._children
            d._children = null
          }
          update(d)
        })

      // Add rectangles for the nodes
      nodeEnter
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

      // Add text to the nodes
      nodeEnter
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle") // This ensures vertical centering like TikZ
        .attr("x", 0)
        .attr("y", 0)
        .each(function (d) {
          const { lines } = calcRect(d.data.name, d.depth)
          const textEl = d3.select(this)
          const fontSize = d.depth === 1 ? 11 : d.depth === 2 ? 10 : 9
          const lineHeight = fontSize * 1.1 // Slightly tighter line spacing like TikZ

          // Calculate vertical centering like TikZ: center the entire text block
          const totalLines = lines.length
          const blockHeight = (totalLines - 1) * lineHeight
          const startOffset = -blockHeight / 2

          for (let i = 0; i < lines.length; i++) {
            textEl
              .append("tspan")
              .attr("x", 0)
              .attr("dy", i === 0 ? `${startOffset}px` : `${lineHeight}px`)
              .text(lines[i].replace(/\s+/g, " "))
          }
        })
        .attr("fill", "#111")
        .style("font-size", (d) => (d.depth === 1 ? "11px" : d.depth === 2 ? "10px" : "9px"))

      // Add expand/collapse indicator
      nodeEnter
        .append("circle")
        .attr("r", 3)
        .attr("cx", (d) => {
          const { w } = calcRect(d.data.name, d.depth)
          return w / 2 - 8
        })
        .attr("cy", (d) => {
          const { h } = calcRect(d.data.name, d.depth)
          return -h / 2 + 8
        })
        .attr("fill", (d) => (d._children ? "#lightblue" : "transparent"))
        .attr("stroke", (d) => (d._children ? "#333" : "transparent"))
        .style("cursor", "pointer")

      nodeEnter
        .append("text")
        .attr("x", (d) => {
          const { w } = calcRect(d.data.name, d.depth)
          return w / 2 - 8
        })
        .attr("y", (d) => {
          const { h } = calcRect(d.data.name, d.depth)
          return -h / 2 + 8
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("cursor", "pointer")
        .text((d) => (d._children ? "+" : ""))

      // Transition nodes to their new position
      const nodeUpdate = nodeEnter.merge(node)

      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${d._y},${d._x})`)

      nodeUpdate
        .select("circle")
        .attr("fill", (d) => (d._children ? "#lightblue" : "transparent"))
        .attr("stroke", (d) => (d._children ? "#333" : "transparent"))

      nodeUpdate
        .select("text:last-child")
        .text((d) => (d._children ? "+" : ""))

      // Transition exiting nodes to the parent's new position
      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${source._y},${source._x})`)
        .remove()

      // Update the links
      const link = g.selectAll("path.link").data(links, (d) => d.target.id)

      // Enter any new links at the parent's previous position
      const linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("d", (d) => {
          const o = { x: source.x0, y: source.y0 }
          // Use straight lines for ALL connections
          return `M${o.y},${o.x}L${o.y},${o.x}` // Always straight line
        })

      // Transition links to their new position
      linkEnter.merge(link)
        .transition()
        .duration(duration)
        .attr("d", (d) => {
          const src = { x: d.source._x, y: d.source._y }
          const tgt = { x: d.target._x, y: d.target._y }
          
          // Use straight lines for ALL connections - no curves
          return `M${src.y},${src.x}L${tgt.y},${tgt.x}` // Always straight line
        })

      // Transition exiting links to the parent's new position
      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", (d) => {
          const o = { x: source._x, y: source._y }
          // Use straight lines for ALL connections
          return `M${o.y},${o.x}L${o.y},${o.x}` // Always straight line
        })
        .remove()

      // Store the old positions for transition
      nodes.forEach((d) => {
        d.x0 = d._x
        d.y0 = d._y
      })
    }

    function diagonal(s, d) {
      return `M${s.y},${s.x}C${(s.y + d.y) / 2},${s.x} ${(s.y + d.y) / 2},${d.x} ${d.y},${d.x}`
    }

    // Initialize the display
    update(root)

    // Zoom + pan
    svg.call(
      d3.zoom().on("zoom", (event) => {
        g.attr("transform", event.transform)
      })
    )

    // Add resize listener
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth
        svg.attr("viewBox", [0, 0, newWidth, height])
      }
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [height, taxonomyData])

  return (
    <div ref={containerRef} style={{ width: "100%", overflow: "auto" }}>
      <svg ref={ref} />
    </div>
  )
}
