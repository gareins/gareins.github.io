var izris_html = `
<style>
td { border: 1px solid #ddd; padding: 8px; }
tr:nth-child(even) { background-color: #f2f2f2; }
tr:hover { background-color: #ddd; }
.esc { float: right; }
</style>
<p>&nbsp;<span class="esc">Esc tipka zapre prikaz.</span></p>
<table>`;

function izris_vrstica(vrednosti) {
  izris_html += "<tr>";
  for(let vrednost of vrednosti) {
    izris_html += `<td>${vrednost}</td>`;
  }
  izris_html += "</tr>";
}

let denar_v_skladu = 0;
let skupno_prisparana_dohodnina = 0;
let skupno_vplacilo = 0;

izris_vrstica(["Leto", "Vrednost v skladu", "Akumulirana vplacila", "Akumulirana prisparana dohodina"]);

for(let leto = STAROST_ZACETEK; leto < UPOKOJITEV; leto++) {
  let [nov_denar_v_skladu, letno_prisparana_dohodnina, letno_vplacilo] = letni_izracun(denar_v_skladu, leto);
  denar_v_skladu = nov_denar_v_skladu;
  skupno_prisparana_dohodnina += letno_prisparana_dohodnina;
  skupno_vplacilo += letno_vplacilo;

  izris_vrstica([leto + 1, Math.round(denar_v_skladu), Math.round(skupno_vplacilo), Math.round(skupno_prisparana_dohodnina)]);
}

document.write(izris_html + "</table>");
