var $elem = $('<div>').attr('id', 'testElemContainer').appendTo('body');

var data_a = {
  input : [ [0, 0], [0, 1], [1, 0], [1, 1] ],
  output: [ [0   ], [0   ], [0   ], [1   ] ]
};

var data_o = {
  input : [ [0, 0], [0, 1], [1, 0], [1, 1] ],
  output: [ [0   ], [1   ], [1   ], [1   ] ]
};

QUnit.test( "construct - input/output data", function( assert ) {
  var obj = new Perceptron( data_a, 2 );
  assert.equal( obj.rows, 4, "4 rows" );
  assert.equal( obj.input_cols, 2, "2 input cols" );
  assert.equal( obj.output_cols, 1, "1 output cols" );

  assert.equal( typeof obj.input_data, "object" );
  assert.equal( obj.input_data.length, 4, "length is 4" );
  obj.input_data.forEach( function ( d ) {
    assert.equal( typeof d, "object", "type is object" );
    assert.equal( Object.keys( d ).length, 2, "length is 2" );
  });

  assert.equal( typeof obj.output_data, "object" );
  assert.equal( obj.input_data.length, 4, "length is 4" );
  obj.output_data.forEach( function ( d ) {
    assert.equal( typeof d, "object", "type is object" );
    assert.equal( Object.keys( d ).length, 1, "length is 1" );
  });
});
  
QUnit.test( "construct - neuron cells", function( assert ) {
  var obj = new Perceptron( data_a, 2 );

  assert.equal( typeof obj.input_cells, "object" );
  assert.equal( Object.keys( obj.input_cells ).length, 2, '2 input cells');
  for ( var k in obj.input_cells ) {
    var c = obj.input_cells[k];
    assert.equal( typeof c.id, "string", "'id' is string. guess NeuronCell" );
    assert.ok( c.v == 0.0, "equal to 0.0" );
    assert.equal( Object.keys( c.w ).length, 0, 'w is empty');
  }

  assert.equal( typeof obj.hidden_cells, "object" );
  assert.equal( Object.keys( obj.hidden_cells ).length, 2, '2 hidden cells');
  for ( var k in obj.hidden_cells ) {
    var c = obj.hidden_cells[k];
    assert.equal( typeof c.id, "string", "'id' is string. guess NeuronCell" );
    assert.ok( c.v >= -1.0 && c.v <= 1.0 && c.v != 0.0,
      "v is random between -1.0 and 1.0" );
    for ( var l in obj.w )
      assert.ok( c.w[l] >= -1.0 && c.w[l] <= 1.0 && c.w[l] != 0.0,
        "w is random between -1.0 and 1.0" );
  }
  
  assert.equal( typeof obj.output_cells, "object" );
  assert.equal( Object.keys( obj.output_cells ).length, 1, '1 output cells');
  for ( var k in obj.output_cells ) {
    var c = obj.output_cells[k];
    assert.equal( typeof c.id, "string", "'id' is string. guess NeuronCell" );
    assert.ok( c.v >= -1.0 && c.v <= 1.0 && c.v != 0.0,
      "v is random between -1.0 and 1.0" );
    for ( var l in obj.w )
      assert.ok( c.w[l] >= -1.0 && c.w[l] <= 1.0 && c.w[l] != 0.0,
        "w is random between -1.0 and 1.0" );
  }
});
  
QUnit.test( "calc", function( assert ) {
  var obj = new Perceptron( data_a, 2 );
  assert.equal( 1, 1, 'test' );
  var o = obj.foward( 0 );
  assert.equal( Object.keys( o ).length, 1, "1 output value");
  for ( var k in o ) {
    assert.equal( typeof k, "string", "key is string");
    assert.equal( typeof o[k], "number", "value is number");
  }
});
