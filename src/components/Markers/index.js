import MarkerSVG from "../../assets/markers/marker-filled.svg";

class Position {
  constructor(coordinates) {
    this.coordinates = coordinates;
  }
}

class Data {
  constructor(id, type, lenth, width, height, qty, times, unit, remarks) {
    this.id = id;
    this.type = type;
    this.lenth = lenth;
    this.width = width;
    this.height = height;
    this.qty = qty;
    this.times = times;
    this.unit = unit;
    this.remarks = remarks;
  }
}

class MarkerBase {
  constructor(id, position, data) {
    this.id = id;
    this.position = position;
    this.data = data;
  }
}

class PointMarker extends MarkerBase {
  constructor(id, position, data, color, size) {
    super(id, position, data);
    this.color = color;
    this.size = size;
  }

  render() {
    return (
      <image
        id={this.id}
        x={this.position.coordinates[0].xC - this.size.width/2}
        y={this.position.coordinates[0].yC - this.size.height/2}
        width={this.size.width}
        height={this.size.height}
        href={MarkerSVG}
      />
    );
  }
}

class LineMarker extends MarkerBase {
  constructor(id, position, data, color, strokeSize) {
    super(id, position, data);
    this.color = color;
    this.strokeSize = strokeSize;
  }

  render() {
    return (
      <line
        id={this.id}
        x1={this.position.coordinates[0].xC}
        y1={this.position.coordinates[0].yC}
        x2={this.position.coordinates[1].xC}
        y2={this.position.coordinates[1].yC}
        stroke={this.color}
        strokeWidth={this.strokeSize}
      />
    );
  }
}

class AreaMarker extends MarkerBase {
  constructor(id, position, data, borderColor, borderWidth, fillColor) {
    super(id, position, data);
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.fillColor = fillColor;
  }

  render() {
    return (
      <rect
        id={this.id}
        x={Math.min(this.position.coordinates[0].xC, this.position.coordinates[1].xC)}
        y={Math.min(this.position.coordinates[0].yC, this.position.coordinates[1].yC)}
        width={Math.abs(this.position.coordinates[1].xC - this.position.coordinates[0].xC)}
        height={Math.abs(this.position.coordinates[1].yC - this.position.coordinates[0].yC)}
        stroke={this.borderColor}
        strokeWidth={this.strokeSize}
        fill={this.fillColor}
      />
    );
    // return <rect x="10" y="10" width="80" height="80" fill="none" stroke="black" strokeWidth="2" />

  }
}

export { Position, Data, PointMarker, LineMarker, AreaMarker };
