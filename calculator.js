define([
	'field'
], function (field) {

	'use strict';

	var length,
		mutable = [],
		hashStorage = [],
		mutableLength = 0,
		hashMap = 'abcdefghigklmnopqrstuvwxyz'.split(''),
		move = field.move;

	function isMutable(cell) {
		return cell < 23 && cell != 4;
	}

	function fillMutable() {
		mutable.length = 0;
		var i;
		for (i = 0; i < length; i++) {
			if (isMutable(field[i])) {
				mutable.push(i);
			}
		}
		mutableLength = mutable.length;
	}

	function calculate(data, depth) {
		var i;

		if (data) {
			field.set(data);
			length = field.length;
		}
		if (!depth) {
			depth = data.moves;
		}
		length = field.length;

		fillMutable();

		hashStorage.length = 0;

		for (i = 0; i <= depth; i++) {
			hashStorage[i] = {};
		}

		return solve(field, depth);
	}

	function generateHash(field) {
		var i, hash = '';
		for (i = 0; i < mutableLength; i++) {
			hash += hashMap[field[mutable[i]]];
		}
		return hash;
	}

	function solve(field, depth) {
		var i, j, l,
			cell,
			tmp,
			best,
			hash;

		if (depth) {
			hash = generateHash(field);

			for (i = depth; i < hashStorage.length; i++) {
				if (hash in hashStorage[i]) {
					return;
				}
			}

			hashStorage[depth][hash] = true;

			for (i = 0; i < length; i++) {
				cell = field[i];
				if (cell == 7 || cell == 8 || cell == 19 || cell == 20 || cell == 18 || cell == 22) {
					for (j = 0; j < 4; j++) {
						tmp = field.slice(0);
						if (move(tmp, i, j)) {
							return [
								[i, j]
							];
						} else {

//							if (tmp[58] != 6) {
//								j = 0;
//								l = 0;
//								for (i = 0; i < length; i++) {
//									if (tmp[i] == 6 || tmp[i] == 8) {
//										j++;
//									}
//									if (tmp[i] == 7) {
//										l++;
//									}
//								}
//								if (j == 4 && l == 1) {
//									return [
//										[i, j]
//									];
//								} else {
//									return;
//								}
//							}

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
	}

	return {calculate: calculate};
});
