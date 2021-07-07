//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
// var pauseButton = document.getElementById("pauseButton");

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
// pauseButton.addEventListener("click", pauseRecording);
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var sepLabel = document.getElementById("sep");
var totalSeconds = 0;

var timex;
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  sepLabel.innerHTML = " : "
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60) ) ;
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
function startRecording() {
	console.log("recordButton clicked");
    $('#recordButton').css('z-index','400');
    $('#stopButton').css('z-index','500');
	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	recordButton.disabled = true;
	stopButton.disabled = false;
	// pauseButton.disabled = false

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
            sampleRate might change after getUserMedia is called, 
            like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();


		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()

        console.log("Recording started");
        $('.record-time').fadeIn();
		totalSeconds = 0;
		 
		
        timex = setInterval(setTime, 1000);
	}).catch(function(err) {
		totalSeconds = 0;
        clearInterval(timex)



    	recordButton.disabled = false;
        stopButton.disabled = true;
        $('#recordButton').css('z-index','500');
    $('#stopButton').css('z-index','400');
        // alert(err);
        if (err.name == "NotFoundError") {
            $('#err-modal').find('h6').text('لم يتم العثور على الميكروفون')
            $('#err-modal').find('p').text(`
            لا يمكنك تسجيل رسالة صوتية لأنه يبدو أن جهاز الكمبيوتر الخاص بك لا يحتوي على ميكروفون.
             حاول توصيل واحد أو إذا كان لديك واحد متصل ، فحاول إعادة تشغيل المتصفح.`);
             $('#err-modal').modal('show');
        }else {
            $('#err-modal').find('h6').text('السماح بالميكروفون')
            $('#err-modal').find('p').text(`
            لتسجيل الرسائل الصوتية ، يحتاج taleem إلى الوصول إلى الميكروفون. انقر على الايقونه في شريط URL واختر "السماح دائمًا لـ taleem.com بالوصول إلى الميكروفون".`);
             $('#err-modal').modal('show');
        }
        console.log(err.name)
        return;
        
        
    	// pauseButton.disabled = true
	});
}

// function pauseRecording(){
// 	console.log("pauseButton clicked rec.recording=",rec.recording );
// 	if (rec.recording){
// 		//pause
// 		rec.stop();
// 		// pauseButton.innerHTML="Resume";
// 	}else{
// 		//resume
// 		rec.record()
// 		// pauseButton.innerHTML="Pause";

// 	}
// }

function stopRecording() {
	totalSeconds = 0;
    clearInterval(timex);
    secondsLabel.innerHTML = '00';
  sepLabel.innerHTML = " : "
  minutesLabel.innerHTML = '00' ;
    $('.record-time').hide();
	console.log("stopButton clicked");
    $('#recordButton').css('z-index','500');
    $('#stopButton').css('z-index','400');
	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	// pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	// pauseButton.innerHTML="Pause";
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);
}
var xo;
function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = new Date().toISOString();
    console.log(filename)
	//add controls to the <audio> element
	au.controls = true;
	au.src = url;
   xo = au.src;

   console.log(xo)
   		//update the format 
		document.getElementById("audio-url").innerHTML=xo;

	//save to disk link
	// link.href = url;
	// link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	// link.innerHTML = "Save to disk";

	//add the new audio element to li
	// li.appendChild(au);
	
	//add the filename to the li
	// li.appendChild(document.createTextNode(filename+".wav "))

	//add the save to disk link to li
	// li.appendChild(link);
	
	//upload link
	// var upload = document.createElement('a');
	// upload.href="#";
	// upload.innerHTML = "Upload";
	// upload.addEventListener("click", function(event){
	// 	  var xhr=new XMLHttpRequest();
	// 	  xhr.onload=function(e) {
	// 	      if(this.readyState === 4) {
	// 	          console.log("Server returned: ",e.target.responseText);
	// 	      }
	// 	  };
	// 	  var fd=new FormData();
	// 	  fd.append("audio_data",blob, filename);
	// 	  xhr.open("POST","upload.php",true);
	// 	  xhr.send(fd);
	// })
	// li.appendChild(document.createTextNode (" "))//add a space in between
	// li.appendChild(upload)//add the upload link to li

	//add the li element to the ol
	// recordingsList.appendChild(li);
}