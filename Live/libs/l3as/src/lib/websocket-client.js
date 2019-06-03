import io from 'socket.io-client';
import { ENDPOINTS, EVENTS } from "@live/constants";

/*
	Socket-Client is part of 3LAS (Low Latency Live Audio Streaming)
	https://github.com/JoJoBond/3LAS
*/
function WebSocketClient(StreamId, ErrorCallback, ConnectCallback,
  DataReadyCallback, DisconnectCallback, StreamEndedExpectedCallback, StreamEndedUnexpectedCallback) {
  // Check callback argument
  if (typeof ErrorCallback !== 'function')
    throw new Error('WebSocketClient: ErrorCallback must be specified');
  if (typeof ConnectCallback !== 'function')
    throw new Error('WebSocketClient: ConnectCallback must be specified');
  if (typeof DataReadyCallback !== 'function')
    throw new Error('WebSocketClient: DataReadyCallback must be specified');
  if (typeof DisconnectCallback !== 'function')
    throw new Error('WebSocketClient: DisconnectCallback must be specified');
  if (typeof StreamEndedExpectedCallback !== 'function')
    throw new Error('WebSocketClient: StreamEndedExpectedCallback must be specified');
  if (typeof StreamEndedUnexpectedCallback !== 'function')
    throw new Error('WebSocketClient: StreamEndedUnexpectedCallback must be specified');

  this._ErrorCallback = ErrorCallback;
  this._ConnectCallback = ConnectCallback;
  this._DataReadyCallback = DataReadyCallback;
  this._DisconnectCallback = DisconnectCallback;
  this._StreamEndedExpectedCallback = StreamEndedExpectedCallback;
  this._StreamEndedUnexpectedCallback = StreamEndedUnexpectedCallback;

  // Client is not yet connected
  this._IsConnected = false;

  // Create socket, connect to URI
  const websocketEndpoint = ENDPOINTS.api + ENDPOINTS.websocket;
  this._Socket = io({ reconnectionAttempts: 3, path: websocketEndpoint });

  this._Socket.on("connect", this.__Socket_OnOpen.bind(this));
  this._Socket.on("error", this.__Socket_OnError.bind(this));
  this._Socket.on(EVENTS.subscriptionError, this.__Socket_OnError.bind(this));
  this._Socket.on(EVENTS.streamEndedExpected, this.__Socket_StreamEndedExpected.bind(this));
  this._Socket.on(EVENTS.streamEndedUnexpected, this.__Socket_StreamEndedUnexpected.bind(this));
  this._Socket.on("reconnect_failed", this.__Socket_OnClose.bind(this));

  this._Socket.on(StreamId, this.__Socket_OnMessage.bind(this));
  this._Socket.emit("subscribe", StreamId);
}


// Pubic methods (external functions):
// ===================================

// Returns current connection status
WebSocketClient.prototype.GetStatus = function () {
  // Return boolean
  return this._IsConnected;
};

// Disconnect from the websocket
WebSocketClient.prototype.Disconnect = function () {
  this._Socket.close();
  this._IsConnected = false;
  console.debug("Disconnecting from server.");
};


// Internal callback functions
// ===========================

// Handle errors
WebSocketClient.prototype.__Socket_OnError = function (event) {
  if (this._IsConnected == true)
    this._ErrorCallback("Socket fault.");
  else
    this._ErrorCallback("Could not connect to server.");
};

WebSocketClient.prototype.__Socket_StreamEndedExpected = function (event) {
  this._StreamEndedExpectedCallback();
};

WebSocketClient.prototype.__Socket_StreamEndedUnexpected = function (event) {
  this._StreamEndedUnexpectedCallback();
};

// Change connetion status once connected
WebSocketClient.prototype.__Socket_OnOpen = function (event) {
  this._ConnectCallback();
  this._IsConnected = false;
};

// Change connetion status on disconnect
WebSocketClient.prototype.__Socket_OnClose = function (event) {
  // if (this._IsConnected == true && (this._Socket.readyState == 2 || this._Socket.readyState == 3)) {
  //if (this._IsConnected == true ) {
  //    this._IsConnected = false;
  this._DisconnectCallback();
  //}
};

// Handle incomping data
WebSocketClient.prototype.__Socket_OnMessage = function (data) {
  // Trigger callback
  this._DataReadyCallback(data);
};

export default WebSocketClient;