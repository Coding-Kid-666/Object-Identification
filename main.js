Webcam.set({
    width: 350,
    height: 300,
    format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);


function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML = '<img id="capturedImg" src="'+data_uri+'"/>';
        console.log("It works!");
    });
}
console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XlgrMZF5C/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model has succesfully loaded!")
}

function identifyObject(){
    img = document.getElementById("capturedImg");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
       console.error(error)
        console.log("Error")
        document.getElementById("ifError").innerHTML =  "Sorry! We ran into an error!Here is the error:"+ error;
    }else{
        console.log(results);
        console.log("It works");
        document.getElementById("resultObjectname").innerHTML = results[0].label;
        document.getElementById("resultObjectaccuracy").innerHTML = results[0].confidence.toFixed(3);

    }
}