import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TTSFlowChart = () => {
  const svgRef = useRef();
  const [selectedPipeline, setSelectedPipeline] = useState(0);
  
  const pipelines = [
    {
      id: 0,
      title: "Traditional TTS Pipeline",
      description: "Multi-stage pipeline with separate text analysis, acoustic model, and vocoder",
      stages: [
        { id: "text", label: "Text", type: "input" },
        { id: "analysis", label: "Text Analysis", type: "process" },
        { id: "linguistic", label: "Linguistic Features", type: "intermediate" },
        { id: "acoustic", label: "Acoustic Model", type: "process" },
        { id: "features", label: "Acoustic Features", type: "intermediate" },
        { id: "vocoder1", label: "Vocoder", type: "process" },
        { id: "waveform1", label: "Waveform", type: "output" }
      ]
    },
    {
      id: 1,
      title: "Mel-Spectrogram Based TTS",
      description: "Uses mel-spectrogram as intermediate representation",
      stages: [
        { id: "char1", label: "Character", type: "input" },
        { id: "acoustic1", label: "Acoustic Model", type: "process" },
        { id: "melspec", label: "Mel-Spectrogram", type: "intermediate" },
        { id: "vocoder2", label: "Vocoder", type: "process" },
        { id: "waveform2", label: "Waveform", type: "output" }
      ]
    },
    {
      id: 2,
      title: "Direct Character-to-Waveform TTS",
      description: "Simplified pipeline from characters directly to waveform",
      stages: [
        { id: "char2", label: "Character", type: "input" },
        { id: "vocoder3", label: "Vocoder", type: "process" },
        { id: "waveform3", label: "Waveform", type: "output" }
      ]
    },
    {
      id: 3,
      title: "Advanced Multi-Stage TTS",
      description: "Enhanced pipeline with detailed acoustic processing",
      stages: [
        { id: "char3", label: "Character/Phoneme", type: "input" },
        { id: "acoustic2", label: "Acoustic Model", type: "process" },
        { id: "features2", label: "Acoustic Features", type: "intermediate" },
        { id: "vocoder4", label: "Vocoder", type: "process" },
        { id: "waveform4", label: "Waveform", type: "output" }
      ]
    },
    {
      id: 4,
      title: "Fully End-to-End TTS Model",
      description: "Single model that learns the entire text-to-speech mapping",
      stages: [
        { id: "char4", label: "Character/Phoneme", type: "input" },
        { id: "e2e", label: "Fully End-to-End TTS Model", type: "process", isMain: true },
        { id: "waveform5", label: "Waveform", type: "output" }
      ]
    }
  ];

  const colors = {
    input: "#4ade80",
    process: "#3b82f6", 
    intermediate: "#f59e0b",
    output: "#ef4444",
    connection: "#64748b"
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 900;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add gradient definitions
    const defs = svg.append("defs");
    
    // Gradient for connections
    const gradient = defs.append("linearGradient")
      .attr("id", "connectionGradient")
      .attr("gradientUnits", "userSpaceOnUse");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", colors.connection)
      .attr("stop-opacity", 0.8);
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colors.connection)
      .attr("stop-opacity", 0.3);

    // Glow effect for main process
    const filter = defs.append("filter")
      .attr("id", "glow");
    
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");
    
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const currentPipeline = pipelines[selectedPipeline];
    const stages = currentPipeline.stages;
    
    const stageWidth = (width - margin.left - margin.right) / stages.length;
    const centerY = (height - margin.top - margin.bottom) / 2;

    // Create flowing connections
    const connections = [];
    for (let i = 0; i < stages.length - 1; i++) {
      connections.push({
        source: i,
        target: i + 1
      });
    }

    // Draw flowing connections with animation
    const connectionGroup = g.append("g").attr("class", "connections");
    
    connections.forEach((conn, index) => {
      const sourceX = conn.source * stageWidth + stageWidth / 2;
      const targetX = conn.target * stageWidth + stageWidth / 2;
      const controlX1 = sourceX + (targetX - sourceX) / 3;
      const controlX2 = sourceX + 2 * (targetX - sourceX) / 3;
      
      const path = connectionGroup.append("path")
        .attr("d", `M ${sourceX} ${centerY} C ${controlX1} ${centerY - 30} ${controlX2} ${centerY - 30} ${targetX} ${centerY}`)
        .attr("stroke", "url(#connectionGradient)")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("opacity", 0);

      // Animate connection appearance
      path.transition()
        .delay(index * 200)
        .duration(800)
        .attr("opacity", 1);

      // Add flowing particles
      const particle = connectionGroup.append("circle")
        .attr("r", 4)
        .attr("fill", colors.connection)
        .attr("opacity", 0);

      const pathLength = path.node().getTotalLength();
      
      const animateParticle = () => {
        particle
          .attr("opacity", 0.8)
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attrTween("transform", () => {
            return (t) => {
              const point = path.node().getPointAtLength(t * pathLength);
              return `translate(${point.x}, ${point.y})`;
            };
          })
          .transition()
          .duration(100)
          .attr("opacity", 0)
          .on("end", () => {
            setTimeout(animateParticle, Math.random() * 2000 + 1000);
          });
      };

      setTimeout(() => animateParticle(), index * 300 + 1000);
    });

    // Draw stages
    const stageGroup = g.append("g").attr("class", "stages");
    
    stages.forEach((stage, index) => {
      const x = index * stageWidth + stageWidth / 2;
      const isMainProcess = stage.isMain;
      
      const stageContainer = stageGroup.append("g")
        .attr("class", "stage")
        .attr("transform", `translate(${x}, ${centerY})`);

      // Add stage box
      const rect = stageContainer.append("rect")
        .attr("x", -60)
        .attr("y", -25)
        .attr("width", 120)
        .attr("height", 50)
        .attr("rx", 8)
        .attr("fill", colors[stage.type])
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2)
        .attr("opacity", 0)
        .style("cursor", "pointer");

      if (isMainProcess) {
        rect.attr("filter", "url(#glow)")
          .attr("width", 160)
          .attr("x", -80)
          .attr("height", 60)
          .attr("y", -30);
      }

      // Animate stage appearance
      rect.transition()
        .delay(index * 150)
        .duration(600)
        .attr("opacity", 1);

      // Add stage label
      const text = stageContainer.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "white")
        .attr("font-size", isMainProcess ? "11px" : "12px")
        .attr("font-weight", "600")
        .attr("opacity", 0)
        .style("pointer-events", "none");

      // Handle text wrapping for longer labels
      const words = stage.label.split(/\s+/);
      if (words.length > 1 && !isMainProcess) {
        words.forEach((word, i) => {
          text.append("tspan")
            .attr("x", 0)
            .attr("dy", i === 0 ? "-0.2em" : "1.2em")
            .text(word);
        });
      } else if (isMainProcess) {
        const lines = stage.label.split(/(?<=TTS)\s/);
        lines.forEach((line, i) => {
          text.append("tspan")
            .attr("x", 0)
            .attr("dy", i === 0 ? "-0.6em" : "1.2em")
            .text(line);
        });
      } else {
        text.text(stage.label);
      }

      text.transition()
        .delay(index * 150 + 300)
        .duration(400)
        .attr("opacity", 1);

      // Add hover effects
      stageContainer
        .on("mouseover", function() {
          d3.select(this).select("rect")
            .transition()
            .duration(200)
            .attr("transform", "scale(1.05)");
        })
        .on("mouseout", function() {
          d3.select(this).select("rect")
            .transition()
            .duration(200)
            .attr("transform", "scale(1)");
        });
    });

  }, [selectedPipeline]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Text-to-Speech Pipeline Architectures
        </h1>
        <p className="text-gray-600">
          Interactive visualization of different TTS model approaches
        </p>
      </div>

      {/* Pipeline Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pipelines.map((pipeline) => (
            <button
              key={pipeline.id}
              onClick={() => setSelectedPipeline(pipeline.id)}
              className={`p-3 rounded-lg text-left transition-all duration-200 ${
                selectedPipeline === pipeline.id
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="font-semibold text-sm mb-1">{pipeline.title}</div>
              <div className={`text-xs ${
                selectedPipeline === pipeline.id ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {pipeline.stages.length} stages
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Pipeline Info */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
        <h3 className="font-bold text-gray-800 mb-2">
          {pipelines[selectedPipeline].title}
        </h3>
        <p className="text-gray-600 text-sm">
          {pipelines[selectedPipeline].description}
        </p>
      </div>

      {/* SVG Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
        <svg ref={svgRef} className="w-full"></svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-400"></div>
          <span className="text-gray-700">Input</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500"></div>
          <span className="text-gray-700">Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500"></div>
          <span className="text-gray-700">Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span className="text-gray-700">Output</span>
        </div>
      </div>
    </div>
  );
};

export default TTSFlowChart;