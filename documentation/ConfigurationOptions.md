# Configuration Options

There are a few configuration options you can provide to integrate the app into your environment. We use the a `.env` file, namely `live.env` to store key value pairs of the configuration options (more on dotenv [here](https://github.com/motdotla/dotenv#readme)). See [live.env.example](../Live/live.env.example) for reference.

## The available options

PRODUCTION (boolean) default: false  
Simulates the shutdown. Useful for development

STANDALONE (boolean) default: true  
Serves the client and admin apps. You can set this to false when you want to serve the apps via a "real" webserver, e.g. Nginx or IIS 

PORT (integer) default: 3000  
Set the port to listen on

DATABASE (string) default: data/db.json  
Specify the path to the database file you want to use. Useful for developing. 

LOGLEVEL (debug | info | warn | error) default: debug  
Specify the verbosity of the loggin on the console. Does not affect the logfiles.

LOGDIRECTORY (string) default: logs  
Specify a custom directory to write the logfiles to.

FFMPEGPATH (string) default: see blow  
The path to ffmpeg. It should not be necessary to change it. The right version of Ffmpeg is delivered wiht the app.

EXECUTABLE (boolean) default: false  
Tells the app whether it is running as a executable as opposed to a dedicated server. When true, the shutdown functionaliy will end the process and not try to shut down the computer.

SIMULATE (boolean) default: false  
Simulates the streaming, e.g. the sessions and strams will start but no audio data is captured and transferred. Useful for development.

FILESOURCE (boolean) default: false  
Enables streaming from a file. The absolute path to the file has to be given in the deviceId field of a stream in the database. Useful for development.