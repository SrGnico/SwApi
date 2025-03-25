import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import PlanetsWidget from '../PlanetsWidget'; 
import { getPlanetsFromApi } from '../../services/swApi/swApi';
import { Provider } from 'react-redux'; 
import { store } from '../../redux/store'; 

jest.mock('../../services/swApi/swApi', () => ({
  getPlanetsFromApi: jest.fn(),
}));

describe('PlanetsWidget', () => {
  it('debería mostrar los planetas con sus imágenes y nombres', async () => {
    const planetsData = {
      results: [
        {
          nombre: 'Tatooine',
          url: 'https://swapi.py4e.com/api/planets/1/',
        },
        {
          nombre: 'Alderaan',
          url: 'https://swapi.py4e.com/api/planets/2/',
        },
      ],
    };

    getPlanetsFromApi.mockResolvedValue(planetsData); 

    render(
        <Provider store={store}> 
          <PlanetsWidget />
        </Provider>
      );

    
    await waitFor(() => expect(getPlanetsFromApi).toHaveBeenCalledTimes(1));

    const planetImages = screen.getAllByTestId(/planet-image-/);

    expect(planetImages).toHaveLength(2);

  });
});
