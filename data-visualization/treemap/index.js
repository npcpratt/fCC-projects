fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
.then(res => res.json())
.then(data => {
  console.log(data);
  
  const width = 954;
  const height = 954;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(",d");

  const treemap = data => d3.treemap()
            .tile(d3.treemapSquarify)
            .size([width, height])
            .padding(1)
            .round(true)
          (d3.hierarchy(data)
              .sum(d => d.value)
              .sort((a, b) => b.value - a.value))

  const root = treemap(data);

  const svg = d3.select('.chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('font', '10px Roboto, sans-serif');
  const leaf = svg.selectAll("g")
                  .data(root.leaves())
                  .join("g")
                  .attr("transform", d => `translate(${d.x0},${d.y0})`);

  leaf.append("title")
  .text(d => `${d.ancestors().reverse().map(d => d.data.name).join("/")}\n${format(d.value)}`);

  leaf.append("rect")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", 0.6)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0);

  leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
    .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .text(d => d);
})