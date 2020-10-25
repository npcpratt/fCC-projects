fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
.then(res => res.json())
.then(data => {
  
  const height = 444;
  const width = 750;
  const padding = 60;
  
  data.forEach(d => {
    let parsedTime = d.Time.split(':');
    d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
  });
  const xScale = d3.scaleLinear()
                   .domain([d3.min(data, d => d.Year-1), d3.max(data, d => d.Year+1)])
                   .range([0, width-padding-40]);
  const yScale = d3.scaleTime()
                   .domain(d3.extent(data, d => d.Time))
                   .range([10, height-padding/2]);
  
  const color = d3.scaleOrdinal(d3.schemeSet1);
  const timeFormat = d3.timeFormat('%M:%S');
  
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
  const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);
  
  const tooltip = d3.select('#chart')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('opacity', 0)

  const graph = d3.select('#chart')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('class', 'graph')

  graph.append('g')
       .attr('id', 'x-axis')
       .attr('transform', `translate(${padding}, ${height - padding/2})`)
       .call(xAxis)
       .append('text')
       .attr('x', width-padding)
       .attr('y', 5)
       .style('text-anchor', 'end')
       .style('fill', '#212121')
       .style('font-size', 15)
       .text('Year');


  graph.append('g')
       .attr('id', 'y-axis')
       .attr('transform', `translate(${padding}, 0)`)
       .call(yAxis)
  graph.append('text')
       .attr('transform', 'rotate(-90)')
       .attr('x', `-${height/2}`)
       .attr('y', 15)
       .style('font-size', 16)
       .text('Time in Minutes');

  graph.selectAll('circle')
       .data(data).enter()
       .append('circle')
       .attr('class', 'dot')
       .attr('r', 8)
       .attr('cx', d => xScale(d.Year) + padding)
       .attr('cy', d => yScale(d.Time))
       .attr('data-xvalue', d => d.Year)
       .attr('data-yvalue', d => d.Time.toISOString())
       .style('fill', d => color(d.Doping !== ''))
       .style('opacity', 0.8)
       .on('mouseover', (e, d) => {
         tooltip.transition().duration(100).style('opacity', 1);
         tooltip.attr('data-year', d.Year);

         tooltip.html(
           `${d.Name}: ${d.Nationality}<br>
           Year: ${d.Year}, Time: ${timeFormat(d.Time)}
           ${(d.Doping ? '<br><br>' + d.Doping : '')}`
           )
           .style('left', xScale(d.Year) + 90 + 'px')
           .style('top', yScale(d.Time) + padding + 'px');

         d.Doping
         ? tooltip.style('background', '#ffebee')
         : tooltip.style('background', '#e3f2fd');
       })
       .on('mouseout', () => {
         tooltip.transition().duration(100).style('opacity', 0);
        });

  const legendContainer = graph.append('g').attr('id', 'legend');
  const legend = legendContainer.selectAll('#legend')
        .data(color.domain()).enter()
        .append('g')
        .attr('class', 'legend-label')
        .attr('transform', (d, i) => `translate(0, ${height/3 - i*20})`);
  
  legend.append('rect').attr('x', width - 18)
        .attr('width', 18).attr('height', 18)
        .style('fill', color);

  legend.append('text').attr('x', width-24)
        .attr('y', 9).attr('dy', '.30em')
        .style('text-anchor', 'end')
        .text(d => {
          if(d) return 'Riders with doping allegations';
          else return 'No doping allegations'
        })

});