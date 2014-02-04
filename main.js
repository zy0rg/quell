define([
	'levels',
	'field',
	'output',
	'calculator',
	'core/keys'
], function (levels, field, output, calculator, keys) {
	output.init(levels[1972].III[0]);

	keys.on({
		right: function (val) {
			output.control(val, 0);
		},
		left: function (val) {
			output.control(val, 1);
		},
		down: function (val) {
			output.control(val, 2);
		},
		up: function (val) {
			output.control(val, 3);
		},
		space: function (val) {
			if (val) {
				var time = new Date().getTime();
				output.printSolution(calculator.calculate(null, field.moves - output.moves), new Date().getTime() - time);
			}
		},
		ctrl: function (val) {
			if (val)
				output.switch();
		}
	});
});
