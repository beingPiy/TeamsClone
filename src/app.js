// minimalistic lightweight nodeJS web application framework
let express = require( 'express' );

// importing express framework in variable app
let app = express();

// importing http modue
let http = require('http') ;

// create the server using http module and return the resulting instance
let server = http.createServer( app );

// creates a socket.io server
let io = require( 'socket.io' )( server, { serveClient: true } );

// stream module will return a function which sets up socket for communication
let stream = require( './stream' );

// module for working with paths
let path = require( 'path' );

// importing middleware for serving a favicon
let favicon = require( 'serve-favicon' );


// using the middleware to serve favicon 
app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );

// supplying assets as middleware
app.use( '/assets', express.static( __dirname + '/assets' ) );

// home page renders index.html file
app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );

// streams from nodeJS server to browser
io.of( '/stream' ).on( 'connection', stream );

// binds and listen for connections for given port
server.listen( 3000 );
