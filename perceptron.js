/*
perceptron.js v1.0
https://github.com/msuz/nn.js
*/

Perceptron = function( dataset, hidden_cols ) {
  this.dataset = dataset;
  
  var keys = Object.keys( dataset[0].input );
  this.hidden_cells = {};
  for ( var j = 0; j < hidden_cols; j++ ) {
   var nc = new NeuronCell( keys );
   this.hidden_cells[ nc.id ] = nc;
  }
  
  var keys = Object.keys( this.hidden_cells );
  this.output_cell = new NeuronCell( keys );
};

Perceptron.prototype.impulse = function( data ) {
  var h = this.getHiddenData( data.input );
  var o = this.getOutputData( h );
  var e = data.output - o;
  return e;
};

Perceptron.prototype.getHiddenData = function( input_data ) {
  var hidden_data = {};
  for ( var k in this.hidden_cells ) {
    var nc = this.hidden_cells[k];
    var u = nc.u( input_data );
    var o = nc.sigmoid( u )
    hidden_data[ nc.id ] = o;
  }
  return hidden_data;
}

Perceptron.prototype.getOutputData = function( hidden_data ) {
  var nc = this.output_cell;
  var u = nc.u( hidden_data );
  var o = nc.sigmoid( u );
  return o;
}
