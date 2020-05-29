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

		for( var x = this.sx - .5 * alvDist, icol = 0; x < this.ex - .5 * alvDist; x += alvDist, icol ++){

			this.alveoles[icol] = [];
			var cBezIndex = 0;
			while(this.cBezXpoints[cBezIndex] < x){cBezIndex ++}
			var ymax = this.cBezYpoints[cBezIndex];

			var dBezIndex = 0;
			while(this.dBezXpoints[dBezIndex] < x){dBezIndex ++}
			var ymin = this.dBezYpoints[dBezIndex];

			for(var y = this.apex, iligne; y < this.sy; y += alvDist, iligne ++){
				if(y>=ymax && y<ymin){
					this.alveoles[icol].push(1);
					rect(x, y, alvSize, alvSize);
				}
				else{
					this.alveoles[icol].push(0);
				}
			}
		}
	}
}
