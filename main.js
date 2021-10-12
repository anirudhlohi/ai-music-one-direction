song = "";
leftWristX = 0;
leftWristY = 0;
rightWrisX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status_song1 = "";
staus_song2 = "";
function preload(){
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}

function setup(){
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}

function draw(){
  image(video, 0, 0, 600,500);

  fill("#f70800");
  stroke("#f70000");
  
  status_song1 = song1.isPlaying();
  staus_song2 = song2.isPlaying();
  if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song2.stop();
    if(status_song1 == false){
song1.play();
document.getElementById("song_playing").innerHTML = "Playing - Harry Potter";
    }
  }

  
  
 
  if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if(status_song2 == false){
song2.play();
document.getElementById("song_playing").innerHTML = "Playing - Peter Pan";
    }
  }
  
}
function modelLoaded(){
  console.log("Model Loaded")
}
function gotPoses(results){
 if(results.length > 0){
   console.log(results);
   leftWristX = results[0].pose.leftWrist.x;
   leftWristY = results[0].pose.leftWrist.y;
   console.log(leftWristX , leftWristY);

   rightWristX = results[0].pose.rightWrist.x;
   rightWristY = results[0].pose.rightWrist.y;
console.log(rightWristX , rightWristY);


scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("Score Left Wrist = "+ scoreLeftWrist);
  }
}