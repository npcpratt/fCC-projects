// fetch data
fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(res => res.json())
.then(obj => {

    // set dimensions for elements
    const dataset = obj.data;
    const width = 700;
    const height = 400;
    const rectWidth = width/dataset.length;

    // array for years
    // const years = dataset.map(cur => {
    //     if(cur[0].substr(5,1) == '1')
    //     return cur[0].substr(0,4);
    // }).filter(cur => cur != null);

    // data for timespan
    const years = dataset.map(cur => {
        switch(cur[0].substr(5,2)) {
            case '01': return cur[0].substr(0,4) + " Q1";
            case '04': return cur[0].substr(0,4) + " Q2";
            case '07': return cur[0].substr(0,4) + " Q3";
            case '10': return cur[0].substr(0,4) + " Q4";
        }
    })
    const yearsDate = dataset.map(cur => new Date(cur[0]))

    // data for GDP
    const GDP = dataset.map(cur => cur[1]);
    const scaleGDP = d3.scaleLinear().domain([0, d3.max(GDP)]).range([0, height]);
    let scaledGDP = GDP.map(cur => scaleGDP(cur));

    // set scale
    let lastQuarter = new Date(d3.max(yearsDate));
    lastQuarter.setMonth(lastQuarter.getMonth() + 3);
    const xScale = d3.scaleTime().domain([d3.min(yearsDate), lastQuarter]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(GDP)]).range([height, 0]);

    // set axes
    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    // create main svg
    const chart = d3.select('#chart')
                    .append('svg')
                    .attr('width', width + 100)
                    .attr('height', height + 60);
    
    // create tooltip
    const tooltip = d3
      .select('#chart')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    // create rectangles
    chart.selectAll('rect')
         .data(scaledGDP)
         .enter()
         .append('rect')
         .attr('data-date', (d,i) => dataset[i][0])
         .attr('data-gdp', (d,i) => dataset[i][1])
         .attr('class', 'bar')
         .attr('x', (d,i) => xScale(yearsDate[i]))
         .attr('y', d => height - d)
         .attr('fill', '#fbc02d')
         .attr('width', rectWidth)
         .attr('height', d => d)
         .attr('transform', 'translate(60, 0)')
         .on('mouseover', (e, d) => {
                let i = scaledGDP.indexOf(d);
                tooltip.transition().duration(100).style('opacity', 0.9);
                tooltip.html(`${years[i]}<br>$${GDP[i]} Billion`)
                       .attr('data-date', (d,i) => dataset[i][0])
                       .style('left', i * rectWidth + 30 + 'px')
                       .style('top', height - 70 + 'px')
                       .style('transform', 'translateX(60px)');
             })
         .on('mouseout', () => {
             tooltip.transition().duration(100).style('opacity', 0);
         });

    // append axes
    chart.append('g')
         .call(xAxis)
         .attr('id', 'x-axis')
         .attr('transform', 'translate(60, 400)');
    chart.append('g')
         .call(yAxis)
         .attr('id', 'y-axis')
         .attr('transform', 'translate(60, 0)');
})



