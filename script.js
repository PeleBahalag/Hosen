let video;
const correctVid = "Con3";

window.addEventListener("load", () => {
    video = document.getElementById('vid');
    let source = document.querySelector("video > source")
    startVid();
});

// ---------------------
// Start or restart a video.
const startVid = () => {
    video.load();
    video.removeAttribute('controls');
    // video.play();
    window.addEventListener("click", togglePause);
    video.addEventListener("ended", vidEnded);
    document.getElementById("btn-container").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("next").style.display = "none";
}



// ---------------------
// Add components at the end of the video (listener)
const vidEnded = (event) => {
    video.webkitExitFullscreen();
    if (source.src.includes("Intro")) {
        document.getElementById("btn-container").style.display = "flex";
        document.getElementById("restart").style.display = "block";
        window.removeEventListener("click", togglePause);
        document.getElementById("restart").addEventListener("click", startVid);

        let btn1 = document.getElementById("btn1div");
        let btn2 = document.getElementById("btn2div");
        let btn3 = document.getElementById("btn3div");
        btn1.addEventListener("click", sit1);
        btn2.addEventListener("click", sit2);
        btn3.addEventListener("click", sit3);
    } else if (source.src.includes(`BW`)) {
        source.src = './assets/videos/Intro.mp4';
        video.load();
        video.currentTime = 36.5;
        startVid();
    } else if (source.src.includes(`${correctVid}-2`)) {
        document.getElementById("restart").style.display = "block";
    } else if (source.src.includes(`-2`)) {
        source.src = source.src.replace("-2.mp4", "-2BW.mp4");
        video.load();
        startVid();
    } else {
        document.getElementById("next").style.display = "block";
        document.getElementById("restart").style.display = "block";
        window.removeEventListener("click", togglePause);
        video.style.cssText = "filter: blur(30px);"
        document.getElementById("next").addEventListener("click", secCon);
        document.getElementById("restart").addEventListener("click", startVid);
    }

}

// ----------------
// Situations
const sit1 = () => {
    source.src = './assets/videos/Con1.mp4';
    video.load();
    startVid();
}

const sit2 = () => {
    source.src = './assets/videos/Con2.mp4';
    video.load();
    startVid();
}

const sit3 = () => {
    source.src = './assets/videos/Con3.mp4';
    video.load();
    startVid();
}

// -------------
const secCon = () => {
    source.src = source.src.replace(".mp4", "-2.mp4");
    console.log(source.src)

    video.load();
    startVid();
}

// ---------------------
// Pause / Unpause
const togglePause = () => {
    let pause = document.getElementById("pause");
    if (video.paused) {
        video.play();
        pause.style.opacity = 0;
        video.style.cssText = "filter: none;"

    } else {
        video.pause();
        pause.style.opacity = .7;
    }
}