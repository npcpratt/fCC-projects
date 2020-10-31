Promise.all([
  fetch('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json'),
  fetch('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json')
]).then(responses => Promise.all(responses.map(res => res.json())))
  .then(arr => {
    const eduData = arr[0];
    const mapData = arr[1];

    const min = d3.min(eduData.map(d => d.bachelorsOrHigher));
    const max = d3.max(eduData.map(d => d.bachelorsOrHigher));
    const colorScale = d3.scaleLinear().domain([min, max]).range([3, 66])
    const color = d3.scaleQuantize([3, 66], d3.schemeBlues[7]);
    
    const data = Object.assign(new Map(eduData.map(d => [d.fips, d.bachelorsOrHigher])));
    const path = d3.geoPath();
    const us = mapData;

    // create main svg and tooltip
    const svg = d3.select('.chart')
                  .append('svg')
                  .attr('height', '600')
                  .attr('width', '960')
    const tooltip = d3.select('.chart')
                      .append('div')
                      .attr('class', 'tooltip')
                      .style('opacity', 0);

    // append legend
    svg.append("g")
    .attr("transform", "translate(610,20)")
    .append(() => legend({color, width: 260}));

    // create map
    svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .join("path")
      .attr("fill", d => color(colorScale(data.get(d.id))))
      .attr("d", path)
      .on('mouseover', (e, d) => {
        tooltip.style('opacity', 0.9);
        tooltip.html(() => {
          let check = eduData.filter(item => item.fips === d.id);
          if(check[0]) return (`${check[0].area_name}, ${check[0].state}: ${check[0].bachelorsOrHigher}%`)
          else return 0;
        })
        tooltip.attr('data-education', () => {
          let check = eduData.filter(item => item.fips === d.id);
          if(check[0]) return check[0].bachelorsOrHigher;
          else return 0;
        })
        tooltip.style('left', e.pageX + 10 + 'px')
        tooltip.style('top', e.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
    
    // create state borders
    svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "#78909c")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
  })