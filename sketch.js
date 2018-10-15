var cw = 600;
var ch = 420;
var alvSize = 10;
var alvMargin = 3;
var bezNpoints = 30;
var SLung = new sv.SptLung();
SLung.Fspt = 12;
SLung.Ti = 1.5;


var bz1sy = 500;
var pwmin = 250;

var alvDist = alvSize + alvMargin;
var pwmax = pwmin * 1.075;
var dcurvemax = pwmin * .3;
var dcurvemin = pwmin * .15;

class poumon{

	constructor(sx, sy, pw, dcurve, cCurve1, cCurve2, side){
		this.sx = sx;
		this.sy = sy;
		this.ex = sx + pw;

		this.bezNpoints = 30;
		this.dCtlY = sy - dcurve;
		this.cCtlY1 = sy - cCurve1; 
		this.cCtlY2 = sy - cCurve2; 

		this.cBezYpoints = [];
		this.cBezXpoints = [];
		this.dBezYpoints = [];
		this.dBezXpoints = [];

		this.alveoles = [];

		for (let i = 0; i < bezNpoints; i++){
			this.dBezYpoints.push(bezierPoint(this.sy, this.dCtlY, this.dCtlY, sy, i/this.bezNpoints));
			this.dBezXpoints.push(bezierPoint(this.sx, this.sx, this.ex, this.ex, i/this.bezNpoints));

			this.cBezXpoints.push(bezierPoint(this.sx, this.sx, this.ex, this.ex, i/this.bezNpoints));
			this.cBezYpoints.push(bezierPoint(this.sy, this.cCtlY2, this.cCtlY1, this.sy, i/this.bezNpoints));
		}
		this.apex = min(this.cBezYpoints);
	}

	dessinerContour(){
		noFill();

		beginShape();
		vertex(this.sx, this.sy);
		bezierVertex(this.sx, this.dCtlY, this.ex, this.dCtlY, this.ex, this.sy); // Diaphragme
		bezierVertex(this.ex, this.cCtlY1, this.sx, this.cCtlY2, this.sx, this.sy);  // Coutour du poumon
		endShape();
	}

	dessinerPoints(){
		var elw = 7;
		for (let i = 0; i < this.bezNpoints; i++){
			fill(255 * i / this.bezNpoints);
			ellipse(this.cBezXpoints[i], this.cBezYpoints[i], elw, elw);
			ellipse(this.dBezXpoints[i], this.dBezYpoints[i], elw, elw);
		}
	}

	dessinerGrille(){

		for( var x = this.sx - .5 * alvDist; x < this.ex - .5 * alvDist; x += alvDist){

			var cBezIndex = 0;
			while(this.cBezXpoints[cBezIndex] < x){cBezIndex ++}
			var ymax = this.cBezYpoints[cBezIndex];

			var dBezIndex = 0;
			while(this.dBezXpoints[dBezIndex] < x){dBezIndex ++}
			var ymin = this.dBezYpoints[dBezIndex];

			for(var y = this.apex; y < this.sy; y += alvDist){
				if(y>=ymax && y<ymin){
					//fill(180 + Math.random()*75);
					rect(x, y, alvSize, alvSize);
				}
			}
		}
	}
}

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

	var pwMin = 250; 

	var pwGrow = pwMin * .10 * iFactor;
	var pw = pwMin + pwGrow;
	var dc = 140  - 80* iFactor;

	var cCurve1 = abs(pwMin + .9 * pwGrow) * 1.5;
	var cCurve2 = abs(pwMin + .1 * pwGrow) * 2.5;

	var p1 = new poumon(cw/2 +10, ch - 5, pw, dc, cCurve1, cCurve2);
	p1.dessinerGrille();

	var p2 = new poumon( (cw - 2 * pw - 20) / 2, ch - 5, pw, dc, cCurve2, cCurve1);
	p2.dessinerGrille();

}
