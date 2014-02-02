define([
	'jquery',
	'core/keys'
], function ($, keys) {

	'use strict';

	var r = 10, // right spike
		s = 14, // right wooden spike
		l = 11, // left spike
		m = 15, // left wooden spike
		d = 12, // down spike
		e = 16, // down wooden spike
		u = 13, // up spike
		v = 17, // up wooden spike
		b = 18, // box
		g = 21, // ring
		y = 22, // yellow ring
		x = 23, // multi-spike
		z = 24, // vacuum
		map = [
			'empty',        //0
			'wall',         //1
			'breakable',    //2
			'bush',         //3
			'wbush',        //4
			'pearl',        //5
			'ypearl',       //6
			'ball',         //7
			'yball',        //8
			'rball',        //9
			'rspike',       //10
			'lspike',       //11
			'dspike',       //12
			'uspike',       //13
			'rwspike',      //14
			'lwspike',      //15
			'dwspike',      //16
			'uwspike',      //17
			'box',          //18
			'bball',        //19
			'byball',       //20
			'ring',         //21
			'yring',        //22
			'mspike',       //23
			'vacuum'        //24
		],
		levels = {
			1962: {
				I: [
					[
						0, 0, 1, 1, 1, 1, 1, 0, 0,
						0, 0, 1, 1, 5, 1, 1, 0, 0,
						0, 0, 1, 0, 0, 0, 1, 0, 0,
						0, 0, 1, 0, 7, 0, 1, 0, 0,
						1, 1, 0, 0, 0, 0, 0, 1, 1,
						1, 0, 0, 5, 0, 1, 5, 0, 1,
						1, 0, 0, 0, 0, 0, 0, 0, 1,
						1, 1, 1, 1, 1, 1, 1, 1, 1
					],
					[
						1, 0, 0, 0, 0, 0, 0, 0, 1,
						1, 0, 0, 1, 0, 7, 0, 0, 1,
						1, 0, 5, 1, 0, 0, 0, 0, 1,
						1, 1, 0, 0, 0, 1, 1, 1, 1,
						0, 0, 1, 1, 1, 1, 0, 0, 0,
						0, 0, 0, 5, 0, 1, 0, 0, 0,
						1, 5, 0, 0, 0, 0, 0, 0, 1,
						1, 0, 0, 0, 0, 0, 5, 0, 1
					],
					[
						0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0,
						0, 0, 0, 1, d, 0, 0, 0, 0, 0, 1,
						0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
						0, 1, 1, 5, 0, 5, 0, 0, 0, 0, 1,
						1, r, 0, 0, 7, 0, 0, 0, 1, 1, 0,
						1, 0, 0, 5, 0, 5, 0, 1, 0, 0, 0,
						1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
						0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0
					],
					[
						0, 0, 1, 1, 1, 1, 1, 0, 0,
						0, 1, 1, 0, 0, 0, 0, 1, 0,
						1, 5, 1, b, 0, 1, 0, 5, 1,
						1, 0, 3, 0, 0, 0, 0, 0, 1,
						1, 1, 1, b, 1, 7, 1, 0, 1,
						1, 0, 1, 0, 1, 0, 0, 0, 1,
						0, 1, 1, 0, 5, 1, 1, 1, 0,
						0, 0, 1, 1, 1, 1, 1, 0, 0
					]
				],
				II: [
					[],
					[
						0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
						0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 7, 3, 5, 1,
						0, 0, 0, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 0,
						0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 5, 1, 0, 0,
						0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0,
						1, 0, 7, 5, 5, 5, 7, 0, 0, 0, 1, 0, 0, 0, 0,
						0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0
					],
					[
						1, 1, 1, 1, 0, 0, 0, 0,
						1, 0, 0, 1, 0, 0, 0, 0,
						1, 0, 0, 1, 0, 0, 1, 0,
						1, 0, 0, 1, 1, 1, 5, 1,
						1, 0, 0, 5, 1, 1, 3, 1,
						r, 0, 3, 0, 0, 0, 0, 1,
						1, 7, 0, 0, 0, 7, 0, 1,
						1, 1, u, 1, 1, 1, 1, 1
					],
					[
						0, 1, 0, 0, 0, 0, 1, 0,
						0, 1, r, 0, 0, 0, 1, 0,
						1, 1, 5, 0, 7, 0, 1, 1,
						1, 1, 0, 1, 1, 1, 1, 1,
						1, 1, 0, 5, 0, l, 1, 1,
						1, 1, 0, 0, 3, 0, 1, 1,
						0, 1, r, 0, 0, 0, 1, 0,
						0, 1, 0, 0, 0, 5, 1, 0
					]
				],
				III: [
					[
						0, 1, 1, 1, 1, 0,
						1, 7, 0, 0, 3, 1,
						1, 0, b, 0, 1, 1,
						1, 1, 0, 0, 5, 1,
						1, 7, 1, 0, 1, 1,
						1, 0, 0, b, 5, 1,
						0, 1, 1, u, 1, 0
					],
					[
						0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0,
						1, 1, 5, 0, 0, 1, 0, 6, 1, 1, 1,
						1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1,
						1, 0, 0, 0, 0, 2, 0, 0, 7, 0, 1,
						1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
						1, 1, 0, 0, 5, 1, 0, 0, 0, 1, 1,
						0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0
					],
					[
						1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
						1, b, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
						1, 5, 2, 0, 0, 0, 0, 0, 0, 0, b, 5, 1,
						1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
						1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
						1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
						1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1,
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
					],
					[
						0, 0, 0, 1, y, 1, 1, 1, 0, 0, 0,
						0, 1, 1, 1, 5, 1, 5, 1, 1, 1, 0,
						1, 0, 0, 0, 0, 9, 0, 0, 0, 1, 1,
						1, 0, 0, 7, 1, 1, 0, 0, 0, 0, 1,
						1, 0, 0, 0, 0, 1, 1, 7, 0, 0, 1,
						1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
						0, 1, 1, 1, y, 0, 0, 1, 1, 1, 0,
						0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0
					]
				]
			},
			1964: {
				I: [
					[
						1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
						1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, y, 1,
						1, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
						1, s, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 1,
						1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
						1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 5, 1,
						1, y, 0, 1, 0, 0, 0, 0, 0, 0, 1, u, 1,
						1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1
					],
					[
						1, 1, 0, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 7, 1,
						0, 0, 0, 0, 5,
						1, 0, s, 0, 1,
						1, 1, 0, 1, 1
					],
					[ // not solved
						0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
						0, 1, 1, 0, 0, 0, 0, 1, 7, 0, 0, 0, 0, 1, 0,
						0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0,
						1, 5, 0, 0, 1, 0, 9, 0, 3, 0, m, 0, 0, 0, 1,
						1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1,
						1, 0, 1, 0, 1, 1, 5, 1, 0, 1, 0, 5, 1, 0, 1,
						1, 0, 0, 7, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
						0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
					],
					[
						1, 0, 5, 1,
						0, 0, l, 5,
						5, l, 0, 0,
						1, 0, 7, 1
					]
				],
				II: [
					[
						1, 0, 1, 0, 0,
						7, 1, 0, 7, 0,
						0, 0, 0, 0, 0,
						0, 5, 9, 5, 0,
						1, 0, 0, 0, 1,
						0, 1, 5, 1, 0,
						0, 0, 1, 0, 0
					],
					[ // not solved
						0, 1, 5, 1, 1, 1, 1, 1, 0, 1, 0,
						1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 1,
						0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
						1, 0, 0, 7, 1, 0, 0, 5, 1, 0, 1,
						1, 0, 0, 0, 1, 0, 7, 0, 1, 5, 1,
						0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0,
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
						0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0
					],
					[ // 89 ms
						0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
						0, 1, 0, e, 7, 0, 0, 0, 1, 1, 0,
						1, 5, 0, 0, 5, 0, 0, 0, 1, 1, 1,
						0, 1, 0, 0, 7, 0, s, 0, 0, 1, 0,
						0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0
					],
					[ // 318 ms
						0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
						0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
						1, 5, 1, 0, 7, 1, 0, 0, 0, 0, 0, 1,
						1, 5, 1, b, 1, 1, 0, 0, 0, 1, 0, 1,
						1, b, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1,
						0, 1, 1, 1, 1, 1, u, 0, 7, 0, 0, 1,
						0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1
					]
				],
				III: [
					[ // 182 ms
						1, 1, 1, 1, 1, 1, 1,
						1, 0, 0, 5, 0, 0, 1,
						1, x, 5, 0, 5, x, 1,
						1, 1, 2, 2, 2, 1, 1,
						1, 0, 0, 6, 0, 0, 1,
						1, 0, 0, 7, 0, 0, 1,
						1, 0, 6, 0, 0, 1, 1,
						1, 1, 0, 0, 0, 0, 1,
						1, 1, 1, 1, 1, 1, 1
					],
					[ // 20 ms
						5, 0, 0, 0, 0,
						0, u, 0, 0, 0,
						1, 5, 1, 1, 1,
						0, b, 7, 0, 1,
						0, 0, 0, 0, 0
					],
					[ // 7 ms
						1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
						1, 1, 0, 0, 0, 0, m, 0, 1, 1,
						1, r, 0, 6, 0, 7, 0, 0, 2, 5,
						1, 0, 0, v, 0, 0, 0, 0, 1, 1,
						1, 0, 1, 1, 0, 1, 1, 1, 1, 1
					],
					[ // 8 ms
						1, 1, 1, 1, 1, 1, 1,
						0, 5, 0, 0, 0, 0, 0,
						0, 0, 0, 4, 0, 0, 0,
						0, 7, 0, 0, 4, 0, 0,
						0, 0, 0, 5, 0, 0, 0,
						0, 0, 0, 0, 0, 5, 0,
						1, 1, 1, 1, 1, 1, 1
					]
				]
			},
			1967: {
				I: [
					[ // not solved
						0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 0, 1,
						1, 1, 0, 0, 0, 0, 1, 1, 5, 1, 5, y, 5, 1,
						1, 1, 0, 0, 1, 0, 0, 1, 3, 1, 0, 5, 0, 1,
						1, 0, 0, 0, 0, y, 0, 0, 0, 1, 1, 1, 1, 1,
						1, 0, 1, 0, 1, 0, 0, 7, 0, 0, 1, 1, 1, 1,
						0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
					],
					[ // 131 ms
						0, 1, 1, 1, 1, 1, 1, 0,
						1, 1, 5, 0, 0, 0, 1, 1,
						1, 1, v, 0, m, 0, 1, 1,
						1, 5, 0, 0, 0, 0, 0, 1,
						1, 1, 7, 0, 0, 0, 1, 1,
						1, 1, 0, 1, 0, 0, 1, 1,
						0, 1, 1, 1, 1, 1, 1, 0
					],
					[ // 28 ms
						0, 1, 0, 0, 1, 0, 0,
						0, 0, 0, 1, 0, 0, 0,
						1, 0, 0, 0, 0, 0, 1,
						0, 0, 0, 7, 0, 1, 0,
						0, 0, 0, 0, 0, 0, 0,
						r, 5, 5, 5, 5, 5, l,
						0, 0, 0, 1, 0, 0, 0,
						0, 0, 0, r, 0, 0, 0
					],
					[ // 42 ms
						0, 0, 0, x, 7,
						0, 7, 0, 0, 0,
						0, 0, 5, 3, 9,
						1, 0, 0, 0, 1,
						0, 1, 5, 1, 0
					]
				],
				II: [
					[ // not solved
						1, 1, 7, d, 1, 0, 0, 0, 1, d, 1, 1, 1,
						1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 5, 0, 1,
						7, 0, 1, 0, 1, 7, 1, 1, 1, 3, 1, 0, 1,
						1, 0, 0, 9, 0, 0, 1, 0, 0, 0, 0, 0, 1,
						1, 1, 1, 0, 1, 0, 1, 5, 1, 0, 1, 1, 1,
						0, 0, 1, 5, 0, 0, 0, 0, 0, 0, 1, 0, 0,
						0, 0, 1, u, 1, 1, 1, 1, 1, u, 1, 0, 0
					],
					[ // 37 ms
						1, 1, 1, 1, 1, 1, 1, 1,
						0, 0, 5, 0, 0, 5, 0, 0,
						0, 7, 0, u, 5, 0, 0, 0,
						0, 0, 0, 5, d, 0, 7, 0,
						0, 0, 5, 0, 0, 5, 0, 0,
						1, 1, 1, 1, 1, 1, 1, 1
					],
					[ // 6 ms
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
						0, 0, 6, 0, 1, 1, 2, 0, 6, 0, 0,
						0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
						0, 0, 7, 0, 0, 2, 6, 0, 0, 0, 0,
						0, 0, 2, 0, 0, 1, 0, 0, 6, 1, 0,
						0, 0, 0, 0, 6, 1, 2, 0, 0, 0, 0,
						0, 0, 0, 1, 2, 1, 1, 1, 0, 0, 0,
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
					],
					[ // 149 ms
						0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
						1, 1, 0, 0, 0, 1, d, 0, 0, 1, 0, 0, 0, g, 1,
						1, 0, y, 0, 0, 1, 5, 0, 0, 1, 0, 0, 0, 0, 1,
						1, 7, 0, 0, 1, 1, 0, 1, 0, 1, 0, y, 0, 5, 1,
						1, 0, 0, 0, 0, 1, g, 0, 0, 1, 1, 0, 0, 0, 1,
						1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
						0, 1, r, 0, 0, 0, 0, 5, 0, 0, 0, 0, l, 1, 0,
						0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0
					]
				],
				III: [
					[ // 43239 ms !!!!!
						0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
						0, 1, 1, 1, 0, 0, 6, 0, 1, 1, 0,
						1, 1, 1, 1, 0, 6, 1, 0, 1, 1, 1,
						1, 5, 2, 0, 0, y, 0, 7, 3, 5, 1,
						1, 1, 1, 0, 2, 0, 0, 1, 1, 1, 1,
						1, 5, 2, 0, 7, 0, y, 0, 3, 5, 1,
						1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
						0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0
					], // 14
					[ // not solved
						0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
						1, d, 1, 5, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1,
						1, 0, 6, 1, 1, 0, 7, 3, 0, 3, 0, 0, 1, 1,
						1, 0, 0, 9, 0, 0, 0, 0, 0, 1, 0, m, 0, 1,
						1, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1,
						1, u, 1, 1, 0, 0, 1, 0, 7, 1, 1, 1, 1, 1,
						0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
					], // 21
					[ // 3716 ms
						1, 1, 0, 0, 0, 0, 1, 1,
						1, 5, 0, 1, 0, 0, 5, 1,
						0, 0, 5, 7, 0, 5, 0, 0,
						0, 0, 0, 5, 5, 0, 0, 7,
						0, 0, 0, 5, 5, 0, 0, 0,
						0, 0, 5, 1, 0, 5, 0, 0,
						1, 5, 0, 0, 0, 0, 5, 1,
						1, 1, 0, 0, 1, 0, 1, 1
					], // 13
					[ // extreme !!!!!
						0, 0, 1, 0, 0, 0, 9, 6, 1, 0,
						0, 0, 1, 0, 0, 0, 1, 1, 7, 1,
						0, 0, 1, 0, 0, 0, 0, 2, 0, 1,
						0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
						0, 1, 1, 1, 0, 0, 0, 2, 0, 1,
						1, 5, 9, 6, 0, 7, 0, 1, 7, 1,
						0, 1, 1, 0, 0, 0, 0, 0, 1, 0,
					] // 30
				]
			},
			1970: {
				I: [
					[ // not solved
						0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
						0, 1, 1, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0,
						1, 1, 0, 0, b, 0, 2, 5, 1, 1, 1, 1, 1,
						1, 0, 0, 7, 0, 0, 2, 2, 1, 0, 6, 0, 1,
						1, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 7, l,
						1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1,
						1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
						0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0
					], // 17
					[ // not solved
						0, 0, 1, 1, 1, 0, 0, 0, 0,
						0, 1, 0, 0, 0, 1, 1, 0, 0,
						1, 0, y, 0, 0, 0, 1, 1, 0,
						1, 0, 6, 7, y, 0, 2, 5, 1,
						0, 1, 0, 0, 0, 0, 1, 9, 1,
						0, 1, 1, 0, 0, 1, 1, 5, 1,
						0, 0, 1, 6, 2, 0, 7, 1, 0,
						0, 0, 0, 1, 1, 1, 1, 0, 0
					], // 23
					[ // not solved
						1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
						1, 7, 1, 1, 0, 0, 0, 0, 0, 1, 1, 7, 1,
						0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0,
						1, 1, 0, 0, 1, 0, 2, u, 1, 0, 0, 1, 1,
						0, 1, 1, 0, 5, 1, 5, 1, 6, 0, 1, 1, 0,
						0, 0, 1, r, 0, 0, 3, 0, 0, l, 1, 0, 0,
						0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0
					], // 28
					[ // 24 ms
						1, 1, 1, 1, 1, 1,
						1, e, 0, 0, e, 0,
						1, 0, 0, 7, 5, 1,
						1, 5, 0, 0, 0, 1,
						1, 0, 1, 0, 0, 1,
						1, 0, 5, 0, 5, 1,
						1, v, 0, 0, v, 1,
						1, 1, 1, 1, 1, 1
					] // 13
				],
				II: [
					[ // 9 ms
						0, 0, 0, 0, 0, 0, 1,
						0, 1, 0, 1, 0, 0, 0,
						0, 0, 0, 0, 0, 1, 0,
						0, 0, 0, 0, 5, 0, 0,
						0, 0, 1, 7, 0, 0, 0,
						0, 0, 0, 5, 0, 0, 5,
						0, 0, 0, 1, 0, 0, 1
					], // 7
					[ // 14 ms
						0, 0, 2, 5, 0, 0, 0,
						2, 0, 0, 0, 0, 2, 0,
						0, 0, 0, 6, 0, 0, 2,
						5, 0, 0, 7, 0, 0, 2,
						0, 0, 0, 0, 0, 0, 2,
						0, 2, 0, 0, 0, 0, 0,
						2, 0, 6, 2, 2, 0, 0,
						0, 0, 0, 0, 0, 0, 1
					], // 7
					[ // 7 ms
						0, 0, 0, 0,
						0, 1, 0, 0,
						1, 5, 0, 1,
						1, 1, 9, 1,
						0, 7, 1, 0,
						1, 0, 0, 0,
						0, 1, 0, 0,
						0, 0, e, 0
					], // 7
					[
						0, 1, 1, 1, 1, 1, d, 1, 1, 1, 0,
						1, 5, d, 0, 1, 0, 3, 0, 0, 1, 1,
						1, 0, 0, 0, 1, 0, 5, b, 0, 1, 1,
						2, 0, 6, 0, 0, 7, 0, 0, 0, 5, r,
						1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1,
						1, 0, 0, 0, 0, 3, 0, 0, 0, 1, 1,
						1, 0, 0, 7, 0, u, 0, 1, 1, 1, 1,
						0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
					]
				],
				III: [
					[ // 3300 ms - not optimal
						z, z, z, z, z, z, z, z, z,
						z, 0, 3, 0, z, z, z, z, z,
						z, 7, 2, 3, z, 0, 3, 6, z,
						z, 3, 0, 6, z, 0, 2, 0, z,
						z, z, 0, z, z, 0, 5, 7, z,
						z, 5, 0, 5, z, 3, 2, 0, z,
						z, 0, 2, 0, z, 0, 5, 3, z,
						z, z, z, z, z, z, z, z, z
					], // 10
					[ // 787 ms
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
						1, d, 0, 0, 0, 0, 0, 0, 1, 5, 1, 1,
						1, 0, 0, 3, 0, 7, 0, 0, 0, 0, 0, 1,
						1, 0, s, 0, 0, 0, 0, 0, 0, 0, 0, 1,
						1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
						1, 1, 0, v, 0, x, 0, 0, 0, 0, 0, 1,
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
					], // 18
					[ // 440 ms
						0, e, 0, 0, 1,
						0, 9, 0, 1, 1,
						1, 5, 1, 5, 1,
						0, 1, 0, 9, 0,
						v, 0, 9, 0, 7,
						0, 0, 1, 0, 0
					], //17
					[ // impossible
						0, 0, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0,
						0, 1, 1, 0, 0, 1, 0, 1, 3, 1, 0, 0, 1, 1, 0,
						1, 2, 2, 0, 0, 0, 0, 3, 6, 1, b, 0, 1, 1, 1,
						1, 2, 1, 0, 1, 7, 0, 1, 3, 1, 0, 0, b, 6, 1,
						1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 7, 1, 1,
						1, 5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
						0, 1, 1, 1, 0, 0, 0, 7, 0, 1, 0, 0, 0, 1, 0,
						0, 0, 1, 6, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0
					] // 42
				]
			},
			1972: {
				I: [
					[ // 14865 ms
						0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 1, 6, 2, 0, 0, y, 0,
						0, 0, 0, 2, 1, 9, 1, 1, 0, 0, 1,
						0, 0, 1, 6, 9, y, 9, 6, 1, 0, 0,
						0, 0, 0, 1, 1, 9, 1, 2, 0, 0, 0,
						0, 0, 7, 0, 2, 6, 1, 0, 0, 7, 0,
						0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0
					], // 13
					[

					], // 24
					[ // 45 ms
						r, 0, 0, 0, 0, 0, l, 0, l, 0, 0, 0, l,
						0, 0, 0, 5, 9, 5, 0, 0, 0, 0, 1, 0, 0,
						0, d, 0, 3, 0, 0, 7, 0, 0, d, 0, 0, 0,
						0, 0, 0, 0, u, 0, 0, u, 0, 0, 0, d, 0
					], // 15
					[
						0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
						0, 6, 0, 0, 0, 0, 0, 1, b, 0, 0, 0, 1, 1,
						1, 0, 7, 0, y, 0, 0, 2, 0, 0, 0, b, 6, 1,
						0, 6, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1,
						0, 1, 0, 0, 1, 0, 0, 0, 0, 0, y, 0, 0, 1
					] // 23
				],
				II: [
					[ // needs extra programming
					], // 11
					[ // needs extra programming
					], //16
					[ // needs extra programming
					], //19
					[ // needs extra programming
					] // 14
				],
				III: [
					[
						1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1,
						0, 5, 0, 1, 0, 0, 0, 3, 3, 0, 0, 0, 5, 0, 1, 0, 0,
						1, 1, 0, 0, b, 1, 3, 1, 1, 0, 1, 1, 3, 0, 0, 3, 1,
						0, 0, 0, 1, 0, 0, 0, 1, 5, 0, 0, 3, 0, 1, 5, 0, 0,
						1, 0, 0, 0, 3, 1, 0, 1, 3, 1, 0, 1, b, 5, b, 0, 1,
						1, 5, 1, 0, 0, 1, 5, 3, 7, 3, 5, 1, 0, 0, 0, 0, 1,
						0, 0, 0, 5, 1, 1, b, 1, 3, 1, b, 1, 1, 1, 1, 3, 0,
						0, 1, 0, 0, 0, 1, 1, 0, 5, 0, 1, 1, 5, 0, 3, 0, 0,
						0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1
					],//26
					[
					]
				]
			}
		},
		field = levels[1972].I[0],
		fieldWidth = 11,
		maxDepth = 13,
		fieldHeight = field.length / fieldWidth,
		maxHPath = fieldWidth * 3,
		maxVPath = fieldHeight * 3,
		length = field.length,
		balls = [],
		build = function () {
			var i, j,
				cell,
				$field = $('.field'),
				$row, $cell;

			if ($field.length)
				$field.replaceWith($field = $('<div class="field">'));
			else
				$field = $('<div class="field">').appendTo('body');

			updateBalls(balls, field, current);

			for (i = 0, j = 0; i < length; i++, j--) {
				if (!j) {
					$row = $('<div class="row">').appendTo($field);
					j = fieldWidth;
				}
				cell = field[i];
				$cell = $('<div class="cell ' + map[cell] + ' i' + i + '">');
				if (isBall(cell)) {
					if (balls.length > 1)
						$cell.html(balls.indexOf(i) + 1);
					if (current == i)
						$cell.addClass('current');
				}
				$row.append($cell);
			}
		},
		moves = 0,
		current,
		setCurrent = function (i) {
			current = i;
			$('.current').removeClass('current');
			$('.i' + current).addClass('current');
		},
		userControl = function (val, direction) {
			if (val) {
				if (current == null || !isBall(field[current]))
					setCurrent(findNextBall(0));
				var tmp = field.slice(0),
					i = length,
					victory = move(field, current, direction);
				while (--i) if (field[i] != tmp[i] && isBall(field[i]))
					setCurrent(i);

				build();
				$('.counter').html(++moves);
				if (victory)
					alert('you won!');
			}
		},
		fillBalls = function (balls, field) {
			var i;
			for (i = 0; i < length; i++) {
				if (isBall(field[i]))
					balls.push(i);
			}
		},
		updateBalls = function (balls, field, current) {
			var i, j;
			for (i = 0; i < balls.length; i++) {
				if (balls[i] != null && !isBall(field[balls[i]])) {
					if (balls[i] == current) {
						balls[i] = null;
						for (j = 0; j < length; j++) {
							if (isBall(field[j]) && balls.indexOf(j) == -1) {
								balls[i] = j;
							}
						}
					} else {
						balls[i] = null;
					}
				}
			}
		},
		isBall = function (cell) {
			return cell == 7 || cell == 8 || cell == 19 || cell == 20;
		},
		findNextBall = function (index) {
			var ball,
				balls = [];
			if ((ball = field.indexOf(7, index)) != -1)
				balls.push(ball);
			if ((ball = field.indexOf(8, index)) != -1)
				balls.push(ball);
			if ((ball = field.indexOf(19, index)) != -1)
				balls.push(ball);
			if ((ball = field.indexOf(20, index)) != -1)
				balls.push(ball);
			if (balls.length)
				return Math.min.apply(Math, balls);
			if (index)
				return findNextBall(0);
		},
		move = function (field, index, direction) {
			var pos = index,
				queue = [],
				path = [],
				moving = true,
				alive = true,
				i,
				yellow;

			switch (field[index]) {
				case 7:
					yellow = false;
					field[pos] = 0;
					break;
				case 8:
					yellow = true;
					field[pos] = 0;
					break;
				case 19:
					yellow = false;
					field[pos] = 4;
					break;
				case 20:
					yellow = true;
					field[pos] = 4;
					break;
			}
			while (moving) {
				if (field[pos] != 24)
					path.push(pos);
				switch (direction) {
					case 0:
						pos++;
						if (!(pos % fieldWidth))
							pos -= fieldWidth;
						if (path.length > maxHPath) {
							moving = false;
							alive = false;
							queue.length = 0;
						}
						break;
					case 1:
						if (!(pos % fieldWidth))
							pos += fieldWidth;
						pos--;
						if (path.length > maxHPath) {
							moving = false;
							alive = false;
							queue.length = 0;
						}
						break;
					case 2:
						pos += fieldWidth;
						if (pos >= length)
							pos -= length;
						if (path.length > maxVPath) {
							moving = false;
							alive = false;
							queue.length = 0;
						}
						break;
					case 3:
						pos -= fieldWidth;
						if (pos < 0)
							pos += length;
						if (path.length > maxVPath) {
							moving = false;
							alive = false;
							queue.length = 0;
						}
						break;
				}
				switch (field[pos]) {
					case 1:
					case 4:
						moving = false;
						break;
					case 2:
						if (yellow && !queue.length) {
							yellow = false;
							field[pos] = 0;
						} else {
							moving = false;
						}
						break;
					case 3:
						field[pos] = 4;
						if (queue.length) {
							if (queue.length > 1) {
								i = queue.length - 1;
								while (i--) {
									field[path.pop()] = queue[i];
								}
							}
							path.pos = pos;
							if (alive) {
								pos = path.pop();
								field[pos] = field[pos] ? yellow ? 20 : 19 : yellow ? 8 : 7;
							}
							pos = path.pos;
							path = [];
							alive = false;
						}
						break;
					case 6:
						if (queue.length) {
							moving = false;
							break;
						}
						yellow = true;
					case 5:
						moving = false;
						if (!queue.length) {
							field[pos] = 0;
							for (i = 0; i < length; i++) {
								if (field[i] == 5 || field[i] == 6) {
									moving = true;
									break;
								}
							}
							if (!moving)
								return true;
						}
						break;
					case 8:
						if (queue.length) {
							moving = false;
							break;
						}
						yellow = true;
					case 7:
						if (queue.length) {
							moving = false;
						} else {
							field[pos] = 0;
						}
						break;
					case 9:
						if (queue.length) {
							if (queue[queue.length - 1] - direction == 14) {
								field[pos] = 0;
							} else
								moving = false;
						} else {
							field[pos] = 0;
							moving = false;
							alive = false;
						}
						break;
					case 10:
						moving = false;
						if (direction == 1 && !queue.length) {
							alive = false;
						}
						break;
					case 11:
						moving = false;
						if (direction == 0 && !queue.length) {
							alive = false;
						}
						break;
					case 12:
						moving = false;
						if (direction == 3 && !queue.length) {
							alive = false;
						}
						break;
					case 13:
						moving = false;
						if (direction == 2 && !queue.length) {
							alive = false;
						}
						break;
					case 14:
						field[pos] = 0;
						if (direction == 1 && !queue.length) {
							alive = false;
						}
						queue.push(14);
						break;
					case 15:
						field[pos] = 0;
						if (direction == 0 && !queue.length) {
							alive = false;
						}
						queue.push(15);
						break;
					case 16:
						field[pos] = 0;
						if (direction == 3 && !queue.length) {
							alive = false;
						}
						queue.push(16);
						break;
					case 17:
						field[pos] = 0;
						if (direction == 2 && !queue.length) {
							alive = false;
						}
						queue.push(17);
						break;
					case 18:
						field[pos] = 0;
						if (queue.length && queue[queue.length - 1] == 18) {
							queue.pop();
						} else {
							queue.push(18);
						}
						break;
					case 21:
						pos = field.indexOf(21, pos + 1);
						if (pos == -1)
							pos = field.indexOf(21);
						break;
					case 22:
						pos = field.indexOf(22, pos + 1);
						if (pos == -1)
							pos = field.indexOf(22);
						break;
					case 23:
						moving = false;
						if (!queue.length) {
							alive = false;
						}
						break;
					case 24:
						switch (direction) {
							case 0:
								i = -1;
								break;
							case 1:
								i = 1;
								break;
							case 2:
								i = -fieldWidth;
								break;
							case 3:
								i = fieldWidth;
								break;
						}
						path.push(pos + i);
						do {
							pos += i;
						} while (field[pos] != 24);
						break;
				}
			}
			if (i = queue.length) {
				while (i--) {
					field[path.pop()] = queue[i];
				}
			}
			if (alive) {
				pos = path.pop();
				field[pos] = field[pos] ? yellow ? 20 : 19 : yellow ? 8 : 7;
			}
		},
		directions = ['right', 'left', 'down', 'up'],
		calculate = function (depth) {
			var time = new Date().getTime(),
				i,
				solution = solve(field, depth),
				$solution = $('.solution').empty(),
				tmp,
				local = [];
			fillBalls(balls, field);
			if (solution) {
				$solution.append('<div>' + (new Date().getTime() - time) + ' ms, ' + solution.length + ' moves</div>');
				$solution.append($solution = $('<div>'));
				fillBalls(local, field);
				if (local.length > 1) {
					tmp = field.slice(0);
					for (i = 0; i < solution.length; i++) {
						$solution.append('<div class="' + directions[solution[i][1]] + '"><span>' + (local.indexOf(solution[i][0]) + 1) + '</span></div>');
						move(tmp, solution[i][0], solution[i][1]);
						updateBalls(local, tmp, solution[i][0]);
					}
				} else {
					for (i = 0; i < solution.length; i++) {
						$solution.append('<div class="' + directions[solution[i][1]] + '"></div>');
					}
				}
			} else {
				$solution.html(new Date().getTime() - time);
			}
		},
		solve = function (field, depth) {
			var i, j, l,
				cell,
				tmp,
				best;
			if (depth) {
//				i = field.indexOf(7);
				for (i = 0; i < length; i++) {
					cell = field[i];
					if (cell == 7 || cell == 8 || cell == 19 || cell == 20) {
						for (j = 0; j < 4; j++) {
							tmp = field.slice(0);
							if (move(tmp, i, j)) {
								return [
									[i, j]
								];
							} else {
								l = length;
								while (--l) {
									if (tmp[l] !== field[l]) break;
								}
								if (l) {
									tmp = solve(tmp, depth - 1);
									if (tmp && tmp.length < depth) {
										depth = tmp.length;
										tmp.unshift([i, j]);
										best = tmp;
									}
								}
							}
						}
					}
				}
				return best;
			}
		};

	$('body').append('<div class="vertical-aligner"></div><div class="counter"></div><div class="solution"></div>');

	keys.on({
		right: function (val) {
			userControl(val, 0);
		},
		left: function (val) {
			userControl(val, 1);
		},
		down: function (val) {
			userControl(val, 2);
		},
		up: function (val) {
			userControl(val, 3);
		},
		space: function (val) {
			if (val)
				calculate(maxDepth);
		},
		ctrl: function (val) {
			if (val)
				setCurrent(findNextBall(current + 1));
		}
	});

	fillBalls(balls, field);
	build(true);
});
