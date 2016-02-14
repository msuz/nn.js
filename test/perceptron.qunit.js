var $elem = $('<div>').attr('id', 'testElemContainer').appendTo('body');

var dataset = [
  { 'input': { 'a': 0, 'b': 0}, 'output': 0},
  { 'input': { 'a': 0, 'b': 1}, 'output': 0},
  { 'input': { 'a': 1, 'b': 0}, 'output': 0},
  { 'input': { 'a': 1, 'b': 1}, 'output': 1},
];

QUnit.test( "construct", function( assert ) {
  var p = new Perceptron( dataset, 2 );

  assert.equal( typeof p.dataset           , "object" );
  assert.equal( typeof p.dataset[0]        , "object" );
  assert.equal( typeof p.dataset[0].input  , "object" );
  assert.equal( typeof p.dataset[0].input.a, "number" );
  assert.equal( typeof p.dataset[0].input.b, "number" );
  assert.equal( typeof p.dataset[0].output , "number" );

  assert.equal( typeof p.hidden_cells, "object" );
  assert.equal( Object.keys( p.hidden_cells ).length, 2);
  for ( var k in p.hidden_cells ) {
    var nc = p.hidden_cells[k];
    assert.equal( typeof nc   , "object");
    assert.equal( typeof nc.id, "string");
    assert.equal( typeof nc.v , "number");
    assert.equal( typeof nc.w.a, "number");
    assert.equal( typeof nc.w.b, "number");
  }
  
  assert.equal( typeof p.output_cell, "object" );
  var nc = p.output_cell;
  assert.equal( typeof nc   , "object");
  assert.equal( typeof nc.id, "string");
  assert.equal( typeof nc.v , "number");
  for ( var k in p.hidden_cells ) {
    assert.equal( typeof nc.w[k], "number");
  }
});
  
QUnit.test( "impulse", function( assert ) {
  var p = new Perceptron( dataset, 2 );

  var w_before = {};
  for ( var k in p.hidden_cells ) {
    w_before[k] = p.output_cell.w[k];
  }

  var e = p.impulse( dataset[0] );
  assert.ok( e >= -1.0 );
  assert.ok( e <=  1.0 );
  assert.ok( e !=  0.0 );
  
  var w_after = {};
  for ( var k in p.hidden_cells ) {
    w_after[k] = p.output_cell.w[k];
  }
  assert.notDeepEqual( w_after, w_before );
});

QUnit.test( "impulse", function( assert ) {
  var p = new Perceptron( dataset, 2 );
  for ( var t = 0; t < 5000; t++ ) {
    dataset.forEach( function( data ) {
      p.impulse( data );
    });
  }
  assert.equal( p.impulse( dataset[0] ).toFixed(1), 0.0 );
  assert.equal( p.impulse( dataset[1] ).toFixed(1), 0.0 );
  assert.equal( p.impulse( dataset[2] ).toFixed(1), 0.0 );
  assert.equal( p.impulse( dataset[3] ).toFixed(1), 1.0 );
});
