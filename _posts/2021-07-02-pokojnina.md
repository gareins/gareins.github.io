---
layout:     post
title:      Dodatno pokojninsko zavarovanje
date:       2021-02-05 12:00:00
author:     Ožbolt Menegatti
summary:    Izračun za dodatno pokojninsko zavarovanje
categories: pokojnina
thumbnail:  /static/pension.png
tags:
 - pokojnina
 - javascript
---

# Izračun dodatnega pokojninskega zavarovanja

For english speakers: This is Slovenian specific topic and therefore it is written in that language. Use google translate if you wish to get some info.

Izračun davčne olajšave in stanja na računu pri vlaganju v drugi pokojninski steber je na voljo [pri](https://modra.si/varcevanje-za-pokojnino/) [vseh](https://www.triglavpokojnine.si/si/871/informativni-izracun.aspx?t=InfoIzrDodPok) [slovenskih](https://www.prva.si/pokojninsko-zavarovanje/dodatno-pokojninsko-zavarovanje/) [zavarovalnicah](https://www.sava-pokojninska.si/sl-si/informativni-izracuni/), ampak je malo zavajujoč, saj ne upoštevajo naslednjih dveh negativnih učinkov:

* inflacija: dejanska vrednost na računu in vrednost davčnih olaj\v sav pada s časom,
* stroški upravljalca: po zakonu lahko upravljalec (zavarovalnica) zaračuna storitve, od vsakega vplačila si lahko prilasti do 3%, dodatno pa si lahko še vsako leto prilasti 1% od skupnega stanja.

Zato sem sam izpeljal svoj račun, ki pa je omejen z:

* izračuna samo stanje, ko delodajalec ne vplačuje v pokojninski sklad, ampak to vplačujemo sami,
* ne izračuna mesečnega izplačila ob upokmojitvi, ampak samo skupno stanje na računu,
* spreminjanje različnih parametrov čez časovno obdobje, naprimer neto plača, inflacija,...

Vsak znesek v izračunu že upošteva inflacijo in predstavlja vrednost v današnjih evrih in ne dejanski številke, ki bo na računu ob upokojitvi.

Privzeto spodnji izračun predvideva posameznika z 2000EUR neto plače, ki mesečno vplačuje 180EUR. Donosnost sklada, ki ga vodi zavarovalnica je 3.5%, inflacija 2%, stroški s strani zavarovalnice pa so maksimalni kolikor določa zakon. Posameznik začne vplačevati pri letu 30, konča z vplačevanjem pri 45 letu in se upokoji pri 65 letih. Izračun pokaže letno stanje na računu, seštevek vplačila in seštevek olajšav dohodnine. 

Bralca vabim, da uporabi gumb *POVEČAJ* in spremeni parametre po svoji želji. Izračun se bo samodejno posodabljal. Poznavalce pa vabim, da najdejo napake v izračunu in da tole popravimo!

<script src="/js/flems.html" type="text/javascript" charset="utf-8"></script>
<div id="flems-container" style="border: 2px solid black; background-color: #ebebea;">
<div id="flems-focus-button">
<button style="color: black; margin: 1em auto; display: block" onclick="focusFlems()">POVECAJ</button>
</div>
<div id="flems" class="flems-height-normally"></div>
</div>
<script>
	let url = location.protocol + '//' + location.host + "/static/pokojnina";
	let savedScrollPosition;

	window.Flems(flems, {
		files: [],
		links: [
			{ name: 'konstante', type: 'script', url: `${url}/konstante.js` },
			{ name: 'logika', type: 'script', url: `${url}/izracun.js` },
			{ name: 'izris', type: 'script', url: `${url}/izris.js` },
		]
	})

	// flems scrolls down to it self after load, lets just scroll back up
	function regain_focus() {
		if(document.activeElement != document.body) {
			document.body.focus();
			window.scrollTo(0, 0);
		}
		else {
			setTimeout(regain_focus, 15);
		}
	}
	regain_focus();


	function focusFlems() {
		savedScrollPosition = window.scrollY;
		document.getElementById("flems-container").classList.add("flems-focused");
		document.getElementById("flems").classList.add("flems-height-when-focused");
		document.getElementById("flems").classList.remove("flems-height-normally");
		document.getElementById("menu").classList.add("class-hide");
		document.getElementById("flems-focus-button").classList.add("class-hide");
		document.getElementById("layout").classList.add("content-in-background");
	}

	document.body.addEventListener("keyup", function(arg) {
		if(arg.key == "Escape") {
			document.getElementById("flems-container").classList.remove("flems-focused");
			document.getElementById("menu").classList.remove("class-hide");
			document.getElementById("flems-focus-button").classList.remove("class-hide");
			document.getElementById("layout").classList.remove("content-in-background");
			document.getElementById("flems").classList.remove("flems-height-when-focused");
			document.getElementById("flems").classList.add("flems-height-normally");
			window.scrollTo(0, savedScrollPosition);
		}
	});

</script>
<style>
.flems-focused {
	position: absolute;
	width: 90%;
	height: 90%;
	top: 5%;
	left: 5%;
}
.class-hide {
	display: none;
}
.content-in-background {
	overflow: hidden;
	height: 100%;
}
.flems-height-when-focused {
	height: 100%;
}
.flems-height-normally {
	height: 25em;
}
</style>
