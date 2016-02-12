var $elem = $('<div>').attr('id', 'testElemContainer').appendTo('body');

QUnit.test( "construct, default values", function( assert ) {
  var obj = new NeuronCell();
  assert.equal( typeof obj.id, "string", "'id' is string");
  assert.equal( obj.id.length, 8, "'id' length is 8");
  assert.equal( obj.getV(), 0, "default 'v' value is 0" );
});

QUnit.test( "generateRandomString()", function( assert ) {
  var obj = new NeuronCell();
  assert.ok( /^[0-9a-z]*$/.exec(obj.generateRandomString()), "regexp pattern" );
  assert.equal( obj.generateRandomString(     ).length,   8, "default length is 8" );
  assert.equal( obj.generateRandomString(   1 ).length,   1, "length is changed to   1" );
  assert.equal( obj.generateRandomString( 100 ).length, 100, "length is changed to 100" );
  var map = {};
  for ( var i = 0; i < 10000; i++ ) {
    var str = obj.generateRandomString( 8 );
    assert.notOk( str in map, "duplicate string is not exists" );
    map[str] = true;
  }
});

QUnit.test( "getV() and setV()", function( assert ) {
  var obj = new NeuronCell();
  assert.strictEqual( obj.getV(), 0, "default 'v' value is 0" );
  assert.equal( obj.setV( 5 ), 5, "setV() returns new 'v' value" );
  assert.equal( obj.getV(), 5, "after setV(), getV() returns new 'v' value" );
});

QUnit.test( "getW() and setW()", function( assert ) {
  var obj = new NeuronCell();
  var k = 'xxx';
  assert.equal( obj.getW( k ), 1, "defalut 'w' value is 1" );
  assert.equal( obj.setW( k, 5 ), 5, "setW() returns new 'w' value" );
  assert.equal( obj.getW( k ), 5, "after setW(), getW() returns new 'w' value" );
});

QUnit.test( "getU()", function( assert ) {
  var obj = new NeuronCell();
  assert.equal( obj.getU( 0 ), 0, "default as input layer. zero" );
  assert.equal( obj.getU( 100.8 ), 100.8, "default as input layer. plus" );
  assert.equal( obj.getU( -10.5 ), -10.5, "default as input layer. minus" );

  obj.setV( 2.3 );
  obj.setW( 'x', 7.0 );
  obj.setW( 'y', 1.1 );
  obj.setW( 'z', -1.7 );
  var inputs = { 'x': -1.3, 'y': 2.0, 'z': 5.0 };
  var actual = obj.getU( inputs );
  var expected = (-1.3 * 7.0) + (1.1 * 2.0) + (-1.7 * 5.0) - 2.3;
  assert.equal( actual, expected, "setting w and v, input data" );
});

QUnit.test( "unitStep()", function( assert ) {
  var obj = new NeuronCell();
  assert.equal( obj.unitStep( Number.NEGATIVE_INFINITY ), 0.0, "negative infinity -> 0.0" );
  assert.equal( obj.unitStep( Number.POSITIVE_INFINITY ), 1.0, "positive infinity -> 1.0" );
  assert.equal( obj.unitStep( -0.001 ), 0.0, "sufficiently small negative -> 0.0" );
  assert.equal( obj.unitStep(  0.000 ), 1.0, "just zero -> 1.0" );
  assert.equal( obj.unitStep(  0.001 ), 1.0, "sufficiently small positive -> 1.0" );
});

QUnit.test( "sigmoid()", function( assert ) {
  var obj = new NeuronCell();
  assert.equal( obj.sigmoid( Number.NEGATIVE_INFINITY ), 0.0, "negative infinity -> 0.0" );
  assert.equal( obj.sigmoid( Number.POSITIVE_INFINITY ), 1.0, "positive infinity -> 1.0" );
  assert.equal( obj.sigmoid( -10.000 ).toFixed( 3 ), 0.000, "-10.000 -> 0.000" );
  assert.equal( obj.sigmoid(  -1.000 ).toFixed( 3 ), 0.269, " -1.000 -> 0.269" );
  assert.equal( obj.sigmoid(  -0.100 ).toFixed( 3 ), 0.475, " -0.100 -> 0.475" );
  assert.equal( obj.sigmoid(  -0.010 ).toFixed( 3 ), 0.498, " -0.010 -> 0.498" );
  assert.equal( obj.sigmoid(  -0.001 ).toFixed( 3 ), 0.500, " -0.001 -> 0.500" );
  assert.equal( obj.sigmoid(   0.000 )             , 0.500, "  0.000 -> 0.500" );
  assert.equal( obj.sigmoid(   0.001 ).toFixed( 3 ), 0.500, "  0.001 -> 0.500" );
  assert.equal( obj.sigmoid(   0.010 ).toFixed( 3 ), 0.502, "  0.010 -> 0.502" );
  assert.equal( obj.sigmoid(   0.100 ).toFixed( 3 ), 0.525, "  0.100 -> 0.525" );
  assert.equal( obj.sigmoid(   1.000 ).toFixed( 3 ), 0.731, "  1.000 -> 0.731" );
  assert.equal( obj.sigmoid(  10.000 ).toFixed( 3 ), 1.000, " 10.000 -> 1.000" );
});

