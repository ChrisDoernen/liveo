

// Server settings

















/*
	Log-Window is part of 3LAS (Low Latency Live Audio Streaming)
	https://github.com/JoJoBond/3LAS
*/

function LogEvent(info) {
  console.debug(info);
}

function ToggleLogWindow() {
  var logwindow = document.getElementById("logwindow");
  if (logwindow.style.display == "block") {
    logwindow.style.display = "none";
  }
  else {
    logwindow.style.display = "block";
  }
}
