// Canvas width and height
var cw = 600;
var ch = 420;

var alvSize = 8;
var alvMargin = 2;
var bezNpoints = 30;
var pwMin = 100; 

var alvDist = alvSize + alvMargin;

var SLung = new sv.SptLung();
SLung.Fspt = 12;
SLung.Ti = 1.5;

function setup() {
	createCanvas(cw, ch);
	frameRate(8);
	stroke(0);
	fill(235);
}

function draw() {

	clear();

	SLung.time = millis() / 1000;
	iFactor = SLung.Pmus / SLung.Pmax;

	var pwGrow = pwMin * .10 * iFactor;
	var pw = pwMin + pwGrow;
	var dc = 60  - 30* iFactor;

	var cCurve1 = abs(pwMin + .9 * pwGrow) * 1.8;
	var cCurve2 = abs(pwMin + .1 * pwGrow) * 2.5;

  // Poumon droit (à la gauche de l'écran)
	window.p2 = new poumon( .5*cw - pw - 4, ch - 5, pw, dc, cCurve2, cCurve1);
	window.p2.dessinerGrille();
	//window.p2.dessinerContour();

  // Poumon gauche (à la droite de l'écran)
	window.p1 = new poumon(cw/2 +8, ch - 4, pw, dc, cCurve1, cCurve2);
	window.p1.dessinerGrille();

}

function drawTwoLungs(){
}
