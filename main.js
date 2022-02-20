
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}
console.log("ml5version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wy-xdR1ZP/model.json',model_loaded);
function model_loaded(){
    console.log("model is loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speakdata=tospeak;
    var utterThis=new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name_1").innerHTML=results[0].label;
    gesture=results[0].label;
    tospeak="";
    if(gesture=="Thumbs up"){
        document.getElementById("update_emoji_1").innerHTML="&#128077";
        tospeak="This is thumbs up";
    }
    else if(gesture=="Peace"){
        document.getElementById("update_emoji_1").innerHTML="&#9996";
        tospeak="This is a symbol of peace";
    }
    else if(gesture=="OK"){
        document.getElementById("update_emoji_1").innerHTML="&#128076";
        tospeak="This is a symbol of ok";
    }
    else if(gesture=="Thumbs down"){
        document.getElementById("update_emoji_1").innerHTML="&#128078";
        tospeak="This is thumbs down";
    }
   speak(); 
}
}