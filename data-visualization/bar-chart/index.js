// fetch data
fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(res => res.json())
.then(obj => {

    console.log(obj.data);

    // set dimensions for elements
    const dataset = obj.data;
    const width = 700;
    const height = 400;
    const rectWidth = width/275;

    // create main svg
    const chart = d3.select('#chart')
                    .append('svg')
                    .attr('width', width + 100)
                    .attr('height', height + 60)

    // set scale
    
    chart.selectAll('rect')
         .data(dataset)
         .enter()
         .append('rect')
         .attr('x', (d,i) => i*3)
         .attr('y', 0)
         .attr('fill', 'navy')
         .attr('width', rectWidth)
         .attr('height', d => d[1])

    // const years = dataset.map(cur => {
    //     switch(cur[0].substr(5,2)) {
    //         case '01': return cur[0].substr(0,4) + " Q1";
    //         case '04': return cur[0].substr(0,4) + " Q2";
    //         case '07': return cur[0].substr(0,4) + " Q3";
    //         case '10': return cur[0].substr(0,4) + " Q4";
    //     }
    // })

    // create axes
})



