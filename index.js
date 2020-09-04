"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dist3D_Line_to_Segment = exports.dist3D_Segment_to_Segment = exports.dist3D_Line_to_Line = void 0;
var gl_matrix_1 = require("gl-matrix");
var EPSILON = 1e-6;
function dist3D_Line_to_Line(L1, L2) {
    var u = L1.dir;
    var v = L2.dir;
    var w = gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), L1.origin, L2.origin);
    var a = gl_matrix_1.vec3.dot(u, u);
    var b = gl_matrix_1.vec3.dot(u, v);
    var c = gl_matrix_1.vec3.dot(v, v);
    var d = gl_matrix_1.vec3.dot(u, w);
    var e = gl_matrix_1.vec3.dot(v, w);
    var D = a * c - b * b;
    var sc;
    var tc;
    if (D < EPSILON) {
        sc = 0.0;
        tc = (b > c ? (d / b) : (e / c));
    }
    else {
        sc = ((b * e) - (c * d)) / D;
        tc = ((a * e) - (b * d)) / D;
    }
    var P1 = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), u, sc);
    var P2 = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), v, tc);
    var dP = gl_matrix_1.vec3.add(gl_matrix_1.vec3.create(), w, gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), P1, P2));
    return {
        distance: gl_matrix_1.vec3.len(dP),
        l1_scale: sc,
        l2_scale: tc,
    };
}
exports.dist3D_Line_to_Line = dist3D_Line_to_Line;
function dist3D_Segment_to_Segment(S1, S2) {
    var u = gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), S1.end, S1.start);
    var v = gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), S2.end, S2.start);
    var w = gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), S1.start, S2.start);
    var a = gl_matrix_1.vec3.dot(u, u);
    var b = gl_matrix_1.vec3.dot(u, v);
    var c = gl_matrix_1.vec3.dot(v, v);
    var d = gl_matrix_1.vec3.dot(u, w);
    var e = gl_matrix_1.vec3.dot(v, w);
    var D = a * c - b * b;
    var sc;
    var sN;
    var sD = D;
    var tc;
    var tN;
    var tD = D;
    if (D < EPSILON) {
        sN = 0.0;
        sD = 1.0;
        tN = e;
        tD = c;
    }
    else {
        sN = (b * e - c * d);
        tN = (a * e - b * d);
        if (sN < 0.0) {
            sN = 0.0;
            tN = e;
            tD = c;
        }
        else if (sN > sD) {
            sN = sD;
            tN = e + b;
            tD = c;
        }
    }
    if (tN < 0.0) {
        tN = 0.0;
        if (-d < 0.0) {
            sN = 0.0;
        }
        else if (-d > a) {
            sN = sD;
        }
        else {
            sN = -d;
            sD = a;
        }
    }
    else if (tN > tD) {
        tN = tD;
        if ((-d + b) < 0.0) {
            sN = 0;
        }
        else if ((-d + b) > a) {
            sN = sD;
        }
        else {
            sN = (-d + b);
            sD = a;
        }
    }
    sc = (Math.abs(sN) < EPSILON ? 0.0 : sN / sD);
    tc = (Math.abs(tN) < EPSILON ? 0.0 : tN / tD);
    var P1 = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), u, sc);
    var P2 = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), v, tc);
    var dP = gl_matrix_1.vec3.add(gl_matrix_1.vec3.create(), w, gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), P1, P2));
    return {
        distance: gl_matrix_1.vec3.length(dP),
        s1_scale: sc,
        s2_scale: tc,
    };
}
exports.dist3D_Segment_to_Segment = dist3D_Segment_to_Segment;
function dist3D_Line_to_Segment(L, S) {
    var u = L.dir;
    var v = gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), S.end, S.start);
    var w = gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), L.origin, S.start);
    var a = gl_matrix_1.vec3.dot(u, u);
    var b = gl_matrix_1.vec3.dot(u, v);
    var c = gl_matrix_1.vec3.dot(v, v);
    var d = gl_matrix_1.vec3.dot(u, w);
    var e = gl_matrix_1.vec3.dot(v, w);
    var D = a * c - b * b;
    var sc;
    var sN;
    var sD = D;
    var tc;
    var tN;
    var tD = D;
    if (D < EPSILON) {
        sN = 0.0;
        sD = 1.0;
        tN = e;
        tD = c;
    }
    else {
        sN = (b * e - c * d);
        tN = (a * e - b * d);
        if (sN < 0.0) {
            sN = 0.0;
            tN = e;
            tD = c;
        }
    }
    if (tN < 0.0) {
        tN = 0.0;
        if (-d < 0.0) {
            sN = 0.0;
        }
        else {
            sN = -d;
            sD = a;
        }
    }
    else if (tN > tD) {
        tN = tD;
        if ((-d + b) < 0.0) {
            sN = 0;
        }
        else {
            sN = (-d + b);
            sD = a;
        }
    }
    sc = (Math.abs(sN) < EPSILON ? 0.0 : sN / sD);
    tc = (Math.abs(tN) < EPSILON ? 0.0 : tN / tD);
    var P1 = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), u, sc);
    var P2 = gl_matrix_1.vec3.scale(gl_matrix_1.vec3.create(), v, tc);
    var dP = gl_matrix_1.vec3.add(gl_matrix_1.vec3.create(), w, gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), P1, P2));
    return {
        distance: gl_matrix_1.vec3.len(dP),
        l1_scale: sc,
        s2_scale: tc,
    };
}
exports.dist3D_Line_to_Segment = dist3D_Line_to_Segment;
//# sourceMappingURL=index.js.map