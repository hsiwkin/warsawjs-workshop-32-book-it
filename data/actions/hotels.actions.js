import { HOTELS_GET } from 'data/constants';

import fetch from 'data/core/fetch';

export const fetchHotels = ({ query }) => dispatch => {
  const promise = fetch('/hotels');

  dispatch({ type: HOTELS_GET, promise });
};
