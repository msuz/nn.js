/*
neuron-cell.js v1.0
https://github.com/msuz/nn.js
*/

NeuronCell = function( keys ) {
  this.id = NeuronCell.getRandomString();
  this.initV();
  this.initW( keys );
};

NeuronCell.getRandomString = function( len ) {
  var l = len || 8;
  var c = "abcdefghijklmnopqrstuvwxyz0123456789";
  var cl = c.length;
  var r = "";
  for ( var i = 0; i < l; i++ ) {
    r += c[ Math.floor( Math.random() * cl ) ];
  }
  return r;
};

NeuronCell.getRandomNumber = function( a, b ) {
  var min = Math.min( a, b ) || -1.0;
  var max = Math.max( a, b ) ||  1.0;
  var avg = (max + min) / 2;
  var range = (max - min);
  return (Math.random() * range) + min;
};

NeuronCell.prototype.initV = function() {
  return this.v = NeuronCell.getRandomNumber();
};

NeuronCell.prototype.initW = function( keys ) {
  this.w = {};
  if ( !keys ) return this.w;
  keys.forEach( function ( k ) {
    this.w[k] = NeuronCell.getRandomNumber();
  }, this);
  return this.w;
};

NeuronCell.prototype.u = function( inputs ) {
  var u = -this.v;
  for ( var k in inputs )
    u += inputs[ k ] * this.w[ k ];
  return u;
};

NeuronCell.prototype.unitStep = function( u ) {
  return (u >= 0.0) ? 1.0 : 0.0;
};

NeuronCell.prototype.sigmoid = function( u ) {
  return 1.0 / (1.0 + Math.exp( -u ));
};
