var $elem = $('<div>').attr('id', 'testElemContainer').appendTo('body');

QUnit.test( "construct with parameter", function( assert ) {
  var keys = [ 'x', 'y', 'z' ];
  var obj = new NeuronCell( keys );

  assert.equal( typeof obj.id, "string", "'id' is string");
  assert.equal( obj.id.length, 8, "'id' length is 8");
  
  assert.equal( typeof obj.v, "number", "'v' is number");
  assert.ok( obj.v <=  1.0, "less than or equal to 1.0" );
  assert.ok( obj.v >= -1.0, "greater than or equal to -1.0" );
  assert.ok( obj.v !=  0.0, "not equal to 0.0" );

  assert.equal( typeof obj.w, "object", "'w' is object");
  assert.equal( Object.keys( obj.w ).length, 3, "'w' is empty");
});

QUnit.test( "construct without parameter", function( assert ) {
  var obj = new NeuronCell();

  assert.equal( typeof obj.id, "string", "'id' is string");
  assert.equal( obj.id.length, 8, "'id' length is 8");
  
  assert.equal( typeof obj.v, "number", "'v' is number");
  assert.ok( obj.v <=  1.0, "less than or equal to 1.0" );
  assert.ok( obj.v >= -1.0, "greater than or equal to -1.0" );
  assert.ok( obj.v !=  0.0, "not equal to 0.0" );

  assert.equal( typeof obj.w, "object", "'w' is object");
  assert.equal( Object.keys( obj.w ).length, 0, "'w' is empty");
});

QUnit.test( "getRandomString()", function( assert ) {
  assert.equal( typeof NeuronCell.getRandomString(), "string", "type is string");
  assert.ok( /^[0-9a-z]*$/.exec(NeuronCell.getRandomString()), "regexp pattern" );
  assert.equal( NeuronCell.getRandomString(     ).length,   8, "default length is 8" );
  assert.equal( NeuronCell.getRandomString(   1 ).length,   1, "length is changed to   1" );
  assert.equal( NeuronCell.getRandomString( 100 ).length, 100, "length is changed to 100" );
  var map = {};
  for ( var i = 0; i < 10000; i++ ) {
    var str = NeuronCell.getRandomString( 8 );
    assert.notOk( str in map, "duplicate string is not exists" );
    map[str] = true;
  }
});

QUnit.test( "getRandomNumber() without parameter", function( assert ) {
  var actual = NeuronCell.getRandomNumber();
  assert.equal( typeof actual, 'number', "type is number" );
  assert.ok( actual <=  1.0, "less than or equal to 1.0" );
  assert.ok( actual >= -1.0, "greater than or equal to -1.0" );
  var sum = 0.0, min = 0.0, max = 0.0;
  for ( var i = 0; i < 1000; i++ ) {
    var n = NeuronCell.getRandomNumber();
    assert.ok( n <=  1.0, "less than or equal to 1.0" );
    assert.ok( n >= -1.0, "greater than or equal to -1.0" );
    sum += n;
    min = Math.min( min, n );
    max = Math.max( max, n );
  }
  var avg = sum / 1000;
  assert.equal( avg.toFixed(1),  0.0, "1000 times average is about  0.0" );
  assert.equal( min.toFixed(1), -1.0, "1000 times minimum is about -1.0" );
  assert.equal( max.toFixed(1),  1.0, "1000 times maximum is about  1.0" );
});

QUnit.test( "getRandomNumber() with parameter", function( assert ) {
  var actual = NeuronCell.getRandomNumber( -1, 3 );
  assert.equal( typeof actual, 'number', "type is number" );
  assert.ok( actual <=  3.0, "less than or equal to 3.0" );
  assert.ok( actual >= -1.0, "greater than or equal to -1.0" );
  var sum = 0.0, min = 0.0, max = 0.0;
  for ( var i = 0; i < 1000; i++ ) {
    var n = NeuronCell.getRandomNumber( -1, 3 );
    assert.ok( n <=  3.0, "less than or equal to 3.0" );
    assert.ok( n >= -1.0, "greater than or equal to -1.0" );
    sum += n;
    min = Math.min( min, n );
    max = Math.max( max, n );
  }
  var avg = sum / 1000;
  assert.equal( avg.toFixed(1),  1.0, "1000 times average is about  1.0" );
  assert.equal( min.toFixed(1), -1.0, "1000 times minimum is about -1.0" );
  assert.equal( max.toFixed(1),  3.0, "1000 times maximum is about  3.0" );
});

QUnit.test( "initV() and getV()", function( assert ) {
  var obj = new NeuronCell();
  var actual = obj.initV();
  assert.equal( typeof actual, 'number', "type is number" );
  assert.ok( actual <=  1.0, "less than or equal to 1.0" );
  assert.ok( actual >= -1.0, "greater than or equal to -1.0" );
  assert.ok( actual !=  0.0, "not equal to 0.0" );
  assert.ok( obj.v, actual, "after initV(), the same value is set into 'v'" );
});

QUnit.test( "initW()", function( assert ) {
  var obj = new NeuronCell();
  var actual = obj.initW( ['x', 'y'] );
  assert.equal( typeof actual, 'object', "type is object" );
  assert.deepEqual( obj.w, actual, "after initW(), the same object is set into 'w'" );
});

QUnit.test( "u()", function( assert ) {
  var obj = new NeuronCell();
  obj.v = 2.3;
  obj.w = { 'x':  7.0, 'y':  1.1, 'z': -1.7 };
  var x = { 'x': -1.3, 'y':  2.0, 'z':  5.0 };
  var expected = (-1.3 * 7.0) + (1.1 * 2.0) + (-1.7 * 5.0) - 2.3;
  var actual = obj.u( x );
  assert.equal( actual, expected, "u = sigma( x_i * w_i ) - v" );
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
