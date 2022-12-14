const pp = document.getElementById("clock");
const dd = document.getElementById("date1");
const mm = document.getElementById("main");
const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let s = 0;
let m = 0;
let ms = 0;
let h = 0;
var hh = 0;
var mi = 0;
var x;
// var time12 = "00";
const insertZerro = (a) => {
	if (a < 10) {
		a = "0" + a;
	}
	return a;
};

function getTime() {
	const date1 = new Date();
	let day = weekDay[date1.getDay()];
	let date = date1.getDate();
	let month = date1.getMonth();
	let hour = insertZerro(date1.getHours());
	let minute = insertZerro(date1.getMinutes());
	let second = insertZerro(date1.getSeconds());
	const t = {
		month,
		day,
		date,
		hour,
		minute,
		second,
	};
	return t;
}

const clock = () => {
	const t = getTime();
	dd.innerHTML = t.day + " " + t.month + "/" + t.date;
	pp.innerHTML = t.hour + ":" + t.minute + "</br>" + t.second;
	// large.innerHTML = hour + ":" + minute + ":" + second;
};

function updateLargeClock(large) {
	const t = getTime();
	large.innerText = t.hour + ":" + t.minute + ":" + t.second;
}

const largeClock = () => {
	let page1 = document.getElementById("page1");
	page1.innerHTML = '<div id="large"></div> <a href="index.html">WATCH</a>';
	const large = document.getElementById("large");
	large.style.display = "block";
	large.style.backgroundColor = "black";
	clearInterval(x);
	updateLargeClock(large);
	x = setInterval(() => {
		updateLargeClock(large);
	}, 1000);
};

const mode = () => {
	mm.innerHTML =
		'<ul class="menue"> <li><input type="button" value="timer" onclick="timerMode()"></li> <li><input type="button" value="Stop Watch" onclick="stopWatchMode()"></li>  <li><input type="button" value="Location" onclick="location()"></li> <li><input type="button" value="Back" onclick="location.reload()"></li> </ul >';
};

function timerMode() {
	clearInterval(x);
	mm.innerHTML = `<input type="button" id="start" class="date center"  value="START"><input type="button" class="date center" id="settimer" value="Set Timer"><p class="date center" >00:00</p>`;
	const ts = document.getElementById("start");
	ts.style = "display: none";

	const tt = document.getElementById("settimer");
	tt.onclick = function () {
		setTimer();
	};
}
function timer(time) {
	hh = Number(time[0] + time[1]);
	mi = Number(time[3] + time[4]);

	mm.innerHTML = `<input type="button" class="date center"  value="START" id="starttimer"><input type="button" class="date center" id="settimer" value="Set Timer"><p class="date center" >${insertZerro(
		hh
	)}:${insertZerro(mi)}</p>`;

	const tt = document.getElementById("settimer");
	tt.onclick = function () {
		setTimer();
	};

	const ts = document.getElementById("starttimer");
	ts.onclick = function () {
		startTimer();
		x = setInterval(startTimer, 1000);
	};
}

function setTimer() {
	mm.innerHTML =
		'<input type="time" id="inputTime" class="date center"  placeholder="hh:mm" value="00:00" ><input type="button" class="date center" id="set" value="SET">';

	document.getElementById("set").onclick = function () {
		time12 = document.getElementById("inputTime").value;
		timer(time12);
	};
}

function startTimer() {
	// tt.onclick = function () {
	// 	setTimer();
	// };
	if ((hh == 0) & (mi == 0)) {
		document.getElementById("aaa").innerHTML = "EXPIRED";
		document.getElementById("aaa").classList.toggle("show");

		mi = 1;
	} else {
		mm.innerHTML = `<input type="button" class="date center"  value="BACK" onclick="timerMode()"> <p class="date center" id="aaa">${insertZerro(
			hh
		)}:${insertZerro(mi)}</p>`;
	}
	mi = mi - 1;
	if (mi < 0) {
		hh = hh - 1;
		mi = 59;
	}
}

const stopWatchMode = () => {
	mm.innerHTML =
		'<p class="center" id="stopWatch">00:00</br><span>00</span></p><input type="button" class="date start center" id="start" onclick="myStart()" value="START"><input type="button" class="date reset center" id="reset" onclick="reset()" value="RESET">';

	// ts.onclick = start;

	const tr = document.getElementById("reset");
	tr.onclick = reset;
};

function myStart() {
	clearInterval(x);
	x = setInterval(stopWatch, 10);
	const ts = document.getElementById("start");

	ts.value = "STOP";
	// ts.style = "transform: translate(150%, -200%) rotate(60deg);";
	ts.onclick = stop;
}

function stopWatch() {
	if (ms > 99) {
		s++;
		ms = 0;
	}
	if (s > 59) {
		m++;
		s = 0;
	}

	const tt = document.getElementById("stopWatch");
	let ms1 = insertZerro(ms);
	let s1 = insertZerro(s);
	let m1 = insertZerro(m);
	tt.innerHTML = `${m1}:${s1}</br><span>${ms1}</span>`;
	ms = ++ms;
}

function stop() {
	clearInterval(x);
	const ts = document.getElementById("start");

	ts.value = "START";
	ts.onclick = myStart;
}

function reset() {
	clearInterval(x);
	ms = 0;
	s = 0;
	m = 0;
	const ts = document.getElementById("start");

	ts.value = "START";
	ts.onclick = myStart;
	const tt = document.getElementById("stopWatch");

	tt.innerHTML = "00:00</br><span>00</span>";
}
clock();
let time = setInterval(clock, 500);
