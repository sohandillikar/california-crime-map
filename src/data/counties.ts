export interface County {
  name: string;
  slug: string;
  felonies_per_1k_pop: number;
  misdeamors_per_1k_pop: number;
  year: number;
  population: number;
}

export const counties: County[] = [
  { name: "Alameda County", slug: "alameda", felonies_per_1k_pop: 5.585606345, misdeamors_per_1k_pop: 9.526033013, year: 2024, population: 1649060 },
  { name: "Alpine County", slug: "alpine", felonies_per_1k_pop: 4.549590537, misdeamors_per_1k_pop: 15.46860783, year: 2024, population: 1099 },
  { name: "Amador County", slug: "amador", felonies_per_1k_pop: 6.591157855, misdeamors_per_1k_pop: 13.65821158, year: 2024, population: 42026 },
  { name: "Butte County", slug: "butte", felonies_per_1k_pop: 8.707172137, misdeamors_per_1k_pop: 28.53590869, year: 2024, population: 208334 },
  { name: "Calaveras County", slug: "calaveras", felonies_per_1k_pop: 6.429416192, misdeamors_per_1k_pop: 15.33168477, year: 2024, population: 46505 },
  { name: "Colusa County", slug: "colusa", felonies_per_1k_pop: 4.439612213, misdeamors_per_1k_pop: 15.44803842, year: 2024, population: 22074 },
  { name: "Contra Costa County", slug: "contra-costa", felonies_per_1k_pop: 4.86352205, misdeamors_per_1k_pop: 9.829380176, year: 2024, population: 1172607 },
  { name: "Del Norte County", slug: "del-norte", felonies_per_1k_pop: 9.774519605, misdeamors_per_1k_pop: 34.17379392, year: 2024, population: 27009 },
  { name: "El Dorado County", slug: "el-dorado", felonies_per_1k_pop: 5.839552336, misdeamors_per_1k_pop: 15.43384347, year: 2024, population: 192823 },
  { name: "Fresno County", slug: "fresno", felonies_per_1k_pop: 10.58464543, misdeamors_per_1k_pop: 17.17270841, year: 2024, population: 1024125 },
  { name: "Glenn County", slug: "glenn", felonies_per_1k_pop: 4.098360656, misdeamors_per_1k_pop: 16.95873375, year: 2024, population: 28304 },
  { name: "Humboldt County", slug: "humboldt", felonies_per_1k_pop: 8.913733192, misdeamors_per_1k_pop: 31.10741804, year: 2024, population: 132380 },
  { name: "Imperial County", slug: "imperial", felonies_per_1k_pop: 3.626378464, misdeamors_per_1k_pop: 12.22183091, year: 2024, population: 181724 },
  { name: "Inyo County", slug: "inyo", felonies_per_1k_pop: 9.034352177, misdeamors_per_1k_pop: 17.31133351, year: 2024, population: 18485 },
  { name: "Kern County", slug: "kern", felonies_per_1k_pop: 10.08206788, misdeamors_per_1k_pop: 19.15820532, year: 2024, population: 922529 },
  { name: "Kings County", slug: "kings", felonies_per_1k_pop: 7.578447257, misdeamors_per_1k_pop: 22.09627339, year: 2024, population: 154913 },
  { name: "Lake County", slug: "lake", felonies_per_1k_pop: 12.58780473, misdeamors_per_1k_pop: 31.21126262, year: 2024, population: 67764 },
  { name: "Lassen County", slug: "lassen", felonies_per_1k_pop: 5.645730416, misdeamors_per_1k_pop: 18.52505293, year: 2024, population: 28340 },
  { name: "Los Angeles County", slug: "los-angeles", felonies_per_1k_pop: 6.280298845, misdeamors_per_1k_pop: 10.16164611, year: 2024, population: 9757179 },
  { name: "Madera County", slug: "madera", felonies_per_1k_pop: 7.731273272, misdeamors_per_1k_pop: 19.56695198, year: 2024, population: 165432 },
  { name: "Marin County", slug: "marin", felonies_per_1k_pop: 4.641185647, misdeamors_per_1k_pop: 13.06942278, year: 2024, population: 256400 },
  { name: "Mariposa County", slug: "mariposa", felonies_per_1k_pop: 6.511027687, misdeamors_per_1k_pop: 15.54434538, year: 2024, population: 17048 },
  { name: "Mendocino County", slug: "mendocino", felonies_per_1k_pop: 8.141295206, misdeamors_per_1k_pop: 23.43706196, year: 2024, population: 89175 },
  { name: "Merced County", slug: "merced", felonies_per_1k_pop: 8.053266122, misdeamors_per_1k_pop: 15.38881438, year: 2024, population: 296774 },
  { name: "Modoc County", slug: "modoc", felonies_per_1k_pop: 13.19043693, misdeamors_per_1k_pop: 25.90978683, year: 2024, population: 8491 },
  { name: "Mono County", slug: "mono", felonies_per_1k_pop: 7.081825879, misdeamors_per_1k_pop: 16.2420137, year: 2024, population: 12991 },
  { name: "Monterey County", slug: "monterey", felonies_per_1k_pop: 4.497410894, misdeamors_per_1k_pop: 11.65154922, year: 2024, population: 436251 },
  { name: "Napa County", slug: "napa", felonies_per_1k_pop: 4.354803469, misdeamors_per_1k_pop: 14.10413857, year: 2024, population: 132727 },
  { name: "Nevada County", slug: "nevada", felonies_per_1k_pop: 5.039385489, misdeamors_per_1k_pop: 14.65825138, year: 2024, population: 102195 },
  { name: "Orange County", slug: "orange", felonies_per_1k_pop: 5.236189987, misdeamors_per_1k_pop: 18.22242058, year: 2024, population: 3170435 },
  { name: "Placer County", slug: "placer", felonies_per_1k_pop: 6.700904979, misdeamors_per_1k_pop: 12.56506125, year: 2024, population: 433822 },
  { name: "Plumas County", slug: "plumas", felonies_per_1k_pop: 0.902622916, misdeamors_per_1k_pop: 6.690028672, year: 2024, population: 18834 },
  { name: "Riverside County", slug: "riverside", felonies_per_1k_pop: 5.661414749, misdeamors_per_1k_pop: 11.53864549, year: 2024, population: 2529933 },
  { name: "Sacramento County", slug: "sacramento", felonies_per_1k_pop: 7.087748436, misdeamors_per_1k_pop: 13.55175018, year: 2024, population: 1611231 },
  { name: "San Benito County", slug: "san-benito", felonies_per_1k_pop: 4.771613239, misdeamors_per_1k_pop: 16.67172747, year: 2024, population: 69159 },
  { name: "San Bernardino County", slug: "san-bernardino", felonies_per_1k_pop: 9.851504845, misdeamors_per_1k_pop: 16.08377618, year: 2024, population: 2214281 },
  { name: "San Diego County", slug: "san-diego", felonies_per_1k_pop: 5.845460727, misdeamors_per_1k_pop: 12.17958415, year: 2024, population: 3298799 },
  { name: "San Francisco County", slug: "san-francisco", felonies_per_1k_pop: 7.03180323, misdeamors_per_1k_pop: 9.059534081, year: 2024, population: 827526 },
  { name: "San Joaquin County", slug: "san-joaquin", felonies_per_1k_pop: 7.204928759, misdeamors_per_1k_pop: 9.987648694, year: 2024, population: 816108 },
  { name: "San Luis Obispo County", slug: "san-luis-obispo", felonies_per_1k_pop: 4.864410328, misdeamors_per_1k_pop: 22.43447593, year: 2024, population: 281843 },
  { name: "San Mateo County", slug: "san-mateo", felonies_per_1k_pop: 4.691119717, misdeamors_per_1k_pop: 15.191959, year: 2024, population: 742893 },
  { name: "Santa Barbara County", slug: "santa-barbara", felonies_per_1k_pop: 7.149606299, misdeamors_per_1k_pop: 23.43982002, year: 2024, population: 444500 },
  { name: "Santa Clara County", slug: "santa-clara", felonies_per_1k_pop: 5.750327697, misdeamors_per_1k_pop: 10.59530453, year: 2024, population: 1926325 },
  { name: "Santa Cruz County", slug: "santa-cruz", felonies_per_1k_pop: 5.933553349, misdeamors_per_1k_pop: 24.43922776, year: 2024, population: 262406 },
  { name: "Shasta County", slug: "shasta", felonies_per_1k_pop: 9.02711447, misdeamors_per_1k_pop: 52.54498374, year: 2024, population: 181121 },
  { name: "Sierra County", slug: "sierra", felonies_per_1k_pop: 5.139736588, misdeamors_per_1k_pop: 13.81304208, year: 2024, population: 3113 },
  { name: "Siskiyou County", slug: "siskiyou", felonies_per_1k_pop: 8.541578427, misdeamors_per_1k_pop: 32.11915855, year: 2024, population: 42498 },
  { name: "Solano County", slug: "solano", felonies_per_1k_pop: 6.761136539, misdeamors_per_1k_pop: 13.80572664, year: 2024, population: 455101 },
  { name: "Sonoma County", slug: "sonoma", felonies_per_1k_pop: 7.114087046, misdeamors_per_1k_pop: 20.55936132, year: 2024, population: 485375 },
  { name: "Stanislaus County", slug: "stanislaus", felonies_per_1k_pop: 10.51937979, misdeamors_per_1k_pop: 21.7623148, year: 2024, population: 556972 },
  { name: "Sutter County", slug: "sutter", felonies_per_1k_pop: 9.254655234, misdeamors_per_1k_pop: 31.51859557, year: 2024, population: 98545 },
  { name: "Tehama County", slug: "tehama", felonies_per_1k_pop: 8.254332749, misdeamors_per_1k_pop: 22.10981986, year: 2024, population: 64451 },
  { name: "Trinity County", slug: "trinity", felonies_per_1k_pop: 6.520905255, misdeamors_per_1k_pop: 17.58087201, year: 2024, population: 15642 },
  { name: "Tulare County", slug: "tulare", felonies_per_1k_pop: 9.246276466, misdeamors_per_1k_pop: 21.96895435, year: 2024, population: 483546 },
  { name: "Tuolumne County", slug: "tuolumne", felonies_per_1k_pop: 9.722969588, misdeamors_per_1k_pop: 25.66195981, year: 2024, population: 53893 },
  { name: "Ventura County", slug: "ventura", felonies_per_1k_pop: 6.81328231, misdeamors_per_1k_pop: 19.17462567, year: 2024, population: 835427 },
  { name: "Yolo County", slug: "yolo", felonies_per_1k_pop: 6.122059392, misdeamors_per_1k_pop: 14.88561649, year: 2024, population: 225251 },
  { name: "Yuba County", slug: "yuba", felonies_per_1k_pop: 9.637700214, misdeamors_per_1k_pop: 28.5243915, year: 2024, population: 87469 },
];

export const getCountyByName = (name: string): County | undefined => {
  return counties.find(county => county.name.toLowerCase() === name.toLowerCase());
};

export const slugToCounty = (slug: string): County | undefined => {
  return counties.find(county => county.slug === slug);
};

