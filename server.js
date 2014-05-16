var requirejs = require('requirejs'),
	levels = requirejs('levels'),
	calculator = requirejs('calculator'),
	stdin = process.openStdin();

stdin.addListener("data", function (data) {

	var val, level, i;
	val = data.toString().substring(0, data.length - 1);
	val = val.split('-');
	level = levels;
	i = 0;
	while (level && i < val.length) {
		level = level[parseInt(val[i]) || val[i]];
		i++;
	}
	if (level && level.field) {
		console.log('solving...');
		val = new Date().getTime();
		i = calculator.calculate(level);
		console.log((i ? i.length + ' moves' : 'not solved') + ', ' + (new Date().getTime() - val) + ' ms', i);
	} else {
		console.log('invalid input');
	}
});