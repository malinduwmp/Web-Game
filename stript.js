var bs = new Audio("backgroundmusic.mp3");
bs.loop = true;

var rs = new Audio("run.mp3");
rs.loop = true;
var js = new Audio("jump.mp3");
var ds = new Audio("dead.mp3");

var rw = 0; //Run worker
var b = 0;  //background
var bw = 0; //background worker
var fw = 0; //flame worker
var fid = 0;
var j = 1; //jump
var u = 0; //score
var sw = 0; //score worker
var jw = 0; //jump worker
var mt = 560;
var p = 1000;
var img = document.getElementById("dino"); //dino 
var r = 1; //run
var d = 1; //dead
var dw = 0; //dead worker
var i = 1; ///idel
var iw = 0;

iw = setInterval(idle, 100);



function key(event) {
    if (event.which == 13) {
        if (rw == 0) {
            clearInterval(iw);
            fid = f()
            fw = setInterval(move, 80);
            rw = setInterval(run, 80);
            rs.play();
            bs.play();
            bw = setInterval(back, 80);
            sw = setInterval(score, 1000);

        }
    }
    if (event.which == 32) {
        if (jw == 0) {
            clearInterval(iw);
            clearInterval(rw);
            rs.pause();
            bs.play();
            jw = setInterval(jump, 100);
            js.play();
            rw = -1;
        }
    }
}


function f() {
    for (var y = 0; y < 500; y++) {
        var a = document.createElement("img");
        a.src = "flame.gif";
        a.className = "f";
        a.style.marginLeft = p + "px";

        if (y <= 5) {
            p = p + 700;
        }
        if (y >= 6) {
            p = p + 450;
        }

        a.id = "d" + y;
        document.getElementById("b").appendChild(a);
    }
}

function move() {
    for (var y = 0; y < 100; y++) {
        var z = getComputedStyle(document.getElementById("d" + y));
        var w = parseInt(z.marginLeft) - 20;
        document.getElementById("d" + y).style.marginLeft = w + "px";

        if (w > 80 & w <= 200) {
            if (mt > 500) {
                clearInterval(rw);
                clearInterval(jw);
                jw = -1;
                clearInterval(fw);
                clearInterval(bw);
                clearInterval(sw);
                dw = setInterval(dead, 100);
                rs.pause();
                ds.play();
            }
        }
    }
}

 
function run() {
    r = r + 1;
    if (r == 9) {
        r = 1;
    }
    img.src = "Run (" + r + ").png";
}


function back() {
    b = b - 20
    document.getElementById("b").style.backgroundPositionX = b + "px";
}

function idle() {
    i = i + 1;
    if (i == 11) {
        i = 1;

    }
    img.src = "Idle (" + i + ").png";

}


function jump() {
    if (j <= 6) {
        mt = mt - 30;
    }
    if (j >= 7) {
        mt = mt + 30;
    }
    img.style.marginTop = mt + "px";

    j = j + 1;
    if (j == 13) {
        j = 1;
        clearInterval(jw);
        rw = 0;
        rw = setInterval(run, 80);
        rs.play();
        jw = 0;

        if (fid == 0) {
            fid = f();
        }
        if (fw == 0) {
            fw = setInterval(move, 80);
        }
        if (bw == 0) {
            bw = setInterval(back, 80);
        }
        if (sw == 0) {
            sw = setInterval(score, 1000);
        }
    }
    img.src = "Jump (" + j + ").png"
}


function score() {
    u = u + 5
    document.getElementById("score").innerHTML = u;
}


function dead() {
    d = d + 1;
    if (d == 9) {
        d = 8;
        img.style.marginTop = "690px";
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = u;
    }
    img.src = "Dead (" + d + ").png";
}


function re() {
    location.reload();
}

