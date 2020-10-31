Promise.all([
  fetch('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json'),
  fetch('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json')
]).then(responses => Promise.all(responses.map(res => res.json())))
  .then(arr => {
    const data = Object.assign(new Map(arr[0].map(d => [d.fips, d.bachelorsOrHigher])), {title: "Percentage of people aged 24+ with a bachelor's degree or higher"});
    const mapData = arr[1];
    console.log(arr[0]);
    console.log(arr[1]);
    console.log(data);
    
    const svg = d3.select('.chart')
                  .append('svg')
                  .attr('height', '600')
                  .attr('width', '960')

    const path = d3.geoPath();

    const us = mapData;
    // const color = d3.scaleThreshold()
    //                 .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
    //                 .range(d3.schemeGreens[9]);
    const color = d3.scaleQuantize([2.6, 75.1, (75.1 - 2.6) / 8], d3.schemeBlues[9])
    
    svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .join("path")
      .attr("fill", d => color(data.get(d.id)))
      .attr("d", path);

    svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "#111111")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
  })