import { paper } from 'paper';

const Voronoi = require('voronoi')

const voronoi = (function () {
	let voronoi =  new Voronoi();

	let bbox, diagram;
	let margin = 0;
	let spotColor = new paper.Color('red');

	let mousePos, oldSize, sites;

	const setup = canvasId => {
		let canvas = document.getElementById(canvasId);
		paper.setup(canvas);

		paper.view.onResize = onResize;
		paper.view.onMouseMove = onMouseMove;

		sites = generateBeeHivePoints(paper.view.size.divide(200), true);
		oldSize = paper.view.size;
		mousePos = paper.view.center;

		onResize();
	}

	const onResize = () => {
		bbox = {
			xl: margin,
			xr: paper.view.bounds.width - margin,
			yt: margin,
			yb: paper.view.bounds.height - margin
		};
		for (let i = 0, l = sites.length; i < l; i++) {
			sites[i] = sites[i].multiply(paper.view.size.divide(oldSize));
		}
		oldSize = paper.view.size;
		renderDiagram();
	}

	const onMouseMove = event => {
		mousePos = event.point;
		if (event.type == 'mousedown') {
			sites.push(event.point);
		}
		sites[sites.length - 1] = event.point;
		renderDiagram();
	}

	const renderDiagram = () => {
		paper.project.activeLayer.children = [];
		let diagram = voronoi.compute(sites, bbox);
		if (diagram) {
			for (let i = 0, l = sites.length; i < l; i++) {
				let cell = diagram.cells[sites[i].voronoiId];
				if (cell) {
					let halfedges = cell.halfedges,
						length = halfedges.length;
					if (length > 2) {
						let points = [];
						for (let j = 0; j < length; j++) {
							let v = halfedges[j].getEndpoint();
							points.push(new paper.Point(v));
						}
						createPath(points, sites[i]);
					}
				}
			}
		}
	}

	const generateBeeHivePoints = (size, loose) => {
		let points = [];
		let col = paper.view.size.divide(size);
		for(let i = -1; i < size.width + 1; i++) {
			for(let j = -1; j < size.height + 1; j++) {
				let point = new paper.Point(i, j).divide(new paper.Point(size)).multiply(paper.view.size).add(col.divide(2));
				if(j % 2)
					point = point.add(new paper.Point(col.width / 2, 0));
				if(loose)
					point = point.add((col.divide(4)).multiply(paper.Point.random()).subtract(col.divide(4)));
				points.push(point);
			}
		}
		return points;
	}

	const removeSmallBits = path => {
		let averageLength = path.length / path.segments.length;
		let min = path.length / 50;
		for(let i = path.segments.length - 1; i >= 0; i--) {
			let segment = path.segments[i];
			let cur = segment.point;
			let nextSegment = segment.next;
			let next = nextSegment.point.add(nextSegment.handleIn);
			if (cur.getDistance(next) < min) {
				segment.remove();
			}
		}
	}

	const createPath = (points, center) => {
		let path = new paper.Path();
		path.fillColor = spotColor;
		path.closed = true;

		for (let i = 0, l = points.length; i < l; i++) {
			let point = points[i];
			let next = points[(i + 1) == points.length ? 0 : i + 1];
			let vector = (next.subtract(point)).divide(2);
			path.add({
				point: point.add(vector),
				handleIn: new paper.Point(0, 0).subtract(vector),
				handleOut: vector
			});
		}
		path.scale(0.95);
		removeSmallBits(path);
		return path;
	}

	return {
		setup
	}
}())

export { voronoi as default }
