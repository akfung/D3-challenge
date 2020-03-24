// @TODO: YOUR CODE HERE!
// svg dimensions
let svgHeight = 700,
    svgWidth = 1000;

// make responsive function
function makeResponsive() {

  var svgArea = d3.select("#scatter").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }}

// set chart margins
let chartMargins = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
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
    .attr('transform', `translate(${chartMargins.left}, ${chartMargins.top})`);

// read csv and draw
let csvPath = './assets/data/data.csv';
d3.csv(csvPath).then(csvData => {
    // test to print data
    console.log(csvData);

    // forEach to convert column values to int
    csvData.forEach(function(state) {
        state.poverty = +state.poverty;
        state.healthcare = +state.healthcare;
        state.obesity = +state.obesity;
        state.age = +state.age;
        state.smokes = +state.smokes;
        state.income = +state.income;
    });
    
    // set x scales for axes
    let healthcareXScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.healthcare)])
    .range([0, chartWidth]);

    let ageXScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.age)])
    .range([0, chartWidth]);

    let incomeXScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.income)])
    .range([0, chartWidth]);

    // set y scales for axes
    let povertyYScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.poverty)])
    .range([chartHeight, 0]);

    let smokesYScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.smokes)])
    .range([chartHeight, 0]);

    let obesityYScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.obesity)])
    .range([chartHeight, 0]);
    
    // create Axes
    let bottomAxisHealthcare = d3.axisBottom(healthcareXScale);
    let leftAxisPoverty = d3.axisLeft(povertyYScale);

    //append axes to svg group
    //left
    chartGroup.append('g')
        .call(leftAxisPoverty);

    //bottom
    chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(bottomAxisHealthcare);

    // BIG MONEY TIME MAKE THE CIRCLES
    let stateCircles = chartGroup.selectAll('.stateCircle')
        .data(csvData)
        .enter()
        .append('circle')
        .classed('stateCircle', true)
        .attr('cx', d => healthcareXScale(d.healthcare))
        .attr('cy', d => povertyYScale(d.poverty))
        .attr('r', '10');

    // add circle text for each state
    let stateLabels = chartGroup.selectAll('.stateText')
        .data(csvData)
        .enter()
        .append('text')
        .text(d => d.abbr)
        .classed('stateText', true)
        .attr('x', d => healthcareXScale(d.healthcare))
        .attr('y', d => povertyYScale(d.poverty))
        .attr('font-size', '10px');

    //draw axis labels
    // x axis labels
    chartGroup.append('text')
        .attr('transform', `translate(${chartWidth/2}, ${chartHeight + chartMargins.top - 50})`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .text('% of Households with Healthcare');
    
    chartGroup.append('text')
        .attr('transform', `translate(${chartWidth/2}, ${chartHeight + chartMargins.top - 30})`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .text('Average Household Age');

    chartGroup.append('text')
        .attr('transform', `translate(${chartWidth/2}, ${chartHeight + chartMargins.top - 10})`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .text('Average Household Income');

    // y axis labels
    chartGroup.append('text')
        .attr('transform', `translate(${chartMargins.left - 150}, ${chartHeight/2}) rotate(-90)`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .text('% of Households with an Obese Adult');

    chartGroup.append('text')
        .attr('transform', `translate(${chartMargins.left - 170}, ${chartHeight/2}) rotate(-90)`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .text('% of Households in Poverty');

    chartGroup.append('text')
        .attr('transform', `translate(${chartMargins.left - 190}, ${chartHeight/2}) rotate(-90)`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .text('% of Households with Smokers');

    // Let's add tooltips - fun for the whole family
    // create tooltip and call to svg chart area
    let toolTip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([120,80])
        .html(function(d) {
            return (`<p><strong>${d.state}</strong></p>
            <p>${d.healthcare}% have healthcare</p>
            <p>${d.poverty}% in poverty</p>`);
        });

    chartGroup.call(toolTip);

    // create listener for mouseover to show tooltips
    stateLabels.on('mouseover', function(d){
        toolTip.show(d, this);
    })
    .on('mouseout', function(d){
        toolTip.hide(d);

    });

    
    
}
    ).catch(function(error) {
        console.log(error);
    });
    
// makeResponsive();
// d3.select(window).on("resize", makeResponsive);


