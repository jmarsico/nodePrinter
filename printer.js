
var osc = require('osc-min'); 
var udp = require( 'dgram' );
var cmd=require('node-cmd');

var inport = 12345;
console.log ("OSC listener running at http://localhost:" + inport);

var printerName = 'Canon_MG3600_series_2';
var printCommand = 'lp -d';
var fileName = 'pages.pdf';

sock = udp.createSocket("udp4", function(msg, rinfo) {
  var error, error1;
  try {
  	var message = osc.fromBuffer(msg);
    console.log('message received: ' + message.address + ' ' + message.args[0].value);
  	if(message.address == '/printer'){
  		printerName = message.args[0].value;
  		printCommand = 'lp -d ' + printerName + ' ' + fileName;
  		console.log('COMMAND: ' + ' ' +printCommand);

  		cmd.run(printCommand);
  		// return console.log(message);
  	}

  	
    

  } catch (error1) {
    error = error1;
    return console.log("invalid OSC packet");
  }
});

sock.bind(inport);
