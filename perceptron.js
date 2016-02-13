/*
perceptron.js v1.0
https://github.com/msuz/nn.js
*/

Perceptron = function(dataset, hidden_cols) {
  this.rows = dataset.input.length;
  this.input_cols = dataset.input[0].length;
  this.output_cols = dataset.output[0].length;
  this.hidden_cols = hidden_cols;
  
  this.input_data  = {};
  this.input_cells = {};
  for ( var j = 0; j < this.input_cols; j++ ) {
    var nc = new NeuronCell();
    var id = nc.getId();
    this.input_cells[id] = nc;
    this.input_data[id] = [];
    for ( var i = 0; i < this.rows; i++ )
      this.input_data[id][i] = dataset.input[i][j];
  }
  
  this.hidden_cells = {};
  for ( var j = 0; j < this.hidden_cols; j++ ) {
    var nc = new NeuronCell();
    var id = nc.getId();
    nc.initV();
    for ( var k in this.input_cells ) nc.initW( k );
    this.hidden_cells[id] = nc;
  }
  
  this.output_data  = {};
  this.output_cells = {};
  for ( var j = 0; j < this.output_cols; j++ ) {
    var nc = new NeuronCell();
    var id = nc.getId();
    nc.initV();
    for ( var k in this.hidden_cells ) nc.initW( k );
    this.output_cells[id] = nc;
    this.output_data[id] = [];
    for ( var i = 0; i < this.rows; i++ )
      this.output_data[id][i] = dataset.output[i][j];
  }
  
};

Perceptron.prototype.learn = function() {
  
};

Perceptron.prototype.impulse = function(input) {

};
