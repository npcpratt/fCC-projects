// fetch data
fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(res => res.json())
.then(obj => {

    // set dimensions for elements
    const dataset = obj.data;
    const width = 700;
    const height = 400;
    const rectWidth = width/275;

    // array for years
    // const years = dataset.map(cur => {
    //     if(cur[0].substr(5,1) == '1')
    //     return cur[0].substr(0,4);
    // }).filter(cur => cur != null);


    const years = dataset.map(cur => {
        switch(cur[0].substr(5,2)) {
            case '01': return cur[0].substr(0,4) + " Q1";
            case '04': return cur[0].substr(0,4) + " Q2";
            case '07': return cur[0].substr(0,4) + " Q3";
            case '10': return cur[0].substr(0,4) + " Q4";
        }
    })

    // set scale
    const xScale = d3.scaleLinear().domain([...years]).range([50, width+50]);
    const yScale = d3.scaleLinear().domain([0, d3.max(dataset, d => d[1])]).range([30, height+30]);

    // create main svg
    const chart = d3.select('#chart')
                    .append('svg')
                    .attr('width', width + 100)
                    .attr('height', height + 60)
    
    
    chart.selectAll('rect')
         .data(dataset)
         .enter()
         .append('rect')
         .attr('x', (d,i) => i*3)
         .attr('y', 0)
         .attr('fill', 'navy')
         .attr('width', rectWidth)
         .attr('height', d => yScale(d[1]))

    

    // create axes
})



