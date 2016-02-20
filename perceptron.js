/*
perceptron.js v1.0
https://github.com/msuz/nn.js
*/

/**
 * Constructor
 */
Perceptron = function( dataset, hidden_cols, alpha ) {
  this.alpha = alpha || 30;
  this.dataset = dataset;

  // setup hidden layer neuron cells
  var keys = Object.keys( dataset[ 0 ].input );
  this.hidden_cells = {};
  for ( var j = 0; j < hidden_cols; j++ ) {
   var nc = new NeuronCell( keys );
   this.hidden_cells[ nc.id ] = nc;
  }
  
  // setup output layer neuron cell
  var keys = Object.keys( this.hidden_cells );
  this.output_cell = new NeuronCell( keys );
};

/**
 * calculate and learn with respect to the data
 */
Perceptron.prototype.impulse = function( n ) {
  var data = this.dataset[ n ];
  var h = this.getHiddenData( data.input );
  var o = this.getOutputData( h );
  var e = data.output - o;
  var delta = e * o * (1 - o);
  this.output_cell.v += this.alpha * delta * (-1.0);
  for ( var k in h )
    this.output_cell.w[ k ] += this.alpha * delta * h[ k ];
  return { 'h': h, 'o': o, 'e': e };
};

Perceptron.prototype.getHiddenData = function( input_data ) {
  var hidden_data = {};
  for ( var k in this.hidden_cells ) {
    var nc = this.hidden_cells[ k ];
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
