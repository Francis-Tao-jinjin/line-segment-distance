import { vec3 } from 'gl-matrix';
export declare type Line = {
    origin: vec3 | number[];
    dir: vec3 | number[];
};
export declare function dist3D_Line_to_Line(L1: Line, L2: Line): {
    distance: number;
    l1_scale: number;
    l2_scale: number;
};
export declare type Segment = {
    start: vec3 | number[];
    end: vec3 | number[];
};
export declare function dist3D_Segment_to_Segment(S1: Segment, S2: Segment): {
    distance: number;
    s1_scale: number;
    s2_scale: number;
};
export declare function dist3D_Line_to_Segment(L: Line, S: Segment): {
    distance: number;
    l1_scale: any;
    s2_scale: any;
};
