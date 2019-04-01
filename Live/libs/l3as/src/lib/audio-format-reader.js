/*
	Format-Reader is part of 3LAS (Low Latency Live Audio Streaming)
	https://github.com/JoJoBond/3LAS
*/

function AudioFormatReader(ErrorCallback, DataReadyCallback) {
  // Check callback argument
  if (typeof ErrorCallback !== 'function')
    throw new Error('AudioFormatReader: ErrorCallback must be specified');

  if (typeof DataReadyCallback !== 'function')
    throw new Error('AudioFormatReader: DataReadyCallback must be specified');

  this._ErrorCallback = ErrorCallback;
  this._DataReadyCallback = DataReadyCallback;
}


// Pubic methods (external functions) prototypes:
// ==============================================

// Push data into reader
AudioFormatReader.prototype.PushData = function (data) {
};

// Check if samples are available
AudioFormatReader.prototype.SamplesAvailable = function () {
  return false;
};

// Get a single bunch of sampels from the reader
AudioFormatReader.prototype.PopSamples = function () {
  return null;
};

// Deletes all encoded and decoded data from the reader (does not effect headers, etc.)
AudioFormatReader.prototype.PurgeData = function () {
};

// Force the reader to analyze his data
AudioFormatReader.prototype.Poke = function () {
};
