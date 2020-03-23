// @TODO: YOUR CODE HERE!
let csvPath = './assets/data/data.csv';
d3.csv(csvPath).then(csvData => {
    console.log(csvData)
}
    );