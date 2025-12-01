export interface County {
  name: string;
  felonies_per_1k_pop: number;
  misdeamors_per_1k_pop: number;
  year: number;
}

export const counties: County[] = [
  { name: "Alameda County", felonies_per_1k_pop: 5.585606345, misdeamors_per_1k_pop: 9.526033013, year: 2024 },
  { name: "Alpine County", felonies_per_1k_pop: 4.549590537, misdeamors_per_1k_pop: 15.46860783, year: 2024 },
  { name: "Amador County", felonies_per_1k_pop: 6.591157855, misdeamors_per_1k_pop: 13.65821158, year: 2024 },
  { name: "Butte County", felonies_per_1k_pop: 8.707172137, misdeamors_per_1k_pop: 28.53590869, year: 2024 },
  { name: "Calaveras County", felonies_per_1k_pop: 6.429416192, misdeamors_per_1k_pop: 15.33168477, year: 2024 },
  { name: "Colusa County", felonies_per_1k_pop: 4.439612213, misdeamors_per_1k_pop: 15.44803842, year: 2024 },
  { name: "Contra Costa County", felonies_per_1k_pop: 4.86352205, misdeamors_per_1k_pop: 9.829380176, year: 2024 },
  { name: "Del Norte County", felonies_per_1k_pop: 9.774519605, misdeamors_per_1k_pop: 34.17379392, year: 2024 },
  { name: "El Dorado County", felonies_per_1k_pop: 5.839552336, misdeamors_per_1k_pop: 15.43384347, year: 2024 },
  { name: "Fresno County", felonies_per_1k_pop: 10.58464543, misdeamors_per_1k_pop: 17.17270841, year: 2024 },
  { name: "Glenn County", felonies_per_1k_pop: 4.098360656, misdeamors_per_1k_pop: 16.95873375, year: 2024 },
  { name: "Humboldt County", felonies_per_1k_pop: 8.913733192, misdeamors_per_1k_pop: 31.10741804, year: 2024 },
  { name: "Imperial County", felonies_per_1k_pop: 3.626378464, misdeamors_per_1k_pop: 12.22183091, year: 2024 },
  { name: "Inyo County", felonies_per_1k_pop: 9.034352177, misdeamors_per_1k_pop: 17.31133351, year: 2024 },
  { name: "Kern County", felonies_per_1k_pop: 10.08206788, misdeamors_per_1k_pop: 19.15820532, year: 2024 },
  { name: "Kings County", felonies_per_1k_pop: 7.578447257, misdeamors_per_1k_pop: 22.09627339, year: 2024 },
  { name: "Lake County", felonies_per_1k_pop: 12.58780473, misdeamors_per_1k_pop: 31.21126262, year: 2024 },
  { name: "Lassen County", felonies_per_1k_pop: 5.645730416, misdeamors_per_1k_pop: 18.52505293, year: 2024 },
  { name: "Los Angeles County", felonies_per_1k_pop: 6.280298845, misdeamors_per_1k_pop: 10.16164611, year: 2024 },
  { name: "Madera County", felonies_per_1k_pop: 7.731273272, misdeamors_per_1k_pop: 19.56695198, year: 2024 },
  { name: "Marin County", felonies_per_1k_pop: 4.641185647, misdeamors_per_1k_pop: 13.06942278, year: 2024 },
  { name: "Mariposa County", felonies_per_1k_pop: 6.511027687, misdeamors_per_1k_pop: 15.54434538, year: 2024 },
  { name: "Mendocino County", felonies_per_1k_pop: 8.141295206, misdeamors_per_1k_pop: 23.43706196, year: 2024 },
  { name: "Merced County", felonies_per_1k_pop: 8.053266122, misdeamors_per_1k_pop: 15.38881438, year: 2024 },
  { name: "Modoc County", felonies_per_1k_pop: 13.19043693, misdeamors_per_1k_pop: 25.90978683, year: 2024 },
  { name: "Mono County", felonies_per_1k_pop: 7.081825879, misdeamors_per_1k_pop: 16.2420137, year: 2024 },
  { name: "Monterey County", felonies_per_1k_pop: 4.497410894, misdeamors_per_1k_pop: 11.65154922, year: 2024 },
  { name: "Napa County", felonies_per_1k_pop: 4.354803469, misdeamors_per_1k_pop: 14.10413857, year: 2024 },
  { name: "Nevada County", felonies_per_1k_pop: 5.039385489, misdeamors_per_1k_pop: 14.65825138, year: 2024 },
  { name: "Orange County", felonies_per_1k_pop: 5.236189987, misdeamors_per_1k_pop: 18.22242058, year: 2024 },
  { name: "Placer County", felonies_per_1k_pop: 6.700904979, misdeamors_per_1k_pop: 12.56506125, year: 2024 },
  { name: "Plumas County", felonies_per_1k_pop: 0.902622916, misdeamors_per_1k_pop: 6.690028672, year: 2024 },
  { name: "Riverside County", felonies_per_1k_pop: 5.661414749, misdeamors_per_1k_pop: 11.53864549, year: 2024 },
  { name: "Sacramento County", felonies_per_1k_pop: 7.087748436, misdeamors_per_1k_pop: 13.55175018, year: 2024 },
  { name: "San Benito County", felonies_per_1k_pop: 4.771613239, misdeamors_per_1k_pop: 16.67172747, year: 2024 },
  { name: "San Bernardino County", felonies_per_1k_pop: 9.851504845, misdeamors_per_1k_pop: 16.08377618, year: 2024 },
  { name: "San Diego County", felonies_per_1k_pop: 5.845460727, misdeamors_per_1k_pop: 12.17958415, year: 2024 },
  { name: "San Francisco County", felonies_per_1k_pop: 7.03180323, misdeamors_per_1k_pop: 9.059534081, year: 2024 },
  { name: "San Joaquin County", felonies_per_1k_pop: 7.204928759, misdeamors_per_1k_pop: 9.987648694, year: 2024 },
  { name: "San Luis Obispo County", felonies_per_1k_pop: 4.864410328, misdeamors_per_1k_pop: 22.43447593, year: 2024 },
  { name: "San Mateo County", felonies_per_1k_pop: 4.691119717, misdeamors_per_1k_pop: 15.191959, year: 2024 },
  { name: "Santa Barbara County", felonies_per_1k_pop: 7.149606299, misdeamors_per_1k_pop: 23.43982002, year: 2024 },
  { name: "Santa Clara County", felonies_per_1k_pop: 5.750327697, misdeamors_per_1k_pop: 10.59530453, year: 2024 },
  { name: "Santa Cruz County", felonies_per_1k_pop: 5.933553349, misdeamors_per_1k_pop: 24.43922776, year: 2024 },
  { name: "Shasta County", felonies_per_1k_pop: 9.02711447, misdeamors_per_1k_pop: 52.54498374, year: 2024 },
  { name: "Sierra County", felonies_per_1k_pop: 5.139736588, misdeamors_per_1k_pop: 13.81304208, year: 2024 },
  { name: "Siskiyou County", felonies_per_1k_pop: 8.541578427, misdeamors_per_1k_pop: 32.11915855, year: 2024 },
  { name: "Solano County", felonies_per_1k_pop: 6.761136539, misdeamors_per_1k_pop: 13.80572664, year: 2024 },
  { name: "Sonoma County", felonies_per_1k_pop: 7.114087046, misdeamors_per_1k_pop: 20.55936132, year: 2024 },
  { name: "Stanislaus County", felonies_per_1k_pop: 10.51937979, misdeamors_per_1k_pop: 21.7623148, year: 2024 },
  { name: "Sutter County", felonies_per_1k_pop: 9.254655234, misdeamors_per_1k_pop: 31.51859557, year: 2024 },
  { name: "Tehama County", felonies_per_1k_pop: 8.254332749, misdeamors_per_1k_pop: 22.10981986, year: 2024 },
  { name: "Trinity County", felonies_per_1k_pop: 6.520905255, misdeamors_per_1k_pop: 17.58087201, year: 2024 },
  { name: "Tulare County", felonies_per_1k_pop: 9.246276466, misdeamors_per_1k_pop: 21.96895435, year: 2024 },
  { name: "Tuolumne County", felonies_per_1k_pop: 9.722969588, misdeamors_per_1k_pop: 25.66195981, year: 2024 },
  { name: "Ventura County", felonies_per_1k_pop: 6.81328231, misdeamors_per_1k_pop: 19.17462567, year: 2024 },
  { name: "Yolo County", felonies_per_1k_pop: 6.122059392, misdeamors_per_1k_pop: 14.88561649, year: 2024 },
  { name: "Yuba County", felonies_per_1k_pop: 9.637700214, misdeamors_per_1k_pop: 28.5243915, year: 2024 },
];

export const getCountyByName = (name: string): County | undefined => {
  return counties.find(county => county.name.toLowerCase() === name.toLowerCase());
};

export const countyToSlug = (county: string | County): string => {
  const countyName = typeof county === 'string' ? county : county.name;
  return countyName
    .toLowerCase()
    .replace(/\s+county\s*$/i, "") // Remove "County" suffix
    .replace(/\s+/g, "-");
};

export const slugToCounty = (slug: string): County | undefined => {
  const countyName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const fullName = `${countyName} County`;
  return getCountyByName(fullName);
};

