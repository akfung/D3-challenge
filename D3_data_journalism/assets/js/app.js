// @TODO: YOUR CODE HERE!
// svg dimensions
let svgHeight = 1000,
    svgWidth = 700;

// set chart margins
let chartMargins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

// set chart dimensions
let chartWidth = svgWidth - chartMargins.left - chartMargins.right;
let chartHeight = svgHeight - chartMargins.top - chartMargins.bottom;

// create svg and svg group html elements
let svg = d3.select('#scatter')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);

let chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);



// read csv and draw
let csvPath = './assets/data/data.csv';
d3.csv(csvPath).then(csvData => {
    // test to print data
    console.log(csvData);

    // forEach to convert string to int
    csvData.forEach(function(state) {
        state.poverty = +state.poverty;
        state.healthcare = +state.healthcare;
        state.obesity = +state.obesity;
    });
    
    // set x and y scales for axes
    let yScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.poverty)])
    .range([chartHeight, 0]);

    let xScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.healthcare)])
    .range([0, chartWidth]);

    // create Axes
    let bottomAxis = d3.axisBottom(xScale);
    let leftAxis = d3.axisLeft(yScale);

    //append axes to svg group
    //left
    chartGroup.append('g')
        .call(leftAxis);
        
    //bottom
    chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(bottomAxis);

}
    );