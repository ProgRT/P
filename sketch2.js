
var cw = 600;
var ch = 420;
var alvSize = 10;
var alvMargin = 3;
var bezNpoints = 30;

var SLung = new sv.SptLung();
SLung.Fspt = 12;
SLung.Ti = 1.5;


var pwmin = 250;

var alvDist = alvSize + alvMargin;
var pwmax = pwmin * 1.075;

function setup() {
	createCanvas(cw, ch);
	frameRate(8);
	stroke(0);
	fill(235);
	noLoop();
}

function draw() {

	clear();

	SLung.time = millis() / 1000;
	iFactor = SLung.Pmus / SLung.Pmax;

	var pwMin = 250; 

	var pwGrow = pwMin * .10 * iFactor;

  // Largeur de la cage thoracique
	var pw = pwMin + pwGrow;
	
	// Courbure du diafragme
	var dc = 140  - 80* iFactor;

	var cCurve1 = abs(pwMin + .9 * pwGrow) * 1.5;
	var cCurve2 = abs(pwMin + .1 * pwGrow) * 2.5;

	var p1 = new poumon(cw/2 +10, ch - 5, pw, dc, cCurve1, cCurve2);
	p1.dessinerGrille();

	var p2 = new poumon( (cw - 2 * pw - 20) / 2, ch - 5, pw, dc, cCurve2, cCurve1);
	p2.dessinerGrille();

	window.p1 = p1;

}
