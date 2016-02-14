var $elem = $('<div>').attr('id', 'testElemContainer').appendTo('body');

var dataset = [
  { 'input': { 'a': 0, 'b': 0}, 'output': 0},
  { 'input': { 'a': 0, 'b': 1}, 'output': 0},
  { 'input': { 'a': 1, 'b': 0}, 'output': 0},
  { 'input': { 'a': 1, 'b': 1}, 'output': 1},
];

QUnit.test( "construct", function( assert ) {
  var obj = new Perceptron( dataset, 2 );

  assert.equal( typeof obj.dataset           , "object" );
  assert.equal( typeof obj.dataset[0]        , "object" );
  assert.equal( typeof obj.dataset[0].input  , "object" );
  assert.equal( typeof obj.dataset[0].input.a, "number" );
  assert.equal( typeof obj.dataset[0].input.b, "number" );
  assert.equal( typeof obj.dataset[0].output , "number" );

  assert.equal( typeof obj.hidden_cells, "object" );
  assert.equal( Object.keys( obj.hidden_cells ).length, 2);
  for ( var k in obj.hidden_cells ) {
    var nc = obj.hidden_cells[k];
    assert.equal( typeof nc   , "object");
    assert.equal( typeof nc.id, "string");
    assert.equal( typeof nc.v , "number");
    assert.equal( typeof nc.w.a, "number");
    assert.equal( typeof nc.w.b, "number");
  }
  
  assert.equal( typeof obj.output_cell, "object" );
  var nc = obj.output_cell;
  assert.equal( typeof nc   , "object");
  assert.equal( typeof nc.id, "string");
  assert.equal( typeof nc.v , "number");
  for ( var k in obj.hidden_cells ) {
    assert.equal( typeof nc.w[k], "number");
  }
});
  
QUnit.test( "impulse", function( assert ) {
  var obj = new Perceptron( dataset, 2 );
  var e = obj.impulse( dataset[0] );
  assert.ok( e >= -1.0 );
  assert.ok( e <=  1.0 );
  assert.ok( e !=  0.0 );
});
