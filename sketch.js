// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/G8nXqemiC/model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

var w = window.innerWidth*0.8;
var h = window.innerHeight*0.8; 

function setup() {
  canvas=createCanvas(w, w*1.4);
  canvas.center();
  // Create the video
  video = createCapture(VIDEO);
  video.size(w, w*1.333);
  video.elt.setAttribute('playsinline','');
  video.hide();
  canvas.mousePressed(myFunction); 
  // flippedVideo = ml5.flipImage(video)
  
  // Start classifying
  classifyVideo();
}

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth*0.8;
  h = window.innerHeight*0.8;  
  canvas.size(w,w*1.333);
}

function draw() {
  background(1,169,130); //HPE Green
  // Draw the video
  // image(flippedVideo, 0, 0);
  image(video, 0, 0);
  // Draw the label
  fill(255);
  textSize(20);
  textAlign(CENTER);
  fill(0);
  text(label, width / 2, height - 4);  
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

function myFunction() {
  if (label == "EL300") {
    window.location.href = "https://buy.hpe.com/hk/en/servers/edgeline-systems/edgeline-systems/edgeline-converged-edge-systems/hpe-edgeline-el300-converged-edge-system/p/1011127891";
  } else if (label == "Gen10p") {
    //
    window.location.href = "https://buy.hpe.com/hk/en/servers/proliant-microserver/proliant-microserver/proliant-microserver/hpe-proliant-microserver-gen10-plus/p/1012241014";

  } else if (label == "GL20") {
    //
    window.location.href = "https://buy.hpe.com/hk/en/servers/edgeline-systems/edgeline-systems/edgeline-intelligent-gateways/hpe-gl20-iot-gateway/p/1008670391";
  } else {

  }

}
