import { Pelicula, Planeta, Persona } from '../../types/types';

export const getFilmsFromApi = async (): Promise<Pelicula[]> => {
  try {
    const response = await fetch('https://swapi.py4e.com/api/films/');
    const json = await response.json();

    return json.results.map((film: any): Pelicula => ({
      titulo: film.title,
      episodio: film.episode_id,
      textoApertura: film.opening_crawl,
      director: film.director,
      productores: film.producer,
      fechaEstreno: film.release_date,
      especies: film.species,
      navesEstelares: film.starships,
      vehiculos: film.vehicles,
      personajes: film.characters,
      planetas: film.planets,
      url: film.url,
      creado: film.created,
      editado: film.edited,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFilmFromApiById = async (id: string): Promise<Pelicula> => {
  try {
    const response = await fetch(`https://swapi.py4e.com/api/films/${id}`);
    const film = await response.json();

    return {
      titulo: film.title,
      episodio: film.episode_id,
      textoApertura: film.opening_crawl,
      director: film.director,
      productores: film.producer,
      fechaEstreno: film.release_date,
      especies: film.species,
      navesEstelares: film.starships,
      vehiculos: film.vehicles,
      personajes: film.characters,
      planetas: film.planets,
      url: film.url,
      creado: film.created,
      editado: film.edited,
    };
  } catch (error) {
    console.error(error);
    return {
      titulo: '',
      episodio: 0,
      textoApertura: '',
      director: '',
      productores: '',
      fechaEstreno: '',
      especies: [],
      navesEstelares: [],
      vehiculos: [],
      personajes: [],
      planetas: [],
      url: '',
      creado: '',
      editado: '',
    };
  }
};

export const getPlanetsFromApi = async (
  page: number = 1,
  searchQuery?: string
): Promise<{ results: Planeta[]; totalPages: number }> => {
  try {
    const url = searchQuery
      ? `https://swapi.py4e.com/api/planets/?search=${searchQuery}`
      : `https://swapi.py4e.com/api/planets/?page=${page}`;

    const response = await fetch(url);
    const json = await response.json();

    const planets = json.results.map((planet: any): Planeta => ({
      nombre: planet.name,
      diametro: planet.diameter,
      periodoRotacion: planet.rotation_period,
      periodoOrbital: planet.orbital_period,
      gravedad: planet.gravity,
      poblacion: planet.population,
      clima: planet.climate,
      terreno: planet.terrain,
      aguaSuperficial: planet.surface_water,
      residentes: planet.residents,
      peliculas: planet.films,
      url: planet.url,
      creado: planet.created,
      editado: planet.edited,
    }));

    return {
      results: planets,
      totalPages: searchQuery ? 1 : Math.ceil(json.count / 10),
    };
  } catch (error) {
    console.error("Error fetching planets:", error);
    return { results: [], totalPages: 1 };
  }
};

export const getPlanetFromApiById = async (id: string): Promise<Planeta> => {
  try {
    const response = await fetch(`https://swapi.py4e.com/api/planets/${id}/`);
    const planet = await response.json();

    return {
      nombre: planet.name,
      diametro: planet.diameter,
      periodoRotacion: planet.rotation_period,
      periodoOrbital: planet.orbital_period,
      gravedad: planet.gravity,
      poblacion: planet.population,
      clima: planet.climate,
      terreno: planet.terrain,
      aguaSuperficial: planet.surface_water,
      residentes: planet.residents,
      peliculas: planet.films,
      url: planet.url,
      creado: planet.created,
      editado: planet.edited,
    };
  } catch (error) {
    console.error("Error fetching planets:", error);
    return {
      nombre: '',
      diametro: '',
      periodoRotacion: '',
      periodoOrbital: '',
      gravedad: '',
      poblacion: '',
      clima: '',
      terreno: '',
      aguaSuperficial: '',
      residentes: [],
      peliculas: [],
      url: '',
      creado: '',
      editado: '',
    };
  }
};

export const getPeopleFromApi = async (
  page: number = 1,
  searchQuery?: string
): Promise<{ results: Persona[]; totalPages: number }> => {
  try {
    const url = searchQuery
      ? `https://swapi.py4e.com/api/people/?search=${searchQuery}`
      : `https://swapi.py4e.com/api/people/?page=${page}`;

    const response = await fetch(url);
    const json = await response.json();

    const people = json.results.map((person: any): Persona => ({
      nombre: person.name,
      anoNacimiento: person.birth_year,
      colorOjos: person.eye_color,
      genero: person.gender,
      colorCabello: person.hair_color,
      altura: person.height,
      masa: person.mass,
      colorPiel: person.skin_color,
      planetaNatal: person.homeworld,
      peliculas: person.films,
      especies: person.species,
      navesEstelares: person.starships,
      vehiculos: person.vehicles,
      url: person.url,
      creado: person.created,
      editado: person.edited,
    }));

    return {
      results: people,
      totalPages: searchQuery ? 1 : Math.ceil(json.count / 10),
    };
  } catch (error) {
    console.error("Error fetching people:", error);
    return { results: [], totalPages: 1 };
  }
};

export const getPeopleFromApiById = async (id: string): Promise<Persona> => {
  try {
    const response = await fetch(`https://swapi.py4e.com/api/people/${id}`);
    const person = await response.json();

    return {
      nombre: person.name,
      anoNacimiento: person.birth_year,
      colorOjos: person.eye_color,
      genero: person.gender,
      colorCabello: person.hair_color,
      altura: person.height,
      masa: person.mass,
      colorPiel: person.skin_color,
      planetaNatal: person.homeworld,
      peliculas: person.films,
      especies: person.species,
      navesEstelares: person.starships,
      vehiculos: person.vehicles,
      url: person.url,
      creado: person.created,
      editado: person.edited,
    };
  } catch (error) {
    console.error(error);
    return {
      nombre: '',
      anoNacimiento: '',
      colorOjos: '',
      genero: '',
      colorCabello: '',
      altura: '',
      masa: '',
      colorPiel: '',
      planetaNatal: '',
      peliculas: [],
      especies: [],
      navesEstelares: [],
      vehiculos: [],
      url: '',
      creado: '',
      editado: '',
    };
  }
};
