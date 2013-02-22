"use strict";
var test = require('tap').test;
var update = require('../util/updateHelper.js');

test('Simple updateHelper.buildColsValues test', function (t) {
	var item = { id: 1, name: 'Test', color: 'Blue' };
	var expectedString = 'id=?,name=?,color=?';

	update.buildColsValues({
		item: item,
		tableName: 'test'
	}, function (err, res) {
		t.equal(res, expectedString, "Returns columns-values section for UPDATE");
		t.end();
	});
});

test('updateHelper.buildColsValues test with rules', function (t) {
	var item = { id: 1, name: 'Test', color: 'Blue' };
	var updateRules = [function(item, fields, values, expressions, tableName) {
		fields.push('modified');
		if(expressions)
			expressions.push('UTC_TIMESTAMP');
		else
			values.push('UTC_TIMESTAMP');
	}];
	var expectedString = 'id=?,name=?,color=?,modified=UTC_TIMESTAMP';

	update.buildColsValues({
		item: item,
		tableName: 'test',
		updateRules: updateRules
	}, function (err, res) {
		t.equal(res, expectedString, "Returns columns-values section for UPDATE");
		t.end();
	});
});
