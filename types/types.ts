export type Pelicula = {
  titulo: string;
  episodio: number;
  textoApertura: string;
  director: string;
  productores: string;
  fechaEstreno: string;
  especies: string[];
  navesEstelares: string[];
  vehiculos: string[];
  personajes: string[];
  planetas: string[];
  url: string;
  creado: string;
  editado: string;
};

export type Planeta = {
  nombre: string;
  diametro: string;
  periodoRotacion: string;
  periodoOrbital: string;
  gravedad: string;
  poblacion: string;
  clima: string;
  terreno: string;
  aguaSuperficial: string;
  residentes: string[];
  peliculas: string[];
  url: string;
  creado: string;
  editado: string;
};

export type Persona = {
  nombre: string;
  anoNacimiento: string;
  colorOjos: string;
  genero: string;
  colorCabello: string;
  altura: string;
  masa: string;
  colorPiel: string;
  planetaNatal: string;
  peliculas: string[];
  especies: string[];
  navesEstelares: string[];
  vehiculos: string[];
  url: string;
  creado: string;
  editado: string;
};

export type PlanetName =
  | "Alderaan"
  | "Aleen Minor"
  | "Bespin"
  | "Cato Neimoidia"
  | "Chandrila"
  | "Concord Dawn"
  | "Corellia"
  | "Coruscant"
  | "Cerea"
  | "Dagobah"
  | "Dantooine"
  | "Dathomir"
  | "Endor"
  | "Eriadu"
  | "Felucia"
  | "Geonosis"
  | "Glee Anselm"
  | "Haruun Kal"
  | "Hoth"
  | "Iridonia"
  | "Iktotch"
  | "Jakku"
  | "Kalee"
  | "Kamino"
  | "Kashyyyk"
  | "Mirial"
  | "Mon Cala"
  | "Muunilinst"
  | "Mygeeto"
  | "Naboo"
  | "Nal Hutta"
  | "Malastare"
  | "Polis Massa"
  | "Quermia"
  | "Rodia"
  | "Ryloth"
  | "Serenno"
  | "Shili"
  | "Sullust"
  | "Skako"
  | "Tatooine"
  | "Tund"
  | "Troiken"
  | "Toydaria"
  | "Ojom"
  | "Utapau"
  | "Umbara"
  | "Yavin IV"
  | "Zolan";

export type FilmName =
  | "A New Hope"
  | "Attack of the Clones"
  | "Return of the Jedi"
  | "Revenge of the Sith"
  | "The Empire Strikes Back"
  | "The Force Awakens"
  | "The Phantom Menace";