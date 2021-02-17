// Za vsako vplacilo lahko zavarovalnica vzame 3%
const STROSEK_VPLACILO = 3.0
// Za upravljanje lahko zavarovalnica letno vzame 1%
const STROSEK_UPRAVLJANJE = 1.0

// cilj svetovne politike in zgodovinska povprecna vrednost je 2%
const INFLACIJA = 2.0
// donosnost, ki jo dosega zavarovalnica z vezavo denarja
const DONOSNOST = 3.5

// povprecna neto placa v casu vplacevanja
const NETO_PLACA = 2000
// vplacevanje, povprecna vrednost
const MESECNO_VPLACILO = 180

// cas vplacevanja, starost ob zacetku, starost ob zakljucku
const STAROST_ZACETEK = 30
const STAROST_KONEC = 45

// leto upokojitve
const UPOKOJITEV = 65

// ostale konstante potrebne pri izracunu
// predvidevamo, da se te stevilke ne bodo spreminjale
const DOHODNINA_OLAJSAVA_BRUTO = 5.844
const DOHODNINA_OLAJSAVA_MAX = 2819.09

const DAVCNA_OSNOVA = [0, 708.33, 2083.33, 4166.67, 6000]
const DOHODNINA_PROCENT = [0.16, 0.26, 0.33, 0.39, 0.5]
const DOHODNINA_PLUS = [0, 113.33, 470.83, 1158.33, 1873.33]
const SPLOSNA_AKONTACIJA = 275
const BRUTO_PRISPEVKI_RELATIVNO = 0.221
