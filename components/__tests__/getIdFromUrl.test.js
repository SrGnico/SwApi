import { getIdFromUrl } from "../PlanetsWidget";

test("Extrae correctamente el ID de una URL de SWAPI", () => {
  expect(getIdFromUrl("https://swapi.py4e.com/api/planets/8/")).toBe("8");
  expect(getIdFromUrl("https://swapi.py4e.com/api/people/3/")).toBe("3");
  expect(getIdFromUrl("https://swapi.py4e.com/api/people/17/")).toBe("17");
});