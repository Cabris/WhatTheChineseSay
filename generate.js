var datasPath = "https://raw.githubusercontent.com/Cabris/WhatTheChineseSay/master/data.txt";
var patternPath = "https://raw.githubusercontent.com/Cabris/WhatTheChineseSay/master/pattern.txt";
var datas = ".";
var patterns = [];
var data = ".";
var pattern;

var shareContant = "javascript: void(window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)) ));";

initialize();

$(function() {
	$("#_button").button().click(function(event) {
		generate();
		//console.log(fbhtml_url);
	});
	$("#share").button().click(function(event) {
		
		var text=_text.innerHTML.replace(/<br>/g, '\n');
		
		shareToFb(text+"\n \nPowered by 中壢李姓文產生器\n"+window.location.toString());
		//shareToFb("123");
	});

	//$( "#section" ).hide();
	$("#controls").hide();
});

function generate() {
	pattern = getRandomElement(patterns);
	var _text = document.getElementById("_text");
	_text.innerHTML = generateSentences();
	var selectedEffect = "drop";
	var options = {};
	// some effects have required parameters
	if (selectedEffect === "scale") {
		options = {
			percent : 100
		};
	} else if (selectedEffect === "size") {
		options = {
			to : {
				width : 280,
				height : 185
			}
		};
	}
	//$( "#section" ).show( selectedEffect, options, 500, function(){} );
	$("#controls").show(selectedEffect, options, 500, function() {
	});

}

function generateSentences() {
	var text = "";
	var indexs = [];
	for ( i = 0; i < pattern.body.length; i++) {
		indexs.push(i);
	}
	var indexs_r = indexs.sort(randomsort);
	//console.log(pattern.head);
	text += generateSentence(pattern.head);
	if (isLastWord(text))
		text += "，";
	for ( i = 0; i < indexs.length; i++) {
		var s = pattern.body[indexs[i]];

		if ($.isArray(s))
			s = generateSentence(getRandomElement(s));
		else
			s = generateSentence(s);
		text += s;

		if (isLastWord(s)) {
			if (i == indexs.length - 1)
				text += "。<br>";
			else
				text += "，<br>";
		}
	}

	//console.log(text);
	return text + "<br> <br> <br>";
}

function isLastWord(str) {
	var lastChar = str.substr(str.length - 1);
	return !(lastChar == "!" || lastChar == "?" || lastChar == "？" || lastChar == "。" || lastChar == "，");
}

function generateSentence(input) {
	//console.log(input);
	var homeos = getRandomElement(data.homeos);
	var positives = getRandomElement(data.positives);
	var negatives = getRandomElement(data.negatives);
	var bad_things = getRandomElement(data.bad_things);

	input = input.replace(/#homeos#/g, homeos);
	input = input.replace(/#positives#/g, positives);
	input = input.replace(/#negatives#/g, negatives);
	input = input.replace(/#bad_things#/g, bad_things);
	//console.log(input);
	return input;
}

function getRandomElement(array) {
	var index = Math.floor((Math.random() * (array.length)));
	//console.log(index);
	return array[index];
}

function initialize() {

	//	$("#share").attr("data-href", fbhtml_url);
	$('#section').jScrollPane();
	$.getJSON(datasPath, function(_datas) {
		datas = _datas;
		data = getRandomElement(datas);

		for (var i = 0; i < datas.length; i++) {
			var option = $("<option></option>").text(datas[i].id).attr("id", datas[i].id).attr("value", i);
			$("#data_select").append(option);
			//console.log(option);
		}

		$("#" + data.id).attr("selected", "selected");

		$("#data_select").selectmenu({
			change : function(event, ui) {
				data = datas[ui.item.value];
				//console.log(data);
			}
		});

		$.getJSON(patternPath, function(_pattern) {
			patterns = _pattern;
			//console.log(patterns);
			//pattern = _pattern[1];
			generate();
		});

	});

}

function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
}

//alert(arr2);

