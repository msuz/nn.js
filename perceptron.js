/*
perceptron.js v1.0
https://github.com/msuz/nn.js
*/

Perceptron = function(dataset, hidden_cols) {
  this.rows = dataset.input.length;
  this.input_cols = dataset.input[0].length;
  this.output_cols = dataset.output[0].length;
  this.hidden_cols = hidden_cols;
  
  this.input_data  = [];
  for ( var i = 0; i < this.rows; i++ )
    this.input_data[i] = {};
  
  this.input_cells = {};
  for ( var j = 0; j < this.input_cols; j++ ) {
    var nc = new NeuronCell();
    var id = nc.getId();
    this.input_cells[id] = nc;

    for ( var i = 0; i < this.rows; i++ )
      this.input_data[i][id] = dataset.input[i][j];
  }
  
  this.hidden_cells = {};
  for ( var j = 0; j < this.hidden_cols; j++ ) {
    var nc = new NeuronCell();
    var id = nc.getId();
    nc.initV();
    for ( var k in this.input_cells ) nc.initW( k );
    this.hidden_cells[id] = nc;
  }
  
  this.output_data  = [];
  for ( var i = 0; i < this.rows; i++ )
    this.output_data[i] = {};
    
  this.output_cells = {};
  for ( var j = 0; j < this.output_cols; j++ ) {
    var nc = new NeuronCell();
    var id = nc.getId();
    nc.initV();
    for ( var k in this.hidden_cells ) nc.initW( k );
    this.output_cells[id] = nc;

    for ( var i = 0; i < this.rows; i++ )
      this.output_data[i][id] = dataset.output[i][j];
  }
  
};

Perceptron.prototype.foward = function( i ) {
  var h = {};
  for ( var k in this.hidden_cells ) {
    var d = this.hidden_cells[k];
    h[ d.getId() ] = d.getU( this.input_data[i] );
  }

  var o = {};
  for ( var k in this.output_cells ) {
    var d = this.output_cells[k];
    var id = d.getId();
    var u = d.getU( h );
    o[ id ] = d.sigmoid( u );
  }

  return o;
};

Perceptron.prototype.olearn = function(input) {
  
};
