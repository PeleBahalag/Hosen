let video;
//            Intro
//          /      \
//        Con3 ->  Con2
//        /       /    \
//       Con4   Con5    Con6
// 
let jsonPath = {
    Intro: {
        'btn1': 'Con3',
        'btn2': 'Con2',
        'btn1Text': 'אסתער על המחבלים',
        'btn2Text': 'אנהל משא ומתן לשחרור האזרחים מידהם'
    },
    Con3: {
        'btn1': 'Con4',
        'btn2': 'Con2',
        'btn1Text': 'עוצר אותו ומקפיא מצב',
        'btn2Text': 'מסתער איתו על המחבלים'

    },
    Con2: {
        'btn1': 'Con5',
        'btn2': 'Con6',
        'btn1Text': 'להשאר עם המחבל הכבול ולטפל בפצועים',
        'btn2Text': 'רדיפה אחרי המחבל שברח'
    }
}

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
    let btn1 = document.getElementById("btn1div");
    let btn2 = document.getElementById("btn2div");
    let videoName = getVideoName();
    document.getElementById('txt1').innerText = jsonPath[videoName].btn1Text;
    document.getElementById('txt2').innerText = jsonPath[videoName].btn2Text;

    btn1.addEventListener("click", () => {
        nextSituation(jsonPath[videoName].btn1);
    });
    btn2.addEventListener("click", () => {
        nextSituation(jsonPath[videoName].btn2);
    });
    document.getElementById("btn-container").style.display = "flex";
    document.getElementById("restart").style.display = "block";
    window.removeEventListener("click", togglePause);
    document.getElementById("restart").addEventListener("click", startVid);

    // video.style.cssText = "filter: blur(30px);"
}

const getVideoName = () => {
    let sourcePath = source.getAttribute('src');
    sourcePath = sourcePath.replaceAll('/', '');
    sourcePath = sourcePath.replaceAll('assets', '');
    sourcePath = sourcePath.replaceAll('videos', '');
    sourcePath = sourcePath.replaceAll('.', '');
    sourcePath = sourcePath.replaceAll('mp4', '');

    return sourcePath;
}


// ----------------
// Situations
const nextSituation = (Nextvideo) => {
    source.src = `./assets/videos/${Nextvideo}.mp4`;
    video.load();
    startVid();
}


// ---------------------
// Pause / Unpause
const togglePause = () => {
    console.log(getVideoName());
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