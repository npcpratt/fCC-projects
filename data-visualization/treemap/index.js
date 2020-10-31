fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
.then(res => res.json())
.then(data => {
  console.log(data);
  
  const width = 954;
  const height = 954;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const treemap = data => d3.treemap()
            .tile(d3.treemapResquarify)
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

  const tooltip = d3.select('.chart')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('opacity', 0)

  const leaf = svg.selectAll("g")
                  .data(root.leaves())
                  .join("g")
                  .attr("transform", d => `translate(${d.x0},${d.y0})`);


  leaf.append("rect")
      .attr('class', 'tile')
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value)
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", 0.6)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .on('mouseover', (e,d) => {
        tooltip.html(
          `Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`
        )
        tooltip.style('opacity', 1)
        tooltip.attr('data-value', d.data.value)
        tooltip.style('left', e.pageX + 10 + 'px')
        tooltip.style('top', e.pageY - 28 + 'px')
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

  leaf.append("text")
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .text(d => d);

  const legend = d3.select('.chart')
    .append('svg')
    .attr('id', 'legend')
    .attr('height', 300)
    .attr('width', 200);

  const legendElem = legend.selectAll('g')
                          .data(data.children)
                          .join('g')
                          .attr('transform', (d,i) => `translate(20, ${i*40 + 10})`)
                          
  legendElem.append('rect')
        .attr('class', 'legend-item')
        .attr('height', 30)
        .attr('width', 30)
        .attr('fill', d => color(d.name))
        .attr("fill-opacity", 0.6)
  legendElem.append('text')
        .attr('x', 40)
        .attr('y', 20)
        .text(d => d.name)
})