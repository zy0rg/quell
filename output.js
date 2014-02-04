define([
	'jquery',
	'core/keys',
	'field'
], function ($, keys, field) {

	var $counter,
		$target,
		map = [
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
		],
		current,
		directions = ['right', 'left', 'down', 'up'],
		balls = [],
		self = {
			init: init,
			control: control,
			printSolution: printSolution,
			moves: 0,
			setTarget: function (moves) {
			},
			switch: function () {
				setCurrent(findNextBall(current + 1));
			}
		};

	function init(data) {
		field.set(data);
		$target.html('Target: ' + field.moves);
		fillBalls(balls);
		build();
	}

	function fillBalls(balls) {
		var i;
		for (i = 0; i < field.length; i++) {
			if (isBall(field[i]))
				balls.push(i);
		}
	}

	function updateBalls(balls, field, current) {
		var i, j;
		for (i = 0; i < balls.length; i++) {
			if (balls[i] != null && !isBall(field[balls[i]])) {
				if (balls[i] == current) {
					balls[i] = null;
					for (j = 0; j < field.length; j++) {
						if (isBall(field[j]) && balls.indexOf(j) == -1) {
							balls[i] = j;
						}
					}
				} else {
					balls[i] = null;
				}
			}
		}
	}

	function isBall(cell) {
		return cell == 7 || cell == 8 || cell == 19 || cell == 20 || cell == 18 || cell == 22;
	}

	function build() {
		var i, j,
			cell,
			$field = $('.field'),
			$row, $cell;

		if ($field.length)
			$field.replaceWith($field = $('<div class="field">'));
		else
			$field = $('<div class="field">').appendTo('body');

		updateBalls(balls, field, current);

		for (i = 0, j = 0; i < field.length; i++, j--) {
			if (!j) {
				$row = $('<div class="row">').appendTo($field);
				j = field.width;
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
	}

	function findNextBall(index) {
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
	}

	function printSolution(solution, timespan) {

		var time = new Date().getTime(),
			i,
			$solution = $('.solution').empty(),
			tmp,
			local = [];

		fillBalls(balls);
		if (solution) {
			$solution.append('<div>' + timespan + ' ms, ' + solution.length + ' moves</div>');
			$solution.append($solution = $('<div>'));
			fillBalls(local);
			if (local.length > 1) {
				tmp = field.slice(0);
				for (i = 0; i < solution.length; i++) {
					$solution.append('<div class="' + directions[solution[i][1]] + '"><span>' + (local.indexOf(solution[i][0]) + 1) + '</span></div>');
					field.move(tmp, solution[i][0], solution[i][1]);
					updateBalls(local, tmp, solution[i][0]);
				}
			} else {
				for (i = 0; i < solution.length; i++) {
					$solution.append('<div class="' + directions[solution[i][1]] + '"></div>');
				}
			}
		} else {
			$solution.html(timespan + ' ms');
		}
	}

	function setCurrent(i) {
		current = i;
		$('.current').removeClass('current');
		$('.i' + current).addClass('current');
	}

	function control(val, direction) {
		if (val) {
			if (current == null || !isBall(field[current]))
				setCurrent(findNextBall(0));
			var tmp = field.slice(0),
				i = field.length,
				victory = field.move(field, current, direction);
			while (--i) if (field[i] != tmp[i] && isBall(field[i]))
				setCurrent(i);

			$('.solution').find('.' + directions[direction] + ':not(.spike)').first().addClass('rotating spike');

			build();
			$counter.html('Moves : ' + (++(self.moves)));
			if (victory)
				alert('you won!');
		}
	}

	$('body').append('<div class="vertical-aligner"></div><div class="counter"></div><div class="solution"></div>');
	$('.counter').append($target = $('<div>Target: ' + (field.moves || '?') + '</div>')).append($counter = $('<div>'));

	return self;
});
