import { Player } from '@/lib/engine/types'

// ---------------------------------------------------------------------------
// ARGENTINA
// ---------------------------------------------------------------------------
const ARG_PLAYERS: Player[] = [
  { id: 'arg-rulli',       name: 'Rulli',        country: 'ARG', position: 'GK',  number: 1,  overall: 80, stats: { speed: 55, passing: 68, shooting: 10, defending: 82, stamina: 80 } },
  { id: 'arg-martinez-e', name: 'E. Martínez',   country: 'ARG', position: 'GK',  number: 23, overall: 85, stats: { speed: 57, passing: 70, shooting: 10, defending: 86, stamina: 82 } },
  { id: 'arg-otamendi',   name: 'Otamendi',      country: 'ARG', position: 'CB',  number: 19, overall: 82, stats: { speed: 72, passing: 65, shooting: 35, defending: 87, stamina: 76 } },
  { id: 'arg-romero',     name: 'Romero',        country: 'ARG', position: 'CB',  number: 13, overall: 83, stats: { speed: 76, passing: 67, shooting: 32, defending: 88, stamina: 78 } },
  { id: 'arg-tagliafico', name: 'Tagliafico',    country: 'ARG', position: 'LB',  number: 3,  overall: 79, stats: { speed: 79, passing: 74, shooting: 52, defending: 79, stamina: 81 } },
  { id: 'arg-molina',     name: 'Molina',        country: 'ARG', position: 'RB',  number: 26, overall: 81, stats: { speed: 84, passing: 74, shooting: 62, defending: 78, stamina: 83 } },
  { id: 'arg-fernandez',  name: 'E. Fernández',  country: 'ARG', position: 'CDM', number: 24, overall: 81, stats: { speed: 78, passing: 80, shooting: 67, defending: 78, stamina: 83 } },
  { id: 'arg-de-paul',    name: 'De Paul',       country: 'ARG', position: 'CM',  number: 7,  overall: 83, stats: { speed: 79, passing: 82, shooting: 72, defending: 73, stamina: 87 } },
  { id: 'arg-mac-allister',name: 'Mac Allister', country: 'ARG', position: 'CM',  number: 20, overall: 82, stats: { speed: 76, passing: 83, shooting: 74, defending: 71, stamina: 85 } },
  { id: 'arg-messi',      name: 'Messi',         country: 'ARG', position: 'CAM', number: 10, overall: 93, stats: { speed: 82, passing: 96, shooting: 91, defending: 37, stamina: 78 } },
  { id: 'arg-dybala',     name: 'Dybala',        country: 'ARG', position: 'CAM', number: 21, overall: 84, stats: { speed: 83, passing: 83, shooting: 83, defending: 42, stamina: 73 } },
  { id: 'arg-almada',     name: 'Almada',        country: 'ARG', position: 'LW',  number: 18, overall: 80, stats: { speed: 87, passing: 79, shooting: 77, defending: 51, stamina: 80 } },
  { id: 'arg-di-maria',   name: 'Di María',      country: 'ARG', position: 'RW',  number: 11, overall: 83, stats: { speed: 88, passing: 83, shooting: 79, defending: 43, stamina: 76 } },
  { id: 'arg-lautaro',    name: 'Lautaro',       country: 'ARG', position: 'ST',  number: 22, overall: 85, stats: { speed: 85, passing: 72, shooting: 87, defending: 45, stamina: 84 } },
]

// ---------------------------------------------------------------------------
// FRANCE
// ---------------------------------------------------------------------------
const FRA_PLAYERS: Player[] = [
  { id: 'fra-maignan',    name: 'Maignan',       country: 'FRA', position: 'GK',  number: 16, overall: 85, stats: { speed: 56, passing: 72, shooting: 10, defending: 87, stamina: 82 } },
  { id: 'fra-lloris',     name: 'Lloris',        country: 'FRA', position: 'GK',  number: 1,  overall: 82, stats: { speed: 54, passing: 70, shooting: 10, defending: 84, stamina: 78 } },
  { id: 'fra-upamecano',  name: 'Upamecano',     country: 'FRA', position: 'CB',  number: 4,  overall: 82, stats: { speed: 77, passing: 67, shooting: 33, defending: 85, stamina: 77 } },
  { id: 'fra-konate',     name: 'Konaté',        country: 'FRA', position: 'CB',  number: 5,  overall: 82, stats: { speed: 83, passing: 65, shooting: 30, defending: 85, stamina: 79 } },
  { id: 'fra-saliba',     name: 'Saliba',        country: 'FRA', position: 'CB',  number: 17, overall: 83, stats: { speed: 79, passing: 68, shooting: 28, defending: 87, stamina: 80 } },
  { id: 'fra-theo',       name: 'T. Hernández',  country: 'FRA', position: 'LB',  number: 22, overall: 80, stats: { speed: 91, passing: 73, shooting: 65, defending: 74, stamina: 84 } },
  { id: 'fra-pavard',     name: 'Pavard',        country: 'FRA', position: 'RB',  number: 2,  overall: 79, stats: { speed: 79, passing: 72, shooting: 58, defending: 80, stamina: 79 } },
  { id: 'fra-tchouameni', name: 'Tchouaméni',    country: 'FRA', position: 'CM',  number: 8,  overall: 82, stats: { speed: 80, passing: 78, shooting: 68, defending: 82, stamina: 84 } },
  { id: 'fra-camavinga',  name: 'Camavinga',     country: 'FRA', position: 'CDM', number: 12, overall: 82, stats: { speed: 85, passing: 79, shooting: 65, defending: 78, stamina: 85 } },
  { id: 'fra-rabiot',     name: 'Rabiot',        country: 'FRA', position: 'CM',  number: 14, overall: 80, stats: { speed: 82, passing: 78, shooting: 70, defending: 73, stamina: 80 } },
  { id: 'fra-griezmann',  name: 'Griezmann',     country: 'FRA', position: 'CAM', number: 7,  overall: 85, stats: { speed: 80, passing: 84, shooting: 82, defending: 54, stamina: 83 } },
  { id: 'fra-coman',      name: 'Coman',         country: 'FRA', position: 'LW',  number: 20, overall: 80, stats: { speed: 90, passing: 74, shooting: 75, defending: 50, stamina: 80 } },
  { id: 'fra-dembele',    name: 'Dembelé',       country: 'FRA', position: 'RW',  number: 11, overall: 83, stats: { speed: 94, passing: 76, shooting: 79, defending: 46, stamina: 78 } },
  { id: 'fra-mbappe',     name: 'Mbappé',        country: 'FRA', position: 'ST',  number: 10, overall: 93, stats: { speed: 97, passing: 79, shooting: 93, defending: 44, stamina: 87 } },
  { id: 'fra-giroud',     name: 'Giroud',        country: 'FRA', position: 'ST',  number: 9,  overall: 81, stats: { speed: 72, passing: 70, shooting: 84, defending: 50, stamina: 74 } },
]

// ---------------------------------------------------------------------------
// BRAZIL
// ---------------------------------------------------------------------------
const BRA_PLAYERS: Player[] = [
  { id: 'bra-alisson',    name: 'Alisson',       country: 'BRA', position: 'GK',  number: 1,  overall: 89, stats: { speed: 56, passing: 73, shooting: 10, defending: 89, stamina: 81 } },
  { id: 'bra-ederson',    name: 'Ederson',       country: 'BRA', position: 'GK',  number: 23, overall: 87, stats: { speed: 59, passing: 76, shooting: 10, defending: 87, stamina: 80 } },
  { id: 'bra-marquinhos', name: 'Marquinhos',    country: 'BRA', position: 'CB',  number: 4,  overall: 86, stats: { speed: 76, passing: 70, shooting: 28, defending: 88, stamina: 79 } },
  { id: 'bra-militao',    name: 'Militão',       country: 'BRA', position: 'CB',  number: 3,  overall: 85, stats: { speed: 81, passing: 67, shooting: 30, defending: 87, stamina: 80 } },
  { id: 'bra-alex-telles',name: 'Alex Telles',   country: 'BRA', position: 'LB',  number: 6,  overall: 77, stats: { speed: 79, passing: 72, shooting: 62, defending: 76, stamina: 79 } },
  { id: 'bra-danilo',     name: 'Danilo',        country: 'BRA', position: 'RB',  number: 13, overall: 79, stats: { speed: 80, passing: 74, shooting: 58, defending: 80, stamina: 80 } },
  { id: 'bra-casemiro',   name: 'Casemiro',      country: 'BRA', position: 'CDM', number: 5,  overall: 85, stats: { speed: 72, passing: 77, shooting: 68, defending: 87, stamina: 79 } },
  { id: 'bra-paqueta',    name: 'Paquetá',       country: 'BRA', position: 'CM',  number: 10, overall: 83, stats: { speed: 79, passing: 83, shooting: 72, defending: 65, stamina: 82 } },
  { id: 'bra-fred',       name: 'Fred',          country: 'BRA', position: 'CM',  number: 17, overall: 80, stats: { speed: 75, passing: 76, shooting: 62, defending: 77, stamina: 86 } },
  { id: 'bra-neymar',     name: 'Neymar',        country: 'BRA', position: 'CAM', number: 10, overall: 87, stats: { speed: 85, passing: 87, shooting: 84, defending: 38, stamina: 68 } },
  { id: 'bra-martinelli', name: 'Martinelli',    country: 'BRA', position: 'LW',  number: 22, overall: 80, stats: { speed: 89, passing: 73, shooting: 78, defending: 44, stamina: 83 } },
  { id: 'bra-vinicius',   name: 'Vinícius Jr.',  country: 'BRA', position: 'LW',  number: 20, overall: 89, stats: { speed: 95, passing: 77, shooting: 83, defending: 35, stamina: 84 } },
  { id: 'bra-raphinha',   name: 'Raphinha',      country: 'BRA', position: 'RW',  number: 19, overall: 81, stats: { speed: 86, passing: 78, shooting: 77, defending: 51, stamina: 82 } },
  { id: 'bra-rodrygo',    name: 'Rodrygo',       country: 'BRA', position: 'RW',  number: 11, overall: 82, stats: { speed: 87, passing: 78, shooting: 80, defending: 42, stamina: 82 } },
  { id: 'bra-richarlison',name: 'Richarlison',   country: 'BRA', position: 'ST',  number: 9,  overall: 81, stats: { speed: 82, passing: 67, shooting: 82, defending: 53, stamina: 85 } },
]

// ---------------------------------------------------------------------------
// ENGLAND
// ---------------------------------------------------------------------------
const ENG_PLAYERS: Player[] = [
  { id: 'eng-pickford',   name: 'Pickford',      country: 'ENG', position: 'GK',  number: 1,  overall: 82, stats: { speed: 55, passing: 68, shooting: 10, defending: 83, stamina: 79 } },
  { id: 'eng-pope',       name: 'Pope',          country: 'ENG', position: 'GK',  number: 22, overall: 80, stats: { speed: 53, passing: 66, shooting: 10, defending: 81, stamina: 77 } },
  { id: 'eng-stones',     name: 'Stones',        country: 'ENG', position: 'CB',  number: 5,  overall: 83, stats: { speed: 75, passing: 76, shooting: 38, defending: 86, stamina: 79 } },
  { id: 'eng-maguire',    name: 'Maguire',       country: 'ENG', position: 'CB',  number: 6,  overall: 79, stats: { speed: 68, passing: 68, shooting: 35, defending: 84, stamina: 74 } },
  { id: 'eng-trippier',   name: 'Trippier',      country: 'ENG', position: 'RB',  number: 12, overall: 82, stats: { speed: 78, passing: 82, shooting: 63, defending: 79, stamina: 80 } },
  { id: 'eng-shaw',       name: 'Shaw',          country: 'ENG', position: 'LB',  number: 3,  overall: 81, stats: { speed: 79, passing: 75, shooting: 55, defending: 80, stamina: 78 } },
  { id: 'eng-rice',       name: 'Rice',          country: 'ENG', position: 'CDM', number: 4,  overall: 86, stats: { speed: 80, passing: 81, shooting: 68, defending: 84, stamina: 87 } },
  { id: 'eng-bellingham', name: 'Bellingham',    country: 'ENG', position: 'CM',  number: 22, overall: 90, stats: { speed: 84, passing: 84, shooting: 79, defending: 75, stamina: 87 } },
  { id: 'eng-henderson',  name: 'Henderson',     country: 'ENG', position: 'CM',  number: 8,  overall: 78, stats: { speed: 74, passing: 79, shooting: 64, defending: 73, stamina: 83 } },
  { id: 'eng-mount',      name: 'Mount',         country: 'ENG', position: 'CAM', number: 19, overall: 81, stats: { speed: 80, passing: 81, shooting: 75, defending: 61, stamina: 83 } },
  { id: 'eng-saka',       name: 'Saka',          country: 'ENG', position: 'RW',  number: 7,  overall: 85, stats: { speed: 88, passing: 81, shooting: 78, defending: 62, stamina: 84 } },
  { id: 'eng-foden',      name: 'Foden',         country: 'ENG', position: 'LW',  number: 11, overall: 87, stats: { speed: 82, passing: 85, shooting: 81, defending: 52, stamina: 83 } },
  { id: 'eng-rashford',   name: 'Rashford',      country: 'ENG', position: 'LW',  number: 10, overall: 83, stats: { speed: 91, passing: 75, shooting: 80, defending: 48, stamina: 82 } },
  { id: 'eng-kane',       name: 'Kane',          country: 'ENG', position: 'ST',  number: 9,  overall: 91, stats: { speed: 80, passing: 83, shooting: 91, defending: 50, stamina: 82 } },
]

// ---------------------------------------------------------------------------
// SPAIN
// ---------------------------------------------------------------------------
const ESP_PLAYERS: Player[] = [
  { id: 'esp-unai-simon', name: 'Unai Simón',    country: 'ESP', position: 'GK',  number: 1,  overall: 82, stats: { speed: 56, passing: 71, shooting: 10, defending: 83, stamina: 80 } },
  { id: 'esp-raya',       name: 'Raya',          country: 'ESP', position: 'GK',  number: 13, overall: 81, stats: { speed: 55, passing: 72, shooting: 10, defending: 82, stamina: 79 } },
  { id: 'esp-laporte',    name: 'Laporte',       country: 'ESP', position: 'CB',  number: 14, overall: 83, stats: { speed: 76, passing: 73, shooting: 35, defending: 86, stamina: 78 } },
  { id: 'esp-le-normand', name: 'Le Normand',    country: 'ESP', position: 'CB',  number: 6,  overall: 81, stats: { speed: 75, passing: 69, shooting: 30, defending: 85, stamina: 77 } },
  { id: 'esp-alba',       name: 'Jordi Alba',    country: 'ESP', position: 'LB',  number: 18, overall: 81, stats: { speed: 88, passing: 80, shooting: 58, defending: 76, stamina: 80 } },
  { id: 'esp-carvajal',   name: 'Carvajal',      country: 'ESP', position: 'RB',  number: 2,  overall: 83, stats: { speed: 80, passing: 78, shooting: 57, defending: 83, stamina: 82 } },
  { id: 'esp-rodri',      name: 'Rodri',         country: 'ESP', position: 'CDM', number: 16, overall: 91, stats: { speed: 74, passing: 88, shooting: 68, defending: 87, stamina: 85 } },
  { id: 'esp-pedri',      name: 'Pedri',         country: 'ESP', position: 'CM',  number: 8,  overall: 87, stats: { speed: 79, passing: 89, shooting: 73, defending: 67, stamina: 80 } },
  { id: 'esp-gavi',       name: 'Gavi',          country: 'ESP', position: 'CM',  number: 9,  overall: 85, stats: { speed: 78, passing: 87, shooting: 67, defending: 73, stamina: 86 } },
  { id: 'esp-fabian',     name: 'Fabián Ruiz',   country: 'ESP', position: 'CAM', number: 5,  overall: 82, stats: { speed: 76, passing: 84, shooting: 71, defending: 65, stamina: 79 } },
  { id: 'esp-yamal',      name: 'L. Yamal',      country: 'ESP', position: 'RW',  number: 19, overall: 87, stats: { speed: 91, passing: 82, shooting: 78, defending: 47, stamina: 80 } },
  { id: 'esp-olmo',       name: 'Dani Olmo',     country: 'ESP', position: 'LW',  number: 12, overall: 83, stats: { speed: 83, passing: 82, shooting: 75, defending: 55, stamina: 80 } },
  { id: 'esp-williams',   name: 'N. Williams',   country: 'ESP', position: 'LW',  number: 17, overall: 82, stats: { speed: 92, passing: 76, shooting: 74, defending: 50, stamina: 81 } },
  { id: 'esp-morata',     name: 'Morata',        country: 'ESP', position: 'ST',  number: 7,  overall: 81, stats: { speed: 82, passing: 73, shooting: 82, defending: 48, stamina: 79 } },
]

// ---------------------------------------------------------------------------
// PORTUGAL
// ---------------------------------------------------------------------------
const PRT_PLAYERS: Player[] = [
  { id: 'prt-costa',      name: 'Costa',         country: 'PRT', position: 'GK',  number: 1,  overall: 82, stats: { speed: 54, passing: 68, shooting: 10, defending: 83, stamina: 79 } },
  { id: 'prt-patricio',   name: 'R. Patrício',   country: 'PRT', position: 'GK',  number: 22, overall: 80, stats: { speed: 53, passing: 67, shooting: 10, defending: 81, stamina: 77 } },
  { id: 'prt-pepe',       name: 'Pepe',          country: 'PRT', position: 'CB',  number: 3,  overall: 79, stats: { speed: 70, passing: 63, shooting: 32, defending: 85, stamina: 73 } },
  { id: 'prt-dias',       name: 'Rúben Dias',    country: 'PRT', position: 'CB',  number: 6,  overall: 88, stats: { speed: 77, passing: 70, shooting: 30, defending: 91, stamina: 80 } },
  { id: 'prt-cancelo',    name: 'Cancelo',       country: 'PRT', position: 'LB',  number: 5,  overall: 86, stats: { speed: 84, passing: 82, shooting: 62, defending: 81, stamina: 83 } },
  { id: 'prt-dalot',      name: 'Dalot',         country: 'PRT', position: 'RB',  number: 20, overall: 79, stats: { speed: 82, passing: 74, shooting: 56, defending: 77, stamina: 80 } },
  { id: 'prt-neves',      name: 'Rúben Neves',   country: 'PRT', position: 'CDM', number: 15, overall: 83, stats: { speed: 74, passing: 84, shooting: 70, defending: 78, stamina: 82 } },
  { id: 'prt-moutinho',   name: 'Moutinho',      country: 'PRT', position: 'CM',  number: 8,  overall: 79, stats: { speed: 71, passing: 85, shooting: 65, defending: 66, stamina: 75 } },
  { id: 'prt-palhinha',   name: 'Palhinha',      country: 'PRT', position: 'CDM', number: 16, overall: 82, stats: { speed: 73, passing: 74, shooting: 62, defending: 85, stamina: 83 } },
  { id: 'prt-bruno',      name: 'Bruno Fernandes',country: 'PRT', position: 'CAM', number: 8,  overall: 88, stats: { speed: 78, passing: 88, shooting: 82, defending: 54, stamina: 81 } },
  { id: 'prt-leao',       name: 'Leão',          country: 'PRT', position: 'LW',  number: 17, overall: 85, stats: { speed: 93, passing: 75, shooting: 80, defending: 37, stamina: 82 } },
  { id: 'prt-bernardo',   name: 'B. Silva',      country: 'PRT', position: 'RW',  number: 10, overall: 87, stats: { speed: 81, passing: 86, shooting: 77, defending: 58, stamina: 86 } },
  { id: 'prt-felix',      name: 'J. Félix',      country: 'PRT', position: 'CAM', number: 11, overall: 83, stats: { speed: 82, passing: 79, shooting: 79, defending: 43, stamina: 76 } },
  { id: 'prt-ronaldo',    name: 'Ronaldo',       country: 'PRT', position: 'ST',  number: 7,  overall: 88, stats: { speed: 83, passing: 77, shooting: 93, defending: 32, stamina: 74 } },
]

// ---------------------------------------------------------------------------
// GERMANY
// ---------------------------------------------------------------------------
const GER_PLAYERS: Player[] = [
  { id: 'ger-neuer',      name: 'Neuer',         country: 'GER', position: 'GK',  number: 1,  overall: 87, stats: { speed: 57, passing: 75, shooting: 10, defending: 88, stamina: 79 } },
  { id: 'ger-ter-stegen', name: 'ter Stegen',    country: 'GER', position: 'GK',  number: 22, overall: 88, stats: { speed: 58, passing: 76, shooting: 10, defending: 89, stamina: 80 } },
  { id: 'ger-rudiger',    name: 'Rüdiger',       country: 'GER', position: 'CB',  number: 2,  overall: 85, stats: { speed: 80, passing: 68, shooting: 35, defending: 88, stamina: 80 } },
  { id: 'ger-schlotterbeck',name: 'Schlotterbeck',country: 'GER', position: 'CB', number: 23, overall: 81, stats: { speed: 76, passing: 67, shooting: 30, defending: 84, stamina: 77 } },
  { id: 'ger-raum',       name: 'Raum',          country: 'GER', position: 'LB',  number: 19, overall: 79, stats: { speed: 83, passing: 76, shooting: 58, defending: 75, stamina: 81 } },
  { id: 'ger-kimmich',    name: 'Kimmich',       country: 'GER', position: 'CM',  number: 6,  overall: 88, stats: { speed: 77, passing: 88, shooting: 72, defending: 82, stamina: 84 } },
  { id: 'ger-goretzka',   name: 'Goretzka',      country: 'GER', position: 'CM',  number: 8,  overall: 84, stats: { speed: 79, passing: 80, shooting: 74, defending: 77, stamina: 85 } },
  { id: 'ger-kroos',      name: 'Kroos',         country: 'GER', position: 'CDM', number: 18, overall: 87, stats: { speed: 71, passing: 93, shooting: 72, defending: 74, stamina: 79 } },
  { id: 'ger-musiala',    name: 'Musiala',       country: 'GER', position: 'CAM', number: 10, overall: 87, stats: { speed: 87, passing: 85, shooting: 79, defending: 58, stamina: 82 } },
  { id: 'ger-gnabry',     name: 'Gnabry',        country: 'GER', position: 'RW',  number: 20, overall: 82, stats: { speed: 89, passing: 76, shooting: 79, defending: 48, stamina: 79 } },
  { id: 'ger-sane',       name: 'Sané',          country: 'GER', position: 'LW',  number: 11, overall: 84, stats: { speed: 92, passing: 78, shooting: 78, defending: 45, stamina: 79 } },
  { id: 'ger-wirtz',      name: 'Wirtz',         country: 'GER', position: 'LW',  number: 17, overall: 86, stats: { speed: 84, passing: 84, shooting: 78, defending: 51, stamina: 81 } },
  { id: 'ger-havertz',    name: 'Havertz',       country: 'GER', position: 'ST',  number: 7,  overall: 83, stats: { speed: 82, passing: 81, shooting: 80, defending: 55, stamina: 80 } },
  { id: 'ger-fullkrug',   name: 'Füllkrug',      country: 'GER', position: 'ST',  number: 9,  overall: 80, stats: { speed: 72, passing: 67, shooting: 85, defending: 42, stamina: 76 } },
  { id: 'ger-hofmann',    name: 'Hofmann',       country: 'GER', position: 'RB',  number: 14, overall: 78, stats: { speed: 80, passing: 73, shooting: 58, defending: 75, stamina: 80 } },
]

// ---------------------------------------------------------------------------
// NETHERLANDS
// ---------------------------------------------------------------------------
const NED_PLAYERS: Player[] = [
  { id: 'ned-flekken',    name: 'Flekken',       country: 'NED', position: 'GK',  number: 1,  overall: 79, stats: { speed: 54, passing: 67, shooting: 10, defending: 80, stamina: 77 } },
  { id: 'ned-bijlow',     name: 'Bijlow',        country: 'NED', position: 'GK',  number: 22, overall: 80, stats: { speed: 55, passing: 68, shooting: 10, defending: 81, stamina: 78 } },
  { id: 'ned-van-dijk',   name: 'Van Dijk',      country: 'NED', position: 'CB',  number: 4,  overall: 90, stats: { speed: 79, passing: 72, shooting: 58, defending: 91, stamina: 79 } },
  { id: 'ned-de-ligt',    name: 'De Ligt',       country: 'NED', position: 'CB',  number: 3,  overall: 85, stats: { speed: 77, passing: 69, shooting: 35, defending: 87, stamina: 78 } },
  { id: 'ned-blind',      name: 'Blind',         country: 'NED', position: 'LB',  number: 5,  overall: 78, stats: { speed: 74, passing: 76, shooting: 52, defending: 78, stamina: 74 } },
  { id: 'ned-dumfries',   name: 'Dumfries',      country: 'NED', position: 'RB',  number: 22, overall: 81, stats: { speed: 85, passing: 72, shooting: 58, defending: 76, stamina: 84 } },
  { id: 'ned-de-jong',    name: 'De Jong',       country: 'NED', position: 'CM',  number: 21, overall: 86, stats: { speed: 78, passing: 86, shooting: 68, defending: 76, stamina: 80 } },
  { id: 'ned-schouten',   name: 'Schouten',      country: 'NED', position: 'CDM', number: 15, overall: 78, stats: { speed: 70, passing: 79, shooting: 58, defending: 80, stamina: 79 } },
  { id: 'ned-koopmeiners',name: 'Koopmeiners',   country: 'NED', position: 'CM',  number: 8,  overall: 83, stats: { speed: 77, passing: 82, shooting: 76, defending: 71, stamina: 81 } },
  { id: 'ned-wijnaldum',  name: 'Wijnaldum',     country: 'NED', position: 'CAM', number: 7,  overall: 82, stats: { speed: 78, passing: 81, shooting: 73, defending: 67, stamina: 82 } },
  { id: 'ned-gakpo',      name: 'Gakpo',         country: 'NED', position: 'LW',  number: 11, overall: 82, stats: { speed: 86, passing: 79, shooting: 78, defending: 47, stamina: 80 } },
  { id: 'ned-malen',      name: 'Malen',         country: 'NED', position: 'RW',  number: 18, overall: 80, stats: { speed: 88, passing: 74, shooting: 76, defending: 43, stamina: 79 } },
  { id: 'ned-bergwijn',   name: 'Bergwijn',      country: 'NED', position: 'LW',  number: 23, overall: 79, stats: { speed: 87, passing: 75, shooting: 73, defending: 44, stamina: 77 } },
  { id: 'ned-depay',      name: 'Depay',         country: 'NED', position: 'ST',  number: 9,  overall: 83, stats: { speed: 84, passing: 78, shooting: 83, defending: 40, stamina: 78 } },
]

// ---------------------------------------------------------------------------
// JAPAN
// ---------------------------------------------------------------------------
const JPN_PLAYERS: Player[] = [
  { id: 'jpn-gonda',      name: 'Gonda',         country: 'JPN', position: 'GK',  number: 1,  overall: 76, stats: { speed: 54, passing: 66, shooting: 10, defending: 81, stamina: 77 } },
  { id: 'jpn-kawashima',  name: 'Kawashima',     country: 'JPN', position: 'GK',  number: 12, overall: 74, stats: { speed: 52, passing: 64, shooting: 10, defending: 79, stamina: 75 } },
  { id: 'jpn-yoshida',    name: 'Yoshida',       country: 'JPN', position: 'CB',  number: 22, overall: 79, stats: { speed: 70, passing: 66, shooting: 27, defending: 83, stamina: 74 } },
  { id: 'jpn-itakura',    name: 'Itakura',       country: 'JPN', position: 'CB',  number: 4,  overall: 78, stats: { speed: 74, passing: 67, shooting: 25, defending: 83, stamina: 77 } },
  { id: 'jpn-nagatomo',   name: 'Nagatomo',      country: 'JPN', position: 'LB',  number: 5,  overall: 76, stats: { speed: 78, passing: 72, shooting: 55, defending: 76, stamina: 77 } },
  { id: 'jpn-tomiyasu',   name: 'Tomiyasu',      country: 'JPN', position: 'RB',  number: 22, overall: 80, stats: { speed: 80, passing: 72, shooting: 52, defending: 81, stamina: 80 } },
  { id: 'jpn-endo',       name: 'Endō',          country: 'JPN', position: 'CDM', number: 8,  overall: 82, stats: { speed: 73, passing: 80, shooting: 65, defending: 82, stamina: 84 } },
  { id: 'jpn-kamada',     name: 'Kamada',        country: 'JPN', position: 'CM',  number: 16, overall: 80, stats: { speed: 79, passing: 82, shooting: 74, defending: 62, stamina: 80 } },
  { id: 'jpn-minamino',   name: 'Minamino',      country: 'JPN', position: 'CAM', number: 10, overall: 80, stats: { speed: 85, passing: 79, shooting: 80, defending: 52, stamina: 84 } },
  { id: 'jpn-doan',       name: 'Doan',          country: 'JPN', position: 'LW',  number: 18, overall: 78, stats: { speed: 82, passing: 75, shooting: 74, defending: 57, stamina: 82 } },
  { id: 'jpn-mitoma',     name: 'Mitoma',        country: 'JPN', position: 'LW',  number: 11, overall: 81, stats: { speed: 91, passing: 75, shooting: 76, defending: 47, stamina: 83 } },
  { id: 'jpn-kubo',       name: 'Kubo',          country: 'JPN', position: 'RW',  number: 20, overall: 81, stats: { speed: 83, passing: 81, shooting: 78, defending: 49, stamina: 81 } },
  { id: 'jpn-asano',      name: 'Asano',         country: 'JPN', position: 'RW',  number: 14, overall: 74, stats: { speed: 92, passing: 68, shooting: 73, defending: 48, stamina: 84 } },
  { id: 'jpn-maeda',      name: 'Maeda',         country: 'JPN', position: 'ST',  number: 15, overall: 77, stats: { speed: 87, passing: 65, shooting: 78, defending: 50, stamina: 87 } },
]

// ---------------------------------------------------------------------------
// SOUTH KOREA
// ---------------------------------------------------------------------------
const KOR_PLAYERS: Player[] = [
  { id: 'kor-kim-sg',     name: 'Kim Seung-gyu', country: 'KOR', position: 'GK',  number: 1,  overall: 76, stats: { speed: 53, passing: 65, shooting: 10, defending: 80, stamina: 76 } },
  { id: 'kor-jo-hw',      name: 'Jo Hyeon-woo',  country: 'KOR', position: 'GK',  number: 21, overall: 78, stats: { speed: 54, passing: 65, shooting: 10, defending: 82, stamina: 78 } },
  { id: 'kor-kim-mj',     name: 'Kim Min-jae',   country: 'KOR', position: 'CB',  number: 3,  overall: 87, stats: { speed: 80, passing: 68, shooting: 27, defending: 89, stamina: 79 } },
  { id: 'kor-kwon-kw',    name: 'Kwon Kyung-won',country: 'KOR', position: 'CB',  number: 20, overall: 76, stats: { speed: 72, passing: 64, shooting: 25, defending: 81, stamina: 74 } },
  { id: 'kor-kim-js',     name: 'Kim Jin-su',    country: 'KOR', position: 'LB',  number: 2,  overall: 75, stats: { speed: 78, passing: 71, shooting: 52, defending: 77, stamina: 78 } },
  { id: 'kor-kim-mh',     name: 'Kim Moon-hwan', country: 'KOR', position: 'RB',  number: 13, overall: 74, stats: { speed: 80, passing: 70, shooting: 55, defending: 75, stamina: 79 } },
  { id: 'kor-jung-wy',    name: 'Jung Woo-young', country: 'KOR', position: 'CDM', number: 6,  overall: 79, stats: { speed: 74, passing: 75, shooting: 58, defending: 82, stamina: 80 } },
  { id: 'kor-hwang-ib',   name: 'Hwang In-beom', country: 'KOR', position: 'CM',  number: 16, overall: 78, stats: { speed: 77, passing: 79, shooting: 69, defending: 71, stamina: 81 } },
  { id: 'kor-lee-js',     name: 'Lee Jae-sung',  country: 'KOR', position: 'CM',  number: 14, overall: 79, stats: { speed: 79, passing: 80, shooting: 72, defending: 68, stamina: 82 } },
  { id: 'kor-son',        name: 'Son Heung-min', country: 'KOR', position: 'LW',  number: 7,  overall: 89, stats: { speed: 94, passing: 82, shooting: 87, defending: 62, stamina: 85 } },
  { id: 'kor-hwang-hc',   name: 'Hwang Hee-chan',country: 'KOR', position: 'RW',  number: 11, overall: 80, stats: { speed: 90, passing: 72, shooting: 80, defending: 52, stamina: 83 } },
  { id: 'kor-jeong-sb',   name: 'Jeong Sang-bin',country: 'KOR', position: 'RW',  number: 19, overall: 74, stats: { speed: 85, passing: 70, shooting: 74, defending: 50, stamina: 81 } },
  { id: 'kor-cho-gs',     name: 'Cho Gue-sung',  country: 'KOR', position: 'ST',  number: 9,  overall: 77, stats: { speed: 83, passing: 63, shooting: 82, defending: 42, stamina: 82 } },
  { id: 'kor-oh-hg',      name: 'Oh Hyeon-gyu',  country: 'KOR', position: 'ST',  number: 17, overall: 74, stats: { speed: 82, passing: 65, shooting: 79, defending: 43, stamina: 80 } },
]

// ---------------------------------------------------------------------------
// MOROCCO
// ---------------------------------------------------------------------------
const MAR_PLAYERS: Player[] = [
  { id: 'mar-bono',       name: 'Bono',          country: 'MAR', position: 'GK',  number: 1,  overall: 84, stats: { speed: 56, passing: 70, shooting: 10, defending: 85, stamina: 80 } },
  { id: 'mar-munir',      name: 'Munir',         country: 'MAR', position: 'GK',  number: 16, overall: 77, stats: { speed: 53, passing: 66, shooting: 10, defending: 79, stamina: 75 } },
  { id: 'mar-aguerd',     name: 'Aguerd',        country: 'MAR', position: 'CB',  number: 6,  overall: 81, stats: { speed: 75, passing: 67, shooting: 28, defending: 84, stamina: 78 } },
  { id: 'mar-saiss',      name: 'Saïss',         country: 'MAR', position: 'CB',  number: 5,  overall: 79, stats: { speed: 72, passing: 66, shooting: 30, defending: 82, stamina: 75 } },
  { id: 'mar-hakimi',     name: 'Hakimi',        country: 'MAR', position: 'RB',  number: 2,  overall: 87, stats: { speed: 91, passing: 78, shooting: 66, defending: 79, stamina: 85 } },
  { id: 'mar-mazraoui',   name: 'Mazraoui',      country: 'MAR', position: 'LB',  number: 13, overall: 79, stats: { speed: 80, passing: 72, shooting: 55, defending: 76, stamina: 79 } },
  { id: 'mar-amrabat',    name: 'Amrabat',       country: 'MAR', position: 'CDM', number: 4,  overall: 82, stats: { speed: 77, passing: 76, shooting: 58, defending: 84, stamina: 87 } },
  { id: 'mar-onana',      name: 'Onana',         country: 'MAR', position: 'CM',  number: 8,  overall: 79, stats: { speed: 76, passing: 80, shooting: 64, defending: 72, stamina: 80 } },
  { id: 'mar-ounahi',     name: 'Ounahi',        country: 'MAR', position: 'CM',  number: 15, overall: 79, stats: { speed: 80, passing: 79, shooting: 67, defending: 67, stamina: 82 } },
  { id: 'mar-ziyech',     name: 'Ziyech',        country: 'MAR', position: 'CAM', number: 7,  overall: 82, stats: { speed: 78, passing: 83, shooting: 78, defending: 47, stamina: 75 } },
  { id: 'mar-boufal',     name: 'Boufal',        country: 'MAR', position: 'LW',  number: 19, overall: 79, stats: { speed: 85, passing: 77, shooting: 73, defending: 46, stamina: 78 } },
  { id: 'mar-ez-abde',    name: 'Ez Abde',       country: 'MAR', position: 'RW',  number: 17, overall: 77, stats: { speed: 87, passing: 72, shooting: 70, defending: 47, stamina: 80 } },
  { id: 'mar-en-nesyri',  name: 'En-Nesyri',     country: 'MAR', position: 'ST',  number: 19, overall: 81, stats: { speed: 81, passing: 64, shooting: 84, defending: 42, stamina: 80 } },
  { id: 'mar-sabiri',     name: 'Sabiri',        country: 'MAR', position: 'CAM', number: 14, overall: 77, stats: { speed: 77, passing: 77, shooting: 71, defending: 57, stamina: 78 } },
]

// ---------------------------------------------------------------------------
// USA
// ---------------------------------------------------------------------------
const USA_PLAYERS: Player[] = [
  { id: 'usa-turner',     name: 'Turner',        country: 'USA', position: 'GK',  number: 1,  overall: 79, stats: { speed: 55, passing: 67, shooting: 10, defending: 80, stamina: 77 } },
  { id: 'usa-steffen',    name: 'Steffen',       country: 'USA', position: 'GK',  number: 12, overall: 77, stats: { speed: 54, passing: 66, shooting: 10, defending: 78, stamina: 76 } },
  { id: 'usa-zimmermann', name: 'Zimmermann',    country: 'USA', position: 'CB',  number: 5,  overall: 78, stats: { speed: 74, passing: 65, shooting: 27, defending: 82, stamina: 76 } },
  { id: 'usa-ream',       name: 'Ream',          country: 'USA', position: 'CB',  number: 6,  overall: 76, stats: { speed: 70, passing: 65, shooting: 25, defending: 80, stamina: 73 } },
  { id: 'usa-robinson',   name: 'A. Robinson',   country: 'USA', position: 'LB',  number: 18, overall: 79, stats: { speed: 82, passing: 73, shooting: 56, defending: 77, stamina: 80 } },
  { id: 'usa-dest',       name: 'Dest',          country: 'USA', position: 'RB',  number: 2,  overall: 79, stats: { speed: 84, passing: 72, shooting: 57, defending: 74, stamina: 80 } },
  { id: 'usa-musah',      name: 'Musah',         country: 'USA', position: 'CM',  number: 8,  overall: 80, stats: { speed: 82, passing: 78, shooting: 67, defending: 71, stamina: 83 } },
  { id: 'usa-adams',      name: 'T. Adams',      country: 'USA', position: 'CDM', number: 4,  overall: 81, stats: { speed: 77, passing: 77, shooting: 60, defending: 82, stamina: 84 } },
  { id: 'usa-mckennie',   name: 'McKennie',      country: 'USA', position: 'CM',  number: 14, overall: 79, stats: { speed: 78, passing: 76, shooting: 68, defending: 72, stamina: 83 } },
  { id: 'usa-reyna',      name: 'G. Reyna',      country: 'USA', position: 'CAM', number: 7,  overall: 80, stats: { speed: 81, passing: 82, shooting: 73, defending: 52, stamina: 77 } },
  { id: 'usa-pulisic',    name: 'Pulisic',       country: 'USA', position: 'LW',  number: 10, overall: 83, stats: { speed: 84, passing: 79, shooting: 77, defending: 54, stamina: 81 } },
  { id: 'usa-weah',       name: 'T. Weah',       country: 'USA', position: 'RW',  number: 21, overall: 77, stats: { speed: 88, passing: 71, shooting: 72, defending: 47, stamina: 79 } },
  { id: 'usa-ferreira',   name: 'Ferreira',      country: 'USA', position: 'ST',  number: 9,  overall: 75, stats: { speed: 79, passing: 65, shooting: 77, defending: 40, stamina: 78 } },
  { id: 'usa-morris',     name: 'Morris',        country: 'USA', position: 'RW',  number: 11, overall: 74, stats: { speed: 85, passing: 69, shooting: 70, defending: 50, stamina: 80 } },
]

// ---------------------------------------------------------------------------
// MEXICO
// ---------------------------------------------------------------------------
const MEX_PLAYERS: Player[] = [
  { id: 'mex-ochoa',      name: 'Ochoa',         country: 'MEX', position: 'GK',  number: 13, overall: 82, stats: { speed: 54, passing: 67, shooting: 10, defending: 84, stamina: 77 } },
  { id: 'mex-corona-g',   name: 'G. Corona',     country: 'MEX', position: 'GK',  number: 1,  overall: 78, stats: { speed: 53, passing: 65, shooting: 10, defending: 80, stamina: 75 } },
  { id: 'mex-montes',     name: 'Montes',        country: 'MEX', position: 'CB',  number: 3,  overall: 79, stats: { speed: 75, passing: 65, shooting: 27, defending: 83, stamina: 77 } },
  { id: 'mex-moreno',     name: 'H. Moreno',     country: 'MEX', position: 'CB',  number: 15, overall: 77, stats: { speed: 73, passing: 63, shooting: 25, defending: 81, stamina: 74 } },
  { id: 'mex-gallardo',   name: 'Gallardo',      country: 'MEX', position: 'LB',  number: 23, overall: 77, stats: { speed: 80, passing: 72, shooting: 52, defending: 75, stamina: 78 } },
  { id: 'mex-sanchez-a',  name: 'A. Sánchez',    country: 'MEX', position: 'RB',  number: 19, overall: 78, stats: { speed: 79, passing: 72, shooting: 55, defending: 77, stamina: 79 } },
  { id: 'mex-herrera',    name: 'H. Herrera',    country: 'MEX', position: 'CDM', number: 16, overall: 80, stats: { speed: 75, passing: 79, shooting: 61, defending: 78, stamina: 81 } },
  { id: 'mex-guardado',   name: 'Guardado',      country: 'MEX', position: 'CM',  number: 18, overall: 78, stats: { speed: 72, passing: 82, shooting: 62, defending: 68, stamina: 75 } },
  { id: 'mex-chavez',     name: 'Chávez',        country: 'MEX', position: 'CM',  number: 5,  overall: 76, stats: { speed: 76, passing: 76, shooting: 60, defending: 70, stamina: 78 } },
  { id: 'mex-corona-j',   name: 'J. Corona',     country: 'MEX', position: 'RW',  number: 20, overall: 80, stats: { speed: 86, passing: 77, shooting: 73, defending: 50, stamina: 79 } },
  { id: 'mex-lozano',     name: 'H. Lozano',     country: 'MEX', position: 'RW',  number: 22, overall: 82, stats: { speed: 91, passing: 74, shooting: 77, defending: 50, stamina: 80 } },
  { id: 'mex-vega',       name: 'A. Vega',       country: 'MEX', position: 'LW',  number: 11, overall: 77, stats: { speed: 85, passing: 73, shooting: 72, defending: 47, stamina: 78 } },
  { id: 'mex-jimenez',    name: 'R. Jiménez',    country: 'MEX', position: 'ST',  number: 9,  overall: 81, stats: { speed: 79, passing: 70, shooting: 83, defending: 43, stamina: 77 } },
  { id: 'mex-martin',     name: 'J. Martín',     country: 'MEX', position: 'CAM', number: 10, overall: 79, stats: { speed: 78, passing: 80, shooting: 71, defending: 55, stamina: 77 } },
]

// ---------------------------------------------------------------------------
// CROATIA
// ---------------------------------------------------------------------------
const CRO_PLAYERS: Player[] = [
  { id: 'cro-livakovic',  name: 'Livaković',     country: 'CRO', position: 'GK',  number: 1,  overall: 83, stats: { speed: 55, passing: 68, shooting: 10, defending: 85, stamina: 79 } },
  { id: 'cro-grbic',      name: 'Grbić',         country: 'CRO', position: 'GK',  number: 23, overall: 78, stats: { speed: 53, passing: 65, shooting: 10, defending: 80, stamina: 76 } },
  { id: 'cro-lovren',     name: 'Lovren',        country: 'CRO', position: 'CB',  number: 6,  overall: 78, stats: { speed: 73, passing: 64, shooting: 28, defending: 82, stamina: 74 } },
  { id: 'cro-gvardiol',   name: 'Gvardiol',      country: 'CRO', position: 'CB',  number: 4,  overall: 86, stats: { speed: 83, passing: 71, shooting: 35, defending: 88, stamina: 82 } },
  { id: 'cro-sosa',       name: 'Sosa',          country: 'CRO', position: 'LB',  number: 21, overall: 77, stats: { speed: 80, passing: 73, shooting: 55, defending: 74, stamina: 78 } },
  { id: 'cro-juranovic',  name: 'Juranović',     country: 'CRO', position: 'RB',  number: 2,  overall: 78, stats: { speed: 79, passing: 72, shooting: 55, defending: 76, stamina: 79 } },
  { id: 'cro-modric',     name: 'Modrić',        country: 'CRO', position: 'CM',  number: 10, overall: 90, stats: { speed: 77, passing: 91, shooting: 74, defending: 72, stamina: 81 } },
  { id: 'cro-brozovic',   name: 'Brozović',      country: 'CRO', position: 'CDM', number: 11, overall: 85, stats: { speed: 76, passing: 86, shooting: 66, defending: 80, stamina: 82 } },
  { id: 'cro-kovacic',    name: 'Kovačić',       country: 'CRO', position: 'CM',  number: 8,  overall: 84, stats: { speed: 80, passing: 84, shooting: 68, defending: 72, stamina: 84 } },
  { id: 'cro-perisic',    name: 'Perišić',       country: 'CRO', position: 'LW',  number: 4,  overall: 83, stats: { speed: 83, passing: 79, shooting: 78, defending: 60, stamina: 81 } },
  { id: 'cro-kramaric',   name: 'Kramarić',      country: 'CRO', position: 'CAM', number: 9,  overall: 82, stats: { speed: 79, passing: 78, shooting: 83, defending: 47, stamina: 78 } },
  { id: 'cro-pasalic',    name: 'Pašalić',       country: 'CRO', position: 'CAM', number: 15, overall: 79, stats: { speed: 76, passing: 78, shooting: 74, defending: 56, stamina: 78 } },
  { id: 'cro-rebic',      name: 'Rebić',         country: 'CRO', position: 'LW',  number: 18, overall: 78, stats: { speed: 82, passing: 71, shooting: 77, defending: 51, stamina: 76 } },
  { id: 'cro-vlasic',     name: 'Vlašić',        country: 'CRO', position: 'RW',  number: 13, overall: 79, stats: { speed: 81, passing: 78, shooting: 76, defending: 52, stamina: 77 } },
]

// ---------------------------------------------------------------------------
// ITALY
// ---------------------------------------------------------------------------
const ITA_PLAYERS: Player[] = [
  { id: 'ita-donnarumma', name: 'Donnarumma',    country: 'ITA', position: 'GK',  number: 1,  overall: 89, stats: { speed: 57, passing: 72, shooting: 10, defending: 90, stamina: 81 } },
  { id: 'ita-meret',      name: 'Meret',         country: 'ITA', position: 'GK',  number: 16, overall: 80, stats: { speed: 54, passing: 68, shooting: 10, defending: 81, stamina: 78 } },
  { id: 'ita-bonucci',    name: 'Bonucci',       country: 'ITA', position: 'CB',  number: 19, overall: 80, stats: { speed: 70, passing: 72, shooting: 32, defending: 84, stamina: 73 } },
  { id: 'ita-bastoni',    name: 'Bastoni',       country: 'ITA', position: 'CB',  number: 23, overall: 85, stats: { speed: 78, passing: 77, shooting: 35, defending: 87, stamina: 79 } },
  { id: 'ita-spinazzola', name: 'Spinazzola',    country: 'ITA', position: 'LB',  number: 4,  overall: 81, stats: { speed: 88, passing: 74, shooting: 58, defending: 75, stamina: 79 } },
  { id: 'ita-di-lorenzo', name: 'Di Lorenzo',    country: 'ITA', position: 'RB',  number: 2,  overall: 82, stats: { speed: 81, passing: 74, shooting: 57, defending: 81, stamina: 82 } },
  { id: 'ita-barella',    name: 'Barella',       country: 'ITA', position: 'CM',  number: 18, overall: 86, stats: { speed: 82, passing: 83, shooting: 72, defending: 76, stamina: 86 } },
  { id: 'ita-jorginho',   name: 'Jorginho',      country: 'ITA', position: 'CDM', number: 8,  overall: 82, stats: { speed: 68, passing: 87, shooting: 63, defending: 77, stamina: 78 } },
  { id: 'ita-verratti',   name: 'Verratti',      country: 'ITA', position: 'CM',  number: 6,  overall: 86, stats: { speed: 75, passing: 89, shooting: 65, defending: 74, stamina: 80 } },
  { id: 'ita-chiesa',     name: 'Chiesa',        country: 'ITA', position: 'RW',  number: 14, overall: 83, stats: { speed: 91, passing: 76, shooting: 79, defending: 52, stamina: 80 } },
  { id: 'ita-insigne',    name: 'Insigne',       country: 'ITA', position: 'LW',  number: 10, overall: 83, stats: { speed: 83, passing: 83, shooting: 80, defending: 48, stamina: 77 } },
  { id: 'ita-raspadori',  name: 'Raspadori',     country: 'ITA', position: 'CAM', number: 11, overall: 80, stats: { speed: 79, passing: 78, shooting: 79, defending: 45, stamina: 78 } },
  { id: 'ita-immobile',   name: 'Immobile',      country: 'ITA', position: 'ST',  number: 17, overall: 84, stats: { speed: 79, passing: 67, shooting: 88, defending: 35, stamina: 77 } },
  { id: 'ita-pellegrini', name: 'Pellegrini',    country: 'ITA', position: 'CAM', number: 7,  overall: 82, stats: { speed: 78, passing: 82, shooting: 75, defending: 60, stamina: 80 } },
]

// ---------------------------------------------------------------------------
// SENEGAL
// ---------------------------------------------------------------------------
const SEN_PLAYERS: Player[] = [
  { id: 'sen-mendy',      name: 'E. Mendy',      country: 'SEN', position: 'GK',  number: 16, overall: 85, stats: { speed: 57, passing: 70, shooting: 10, defending: 87, stamina: 80 } },
  { id: 'sen-gomis',      name: 'Gomis',         country: 'SEN', position: 'GK',  number: 1,  overall: 77, stats: { speed: 53, passing: 65, shooting: 10, defending: 79, stamina: 75 } },
  { id: 'sen-koulibaly',  name: 'Koulibaly',     country: 'SEN', position: 'CB',  number: 3,  overall: 86, stats: { speed: 80, passing: 68, shooting: 30, defending: 89, stamina: 78 } },
  { id: 'sen-diallo',     name: 'A. Diallo',     country: 'SEN', position: 'CB',  number: 5,  overall: 79, stats: { speed: 77, passing: 66, shooting: 27, defending: 83, stamina: 77 } },
  { id: 'sen-mendy-b',    name: 'B. Mendy',      country: 'SEN', position: 'LB',  number: 22, overall: 76, stats: { speed: 79, passing: 71, shooting: 50, defending: 76, stamina: 78 } },
  { id: 'sen-sabaly',     name: 'Sabaly',        country: 'SEN', position: 'RB',  number: 2,  overall: 77, stats: { speed: 81, passing: 71, shooting: 52, defending: 76, stamina: 79 } },
  { id: 'sen-gueye',      name: 'I. Gueye',      country: 'SEN', position: 'CDM', number: 17, overall: 82, stats: { speed: 79, passing: 76, shooting: 57, defending: 83, stamina: 86 } },
  { id: 'sen-kouyate',    name: 'Kouyaté',       country: 'SEN', position: 'CM',  number: 8,  overall: 79, stats: { speed: 78, passing: 75, shooting: 60, defending: 77, stamina: 82 } },
  { id: 'sen-ciss',       name: 'P. Ciss',       country: 'SEN', position: 'CM',  number: 14, overall: 77, stats: { speed: 75, passing: 76, shooting: 58, defending: 73, stamina: 80 } },
  { id: 'sen-mane',       name: 'Mané',          country: 'SEN', position: 'LW',  number: 10, overall: 90, stats: { speed: 93, passing: 80, shooting: 87, defending: 55, stamina: 83 } },
  { id: 'sen-sarr',       name: 'I. Sarr',       country: 'SEN', position: 'RW',  number: 7,  overall: 82, stats: { speed: 90, passing: 74, shooting: 78, defending: 46, stamina: 81 } },
  { id: 'sen-diatta',     name: 'L. Diatta',     country: 'SEN', position: 'RW',  number: 19, overall: 78, stats: { speed: 86, passing: 72, shooting: 72, defending: 47, stamina: 79 } },
  { id: 'sen-dia',        name: 'B. Dia',        country: 'SEN', position: 'ST',  number: 9,  overall: 82, stats: { speed: 85, passing: 72, shooting: 83, defending: 41, stamina: 81 } },
  { id: 'sen-jackson',    name: 'N. Jackson',    country: 'SEN', position: 'ST',  number: 11, overall: 79, stats: { speed: 84, passing: 68, shooting: 80, defending: 38, stamina: 80 } },
]

// ---------------------------------------------------------------------------
// Master export
// ---------------------------------------------------------------------------
export const PLAYERS: Record<string, Player[]> = {
  ARG: ARG_PLAYERS,
  FRA: FRA_PLAYERS,
  BRA: BRA_PLAYERS,
  ENG: ENG_PLAYERS,
  ESP: ESP_PLAYERS,
  PRT: PRT_PLAYERS,
  GER: GER_PLAYERS,
  NED: NED_PLAYERS,
  JPN: JPN_PLAYERS,
  KOR: KOR_PLAYERS,
  MAR: MAR_PLAYERS,
  USA: USA_PLAYERS,
  MEX: MEX_PLAYERS,
  CRO: CRO_PLAYERS,
  ITA: ITA_PLAYERS,
  SEN: SEN_PLAYERS,
}

export function getPlayersByCountry(country: string): Player[] {
  return PLAYERS[country] || []
}

export function getStartingEleven(country: string): Player[] {
  const players = PLAYERS[country] || []

  const gk = players
    .filter(p => p.position === 'GK')
    .sort((a, b) => b.overall - a.overall)[0]

  const defs = players
    .filter(p => ['CB', 'LB', 'RB'].includes(p.position))
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 4)

  const mids = players
    .filter(p => ['CDM', 'CM', 'CAM'].includes(p.position))
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 3)

  const fwds = players
    .filter(p => ['LW', 'RW', 'ST'].includes(p.position))
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 3)

  return [gk, ...defs, ...mids, ...fwds].filter(Boolean)
}
