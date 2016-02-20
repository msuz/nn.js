var $elem = $('<div>').attr('id', 'testElemContainer').appendTo('body');

var dataset_and = [
  { 'input': { 'a': 0, 'b': 0}, 'output': 0},
  { 'input': { 'a': 0, 'b': 1}, 'output': 0},
  { 'input': { 'a': 1, 'b': 0}, 'output': 0},
  { 'input': { 'a': 1, 'b': 1}, 'output': 1},
];
var dataset_or = [
  { 'input': { 'a': 0, 'b': 0}, 'output': 0},
  { 'input': { 'a': 0, 'b': 1}, 'output': 1},
  { 'input': { 'a': 1, 'b': 0}, 'output': 1},
  { 'input': { 'a': 1, 'b': 1}, 'output': 1},
];

QUnit.test( "construct", function( assert ) {
  var dataset = dataset_and;
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
  var dataset = dataset_and;
  var p = new Perceptron( dataset, 2 );

  var w_before = {};
  for ( var k in p.hidden_cells ) {
    w_before[k] = p.output_cell.w[k];
  }

  var r = p.impulse( 0 );
  assert.equal( typeof r.h, "object");
  assert.equal( typeof r.o, "number");
  assert.ok( r.o >= -1.0 );
  assert.ok( r.o <=  1.0 );
  assert.ok( r.o !=  0.0 );
  assert.equal( typeof r.e, "number");
  assert.ok( r.e >= -1.0 );
  assert.ok( r.e <=  1.0 );
  assert.ok( r.e !=  0.0 );
  
  var w_after = {};
  for ( var k in p.hidden_cells ) {
    w_after[k] = p.output_cell.w[k];
  }
  assert.notDeepEqual( w_after, w_before );
});

QUnit.test( "dataset AND alpha=30, threshold=0.05, times=10000", function( assert ) {
  var dataset = dataset_and;
  var p = new Perceptron( dataset, 2, 30 );
  for ( var t = 0; t < 10000; t++ ) {
    for ( var i = 0; i < 4; i++ ) {
      p.impulse( i );
    }
  }
  assert.equal( p.impulse( 0 ).o.toFixed(1), dataset[0].output, "(0,0,0)" );
  assert.equal( p.impulse( 1 ).o.toFixed(1), dataset[1].output, "(0,1,0)" );
  assert.equal( p.impulse( 2 ).o.toFixed(1), dataset[2].output, "(1,0,0)" );
  assert.equal( p.impulse( 3 ).o.toFixed(1), dataset[3].output, "(1,1,1)" );
});

QUnit.test( "dataset OR alpha=30, threshold=0.05, times=10000", function( assert ) {
  var dataset = dataset_or;
  var p = new Perceptron( dataset, 2, 30 );
  for ( var t = 0; t < 10000; t++ ) {
    for ( var i = 0; i < 4; i++ ) {
      p.impulse( i );
    }
  }
  assert.equal( p.impulse( 0 ).o.toFixed(1), dataset[0].output, "(0,0,0)" );
  assert.equal( p.impulse( 1 ).o.toFixed(1), dataset[1].output, "(0,1,1)" );
  assert.equal( p.impulse( 2 ).o.toFixed(1), dataset[2].output, "(1,0,1)" );
  assert.equal( p.impulse( 3 ).o.toFixed(1), dataset[3].output, "(1,1,1)" );
});
