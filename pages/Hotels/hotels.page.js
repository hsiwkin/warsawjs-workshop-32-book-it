import { MainViewHandler } from 'shared/hocs';
import { fetchHotels } from 'data/actions/hotels';

let Hotels = ({}) => {
  return <div>Lorem Ipsum</div>;
};

Hotels = MainViewHandler({
  fetchData: fetchHotels,
})(Hotels);

export default Hotels;
