class Line {
    p1: Point;
    p2: Point;
    constructor( p1:Point, p2:Point ) {
        this.p1 = p1;
        this.p2 = p2;
    }
    distanceToPoint( point:Point ) {
        // slope
        var m = ( this.p2.y - this.p1.y ) / ( this.p2.x - this.p1.x ),
            // y offset
            b = this.p1.y - ( m * this.p1.x ),
            d = [];
        // distance to the linear equation
        d.push( Math.abs( point.y - ( m * point.x ) - b ) / Math.sqrt( Math.pow( m, 2 ) + 1 ) );
        // distance to p1
        d.push( Math.sqrt( Math.pow( ( point.x - this.p1.x ), 2 ) + Math.pow( ( point.y - this.p1.y ), 2 ) ) );
        // distance to p2
        d.push( Math.sqrt( Math.pow( ( point.x - this.p2.x ), 2 ) + Math.pow( ( point.y - this.p2.y ), 2 ) ) );
        // return the smallest distance
        return d.sort( function( a, b ) {
            return ( a - b ); //causes an array to be sorted numerically and ascending
        } )[0];
    };

}

let douglasPeucker = function( points: Point[], tolerance:number ) {
    if ( points.length <= 2 ) {
        return [points[0]];
    }
    let returnPoints: Point[] = [];
    // make line from start to end 
    let line = new Line( points[0], points[points.length - 1] );
    // find the largest distance from intermediate poitns to this line
    let maxDistance = 0;
    let maxDistanceIndex = 0;
    let p;
    for( var i = 1; i <= points.length - 2; i++ ) {
        var distance = line.distanceToPoint( points[ i ] );
        if( distance > maxDistance ) {
            maxDistance = distance;
            maxDistanceIndex = i;
        }
    }
    // check if the max distance is greater than our tollerance allows 
    if ( maxDistance >= tolerance ) {
        p = points[maxDistanceIndex];
        line.distanceToPoint( p );
        // include this point in the output 
        returnPoints = returnPoints.concat( douglasPeucker( points.slice( 0, maxDistanceIndex + 1 ), tolerance ) );
        // returnPoints.push( points[maxDistanceIndex] );
        returnPoints = returnPoints.concat( douglasPeucker( points.slice( maxDistanceIndex, points.length ), tolerance ) );
    } else {
        // ditching this point
        p = points[maxDistanceIndex];
        line.distanceToPoint( p );
        returnPoints = [points[0]];
    }
    return returnPoints;
};

let simplifyPath = function( points: Point[], tolerance:number ) {
	let arr = douglasPeucker( points, tolerance );
	// always have to push the very last point on so it doesn't get left off
	arr.push( points[points.length - 1 ] );
	return arr;

};

export {simplifyPath};