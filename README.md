# line-segment-distance

The method used in this library is from http://geomalgorithms.com/a07-_distance.html, go check out the website if you want to leearn more about geometry mathematic.

`npm install line-segment-distance`
```javascript
import {
    Line,
    Segment,
    dist3D_Line_to_Line,
    dist3D_Line_to_Segment,
    dist3D_Segment_to_Segment
} from 'line-segment-distance';
```

## dist3D_Line_to_Line

Return the minimum distance between LineA and LineB in 3D space, and 
the scale factor form each line's origin position

**Parameters**
-   L1: Line
-   L2: Line
```javascript
type Line = {
    origin: vec3 | number[],
    dir: vec3 | number[],
}
```
example:
```javascript
const result = dist3D_Line_to_Line(L1, L2);
```
**return**
```javascript
{
    distance: number,
    l1_scale: number,
    l2_scale: number,
}
```
**Examples**
```javascript
import {
    dist3D_Line_to_Line,
    Line,
} from 'line-segment-distance';
import { vec3 } from 'gl-matrix';

const lineA:Line = {
    origin: [0, 0, 0],
    dir: [1, 0, 1],
};

const lineB:Line = {
    origin: [32, 0, 0],
    dir: [-1, 1, 1],
};

const result = dist3D_Line_to_Line(lineA, lineB);
const distance = result.distance;
if (distance < 1e-6) {
    // lineA intersects the lineB.
}
const pointOnLineA = vec3.scaleAndAdd(vec3.create(), lineA.origin, lineA.dir, result.l1_scale);
```

## dist3D_Line_to_Segment

Return the minimum distance between LineA and SegmentB in 3D space, and 
the scale factor form lineA's origin position and the Segment's start psotion;

**Notice:**
The distance between segments and lines may not be the same as the distance between their extended lines. The closest points on the extended infinite line may be outside the range of the segment or ray which is a restricted subset of the line.

**Parameters**
-   L1: Line
-   S2: Segment
```javascript
type Line = {
    origin: vec3 | number[],
    dir: vec3 | number[],
}
type Segment = {
    start: vec3 | number[],
    end: vec3 | number[],
}
```
example:
```javascript
const result = dist3D_Line_to_Segment(L1, S2);
```
**return**
```javascript
{
    distance: number,
    l1_scale: number,
    s2_scale: number,
}
```
**Examples**
```javascript
import {
    dist3D_Line_to_Segment,
    Line,
    Segment,
} from 'line-segment-distance';
import { vec3 } from 'gl-matrix';

const lineA:Line = {
    origin: [0, 0, 0],
    dir: [1, 0, 1],
};

const segmentB:Segment = {
    start: [4, 8, 0],
    end: [19, 8, 0],
};

const result = dist3D_Line_to_Segment(lineA, segmentB);
const distance = result.distance;
if (distance < 1e-6) {
    // segmentB intersects the lineA.
}
const pointOnLineA = vec3.scaleAndAdd(vec3.create(), lineA.origin, lineA.dir, result.l1_scale);

const segemntB_dir = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), segmentB.end, segmentB.start));

const pointOnSegmentB = vec3.scaleAndAdd(vec3.create(), segmentB.start, segemntB_dir, result.s2_scale);
```


## dist3D_Segment_to_Segment

Return the minimum distance between SegmentA and SegmentB in 3D space, and 
the scale factor form each segment's start position.

**Notice:**
Like LineToSegment distance, the distance between two segments may not be the same as the distance between their extended lines. The closest points on the extended infinite line may be outside the range of the segment which is a restricted subset of the line.

**Parameters**
-   S1: Segment
-   S2: Segment
```javascript
type Segment = {
    start: vec3 | number[],
    end: vec3 | number[],
}
```
example:
```javascript
const result = dist3D_Segment_to_Segment(S1, S2);
```
**return**
```javascript
{
    distance: number,
    s1_scale: number,
    s2_scale: number,
}
```
**Examples**
```javascript
import {
    dist3D_Segment_to_Segment,
    Segment,
} from 'line-segment-distance';
import { vec3 } from 'gl-matrix';

const segmentA:Segment = {
    start: [0, 0, 5],
    end: [0, 0, 20],
};

const segmentB:Segment = {
    start: [4, 8, 0],
    end: [19, 8, 0],
};

const result = dist3D_Segment_to_Segment(segmentA, segmentB);
const distance = result.distance;
if (distance < 1e-6) {
    // segmentB intersects the segmentA.
}

const segemntA_dir = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), segmentA.end, segmentA.start));

const pointOnSegmentA = vec3.scaleAndAdd(vec3.create(), segmentA.start, segemntA_dir, result.s2_scale);
```