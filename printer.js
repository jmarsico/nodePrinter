
var osc = require('osc-min'); 
var udp = require( 'dgram' );
var cmd=require('node-cmd');

var inport = 12345;
console.log ("OSC listener running at http://localhost:" + inport);

var printerName;
var printCommand = 'lp -d';
var fileName = 'test.txt';

sock = udp.createSocket("udp4", function(msg, rinfo) {
  var error, error1;
  try {
  	var message = osc.fromBuffer(msg);
  	if(message.address == '/printer'){
  		printerName = message.args[0].value;
  		printCommand = 'lp -d ' + printerName + ' ' + fileName;
  		console.log(printCommand);

  		cmd.run(printCommand);
  		return console.log(message);
  	}

  	
    

  } catch (error1) {
    error = error1;
    return console.log("invalid OSC packet");
  }
});

sock.bind(inport);
