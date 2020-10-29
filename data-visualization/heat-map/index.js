fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json')
.then(res => res.json())
.then(data => {
    
    const dataset = data.monthlyVariance;

    //heading
    d3.select('.heading')
      .append('h1')
      .attr('id', 'title')
      .text('Monthly Global Land-Surface Temperature')
      .append('p')
      .attr('id', 'description')
      .text(`${dataset[0].year} - ${dataset[dataset.length - 1].year}: base temperature ${data.baseTemperature}°C`);
    
    const numberOfYears = Math.ceil(dataset.length/12);
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const height = 10*numberOfYears;
    const width = 80*12;
    const fontSize = 16;
    const padding = {
        left: 2*fontSize,
        right: 1*fontSize,
        top: 5*fontSize,
        bottom: 6*fontSize
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
                .domain(monthArray)
                .range([padding.left, width + padding.left]);
    const y = d3.scaleBand()
                .domain(dataset.map(item => item.year))
                .range([padding.top, height + padding.top]);
    const tempDomain = [
        d3.max(dataset, d => data.baseTemperature + d.variance),
        d3.min(dataset, d => data.baseTemperature + d.variance)
    ]
    const color = (variance) => {
        let colorScale = d3.scaleLinear()
                           .domain(tempDomain)
                           .range([0,1]);
        return d3.interpolateRdYlGn(colorScale(data.baseTemperature + variance));
    }

    // append legend and axes
    chart.append("g")
    .append(() => legend({
      color: d3.scaleSequential(tempDomain, d3.interpolateRdYlGn),
      title: "Temperature (°C)"
    }));

    chart.append('g')
         .call(d3.axisTop(x))
         .attr('id', 'x-axis')
         .attr('transform', `translate(0, ${padding.top})`)
         .call(g => g.select(".domain").remove());
    chart.append('g')
         .call(d3.axisLeft(y))
         .attr('id', 'y-axis')
         .attr('transform', `translate(${padding.left}, 0)`)
         .call(g => g.select(".domain").remove());

    // append rectangles from the data
    chart.selectAll('rect')
         .data(dataset)
         .join('rect')
         .attr('class', 'cell')
         .attr('data-month', d => d.month-1)
         .attr('data-year', d => d.year)
         .attr('data-temp', d => data.baseTemperature + d.variance)
         .attr('width', 79)
         .attr('height', 9)
         .attr('x', (d,i) => (d.month-1)*80 + padding.left)
         .attr('y', (d,i) => (d.year - dataset[0].year)*10 + padding.top)
         .attr('fill', d => color(d.variance))
         .on('mouseover', (e,d) => {
             tooltip.transition().duration(100).style('opacity', 0.9);
             tooltip.html(
                 `${d.year} - ${monthArray[d.month-1]} <br> 
                 ${Math.round((data.baseTemperature + d.variance)*100) / 100}°C <br> 
                 ${Math.round(d.variance * 100) / 100}°C`
                 )
             tooltip.style('left', (d.month-1)*80 + padding.left + 'px')
             tooltip.style('top', (d.year - dataset[0].year)*10 + padding.top + 'px')
             tooltip.attr('data-year', d.year)
         })
         .on('mouseout', () => {
            tooltip.transition().duration(100).style('opacity', 0);
         });

})