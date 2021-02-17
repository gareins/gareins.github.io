function dohodnina_na_osnovo(osnova) {
  let idx = 0;
  for(; idx < DAVCNA_OSNOVA.length; idx++) {
    if(osnova < DAVCNA_OSNOVA[idx]) {
      break;
    }
  }

  idx -= 1;
  return (osnova - DAVCNA_OSNOVA[idx]) * DOHODNINA_PROCENT[idx] + DOHODNINA_PLUS[idx];
}

function osnova_iz_neto(neto) {
  let osnova = -1;
  for(let idx = DAVCNA_OSNOVA.length - 1; idx >= 0; idx--) {
    osnova = neto - SPLOSNA_AKONTACIJA - DAVCNA_OSNOVA[idx] * DOHODNINA_PROCENT[idx] + DOHODNINA_PLUS[idx];
    osnova /= (1 - DOHODNINA_PROCENT[idx]);
    if(osnova >= DAVCNA_OSNOVA[idx]) {
      break;
    }
  }

  return osnova;
}

function bruto_iz_neto(neto) {
    return (osnova_iz_neto(neto) + SPLOSNA_AKONTACIJA) / (1 - BRUTO_PRISPEVKI_RELATIVNO);
}

function preveri_max_vplacilo(neto, vplacilo) {
    let bruto = bruto_iz_neto(neto);
    let max_vplacilo = Math.min(DOHODNINA_OLAJSAVA_MAX / 12, (DOHODNINA_OLAJSAVA_BRUTO / 100) * bruto);
    return Math.min(vplacilo, max_vplacilo);
}

function prisparana_dohodnina(neto) {
  let osnova = osnova_iz_neto(neto);
  let upostevano_vplacilo_pri_olajsavi = preveri_max_vplacilo(neto, MESECNO_VPLACILO);
  let dohodnina_brez_olajsave = dohodnina_na_osnovo(osnova)
  let dohodnina_z_olajsavo = dohodnina_na_osnovo(osnova - upostevano_vplacilo_pri_olajsavi);

  return 12 * (dohodnina_brez_olajsave - dohodnina_z_olajsavo);
}

function letni_izracun(denar_v_skladu, starost) {
  denar_v_skladu *= (1 + (DONOSNOST - INFLACIJA - STROSEK_UPRAVLJANJE) / 100);
  let dohodnina = 0;
  let inflacijska_vrednost_denarja = Math.pow(1 - INFLACIJA / 100, starost - STAROST_ZACETEK);

  let vplacilo = (starost < STAROST_KONEC) ? MESECNO_VPLACILO * 12 : 0;

  if(vplacilo > 0) {
    denar_v_skladu += vplacilo / (1 + STROSEK_VPLACILO / 100);
    let dohodnina_brez_inflacije = prisparana_dohodnina(NETO_PLACA);
    dohodnina = dohodnina_brez_inflacije * inflacijska_vrednost_denarja;
  }

  return [denar_v_skladu, dohodnina, vplacilo * inflacijska_vrednost_denarja];
}
