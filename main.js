define([
	'jquery',
	'core/keys',
	'core/md5',
	'./levels'
], function ($, keys, md5, levels) {

	'use strict';

	var map = [
			'empty',                //0  +
			'box',                  //1  +
			'wall yellow',          //2  +
			'bush',                 //3  +
			'wall bush',            //4  +
			'pearl',                //5  +
			'yellow pearl',         //6  +
			'ball',                 //7  +
			'yellow ball',          //8  +
			'red ball',             //9  +
			'rotating spike right', //10 +
			'rotating spike left',  //11 +
			'rotating spike down',  //12 +
			'rotating spike up',    //13 +
			'wooden spike right',   //14 +
			'wooden spike left',    //15 +
			'wooden spike down',    //16 +
			'wooden spike up',      //17 +
			'tumbler yellow ball',  //18 +
			'bush ball',            //19 +
			'bush yellow ball',     //20 +
			'tumbler',              //21 +
			'tumbler ball',         //22 +
			'x spike',              //23 -
			'vacuum',               //24 -
			'spike right',          //25 -
			'spike left',           //26 -
			'spike down',           //27 -
			'spike up',             //28 -
			'ring',                 //29 -
			'yellow ring',          //30 -
			'wall'                  //31 -
			//32 - 9 = 23
		],// 1972 - 3 - 0
		data = levels[1972].III[0],
		field = data.field,
		fieldWidth = data.width,
		maxDepth = data.moves,
		fieldHeight = field.length / fieldWidth,
		maxHPath = fieldWidth * 3,
		maxVPath = fieldHeight * 3,
		length = field.length,
		balls = [],
		mutable = [],
		hashStorage = [],
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
		unique = 0,
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

				$('.solution').find('.' + directions[direction] + ':not(.spike)').first().addClass('rotating spike');

				build();
				$counter.html('Moves : ' + (++moves));
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
			return cell == 7 || cell == 8 || cell == 19 || cell == 20 || cell == 18 || cell == 22;
		},
		isMutable = function (cell) {
			return cell < 23 && cell != 4;
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
			if ((ball = field.indexOf(18, index)) != -1)
				balls.push(ball);
			if ((ball = field.indexOf(22, index)) != -1)
				balls.push(ball);
			if (balls.length)
				return Math.min.apply(Math, balls);
			if (index)
				return findNextBall(0);
		},
		fillMutable = function () {
			mutable.length = 0;
			var i;
			for (i = 0; i < length; i++) {
				if (isMutable(field[i])) {
					mutable.push(i);
				}
			}
//			if (mutable.length % 2) {
//				mutable.push(0);
//			}
			mutableLength = mutable.length;
		},
		mutableLength = 0,
		lastSpikeDirection,
		move = function (field, index, direction) {
			var pos = index,
				queue = [],
				path = [],
				moving = true,
				alive = true,
				i, j,
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
				case 22:
					yellow = false;
					field[pos] = 21;
					for (i = 0; i < length; i++) {
						j = field[i];
						if (j == 10 || j == 11 || j == 12 || j == 13) {
							lastSpikeDirection = j;
							field[i] = 10 + direction;
						}
					}
					break;
				case 18:
					yellow = true;
					field[pos] = 21;
					for (i = 0; i < length; i++) {
						j = field[i];
						if (j == 10 || j == 11 || j == 12 || j == 13) {
							lastSpikeDirection = j;
							field[i] = 10 + direction;
						}
					}
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
						field[pos] = 0;
						if (queue.length && queue[queue.length - 1] == 1) {
							queue.pop();
						} else {
							queue.push(1);
						}
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
					case 4:
					case 31:
						moving = false;
						break;
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
					case 6:
						moving = false;
						if (!queue.length) {
							field[pos] = 0;
							for (i = 0; i < length; i++) {
								if (field[i] == 5 || field[i] == 6) {
									yellow = true;
									moving = true;
									break;
								}
							}
							if (!moving)
								return true;
						}
						break;
					case 7:
						if (queue.length) {
							moving = false;
						} else {
							field[pos] = 0;
						}
						break;
					case 8:
						if (queue.length) {
							moving = false;
						} else {
							field[pos] = 0;
							yellow = true;
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
					case 25:
						moving = false;
						if (direction == 1 && !queue.length) {
							alive = false;
						}
						break;
					case 11:
					case 26:
						moving = false;
						if (direction == 0 && !queue.length) {
							alive = false;
						}
						break;
					case 12:
					case 27:
						moving = false;
						if (direction == 3 && !queue.length) {
							alive = false;
						}
						break;
					case 13:
					case 28:
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
					case 29:
						pos = field.indexOf(29, pos + 1);
						if (pos == -1)
							pos = field.indexOf(29);
						break;
					case 30:
						pos = field.indexOf(30, pos + 1);
						if (pos == -1)
							pos = field.indexOf(30);
						break;
					case 21:
						for (i = 0; i < length; i++) {
							j = field[i];
							if (j == 10 || j == 11 || j == 12 || j == 13) {
								lastSpikeDirection = j;
								field[i] = 10 + direction;
							}
						}
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
				switch (field[pos]) {
					case 0:
						field[pos] = yellow ? 8 : 7;
						break;
					case 4:
						field[pos] = yellow ? 20 : 19;
						break;
					case 21:
						for (i = 0; i < length; i++) {
							j = field[i];
							if (j == 10 || j == 11 || j == 12 || j == 13) {
								field[i] = lastSpikeDirection;
							}
						}
						field[pos] = yellow ? 18 : 22;
						break;
				}
			}
		},
		directions = ['right', 'left', 'down', 'up'],
		calculate = function (depth) {

			fillMutable();

			var time = new Date().getTime(),
				i,
				solution,
				$solution = $('.solution').empty(),
				tmp,
				local = [];

			hashStorage.length = 0;

			for (i = 0; i <= depth; i++) {
				hashStorage[i] = {};
			}

			solution = solve(field, depth);

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
		hashMap = 'abcdefghigklmnopqrstuvwxyz'.split(''),
		generateHash = function (field) {
			var i, hash = '';
			for (i = 0; i < mutableLength; i++) {
				hash += hashMap[field[mutable[i]]];
			}
			return hash;
		},
		solve = function (field, depth) {
			var i, j, l,
				cell,
				tmp,
				best,
				hash;

			if (depth) {
				hash = generateHash(field);

				for (i = depth; i < hashStorage.length; i++) {
					if (hashStorage[i][hash]) {
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
		},
		$counter,
		$unique;

	$('body').append('<div class="vertical-aligner"></div><div class="counter"></div><div class="solution"></div>');
	$('.counter').append('<div>Target: ' + maxDepth + '</div>').append($counter = $('<div>')).append($unique = $('<div>'));

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
				calculate(maxDepth - moves);
		},
		ctrl: function (val) {
			if (val)
				setCurrent(findNextBall(current + 1));
		}
	});

	fillBalls(balls, field);
	build(true);
});
