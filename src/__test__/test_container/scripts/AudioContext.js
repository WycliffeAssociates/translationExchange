"use strict";

exports.__esModule = true;
//var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioCtx='';
if (! window.AudioContext) {
  if (!window.webkitAudioContext) {
    console.log('bad_browser');
    //return;
  }
  audioCtx = window.webkitAudioContext;
}
else {
  audioCtx = new (window.AudioContext);
}
var analyser = audioCtx.createAnalyser();

var AudioContext = {
  getAudioContext: function getAudioContext() {
    return audioCtx;
  },
  getAnalyser: function getAnalyser() {
    return analyser;
  },
  decodeAudioData: function decodeAudioData() {
    audioCtx.decodeAudioData(audioData).then(function (decodedData) {
      // use the decoded data here
    });
  },
};

exports.default = AudioContext;
module.exports = exports["default"];
