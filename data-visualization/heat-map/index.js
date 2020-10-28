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
      .text(`${dataset[0].year} - ${dataset[dataset.length - 1].year}: base temperature ${data.baseTemperature}°c`);
    
    const years = Math.ceil(dataset.length/12);
    const width = 5*years;
    const height = 30*12;
    const fontSize = 16;
    const padding = {
        left: 9*fontSize,
        right: 9*fontSize,
        top: 1*fontSize,
        bottom: 8*fontSize
    }
    console.log(width)
    const chart = d3.select('.chart')
                    .append('svg')
                    .attr('width', width + padding.left + padding.right)
                    .attr('height', height + padding.top + padding.bottom);
    const tooltip = d3.select('.chart').append('div').attr('id', 'tooltip')
    
    const yScale = d3.scaleBand().domain([0,1,2,3,4,5,6,7,8,9,10,11])
                     .rangeRound([0, height], 0, 0);
    const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickValues(yScale.domain())
                    .tickFormat(month => {
                        let date = new Date(0);
                        date.setUTCMonth(month);
                        return d3.time.format.utc('%B')(date);
                    })
                    .tickSize(10,1);
    chart.append('g')
         .attr('class', 'y-axis')
         .attr('id', 'y-axis')
         .attr('transform', `translate(${padding.left}, ${padding.top})`)
         .call(yAxis)
         .append('text')
         .text('Months')
         .style('text-anchor', 'middle')
         .attr('transform', `translate(${-7*fontSize}, ${height/2}) rotate(-90)`);
    
    const xScale = d3.scaleOrdinal().domain()

})