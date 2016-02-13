/*
neuron-cell.js v1.0
https://github.com/msuz/nn.js
*/

NeuronCell = function() {
  this.id = this.getRandomString();
  this.w = {};
  this.v = 0.0;
};

NeuronCell.prototype.getRandomString = function( len ) {
  var l = len || 8;
  var c = "abcdefghijklmnopqrstuvwxyz0123456789";
  var cl = c.length;
  var r = "";
  for ( var i = 0; i < l; i++ ) {
    r += c[ Math.floor( Math.random() * cl ) ];
  }
  return r;
};

NeuronCell.prototype.getRandomNumber = function( a, b ) {
  var min = Math.min( a, b ) || -1.0;
  var max = Math.max( a, b ) ||  1.0;
  var avg = (max + min) / 2;
  var range = (max - min);
  return (Math.random() * range) + min;
};

NeuronCell.prototype.getId = function() {
  return this.id;
};

NeuronCell.prototype.getV = function() {
  return this.v || 0;
};

NeuronCell.prototype.setV = function( v ) {
  return this.v = v;
};

NeuronCell.prototype.initV = function() {
  return this.setV( this.getRandomNumber() );
};

NeuronCell.prototype.getW = function( k ) {
  return this.w[ k ] || 1;
};

NeuronCell.prototype.setW = function( k, w ) {
  return this.w[ k ] = w;
};

NeuronCell.prototype.initW = function( k ) {
  return this.setW( k, this.getRandomNumber() );
};

NeuronCell.prototype.getU = function( inputs ) {
  var u = -this.getV();
  if ( typeof inputs == 'number')
    return u + inputs;
  for ( var k in inputs )
    u += inputs[ k ] * this.getW( k );
  return u;
};

NeuronCell.prototype.unitStep = function( u ) {
  return (u >= 0.0) ? 1.0 : 0.0;
};

NeuronCell.prototype.sigmoid = function( u ) {
  return 1.0 / (1.0 + Math.exp( -u ));
};
