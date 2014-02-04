define(function () {

	var lastSpikeDirection,
		field = [],
		fieldWidth,
		fieldHeight,
		maxHPath,
		maxVPath,
		length;

	field.set = function set(data) {
		field.length = 0;
		field.push.apply(field, data.field);

		field.moves = data.moves;
		field.width = fieldWidth = data.width;
		field.height = fieldHeight = field.length / fieldWidth;

		maxHPath = fieldWidth * 3;
		maxVPath = fieldHeight * 3;
		length = field.length;
	};

	field.move = function move(field, index, direction) {
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
						if (!moving) {
							return true;
						}
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
						if (!moving) {
							return true;
						}
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
	};

	return field;
});
