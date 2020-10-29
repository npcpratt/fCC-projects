fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json')
.then(res => res.json())
.then(data => {
    
    console.log(data);
    
    const dataset = data.monthlyVariance;

    //heading
    d3.select('.heading')
      .append('h1')
      .text('Monthly Global Land-Surface Temperature')
      .append('p')
      .text(`${dataset[0].year} - ${dataset[dataset.length - 1].year}: base temperature ${data.baseTemperature}°C`);
    
    const numberOfYears = Math.ceil(dataset.length/12);
    const height = 10*numberOfYears;
    const width = 80*12;
    const fontSize = 16;
    const padding = {
        left: 2*fontSize,
        right: 1*fontSize,
        top: 7*fontSize,
        bottom: 8*fontSize
    }

    // create main svg and tooltip
    const chart = d3.select('.chart')
                    .append('svg')
                    .attr('width', width + padding.left + padding.right)
                    .attr('height', height + padding.top + padding.bottom);
    const tooltip = d3.select('.chart')
                      .append('div')
                      .attr('id', 'tooltip')
                      .style('opacity', 0);
    // set scales
    const x = d3.scaleBand()
                .domain(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
                .range([padding.left, width + padding.left]);
    const y = d3.scaleBand()
                .domain(dataset.map(item => item.year))
                .range([padding.top, height + padding.top]);
    const color = (variance) => {
        let colorScale = d3.scaleLinear()
                           .domain([d3.min(dataset, d => d.variance), d3.max(dataset, d => d.variance)])
                           .range([0,1]);
        return d3.interpolateRdYlGn(colorScale(-variance));
    }

    // append axes
    chart.append('g')
         .call(d3.axisTop(x))
         .attr('transform', `translate(0, ${padding.top})`)
         .call(g => g.select(".domain").remove());
    chart.append('g')
         .call(d3.axisLeft(y))
         .attr('transform', `translate(${padding.left}, 0)`)
         .call(g => g.select(".domain").remove());

    // append rectangles from the data
    chart.selectAll('rect')
         .data(dataset)
         .join('rect')
         .attr('width', 79)
         .attr('height', 9)
         .attr('x', (d,i) => (d.month-1)*80 + padding.left)
         .attr('y', (d,i) => (d.year - dataset[0].year)*10 + padding.top)
         .attr('fill', d => color(d.variance))
         .on('mouseover', (e,d) => {
             tooltip.transition().duration(100).style('opacity', 0.9)
         })

})