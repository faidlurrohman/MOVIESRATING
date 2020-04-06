import {combineReducers} from 'redux';
import {AuthReducer} from './AuthReducer';
import {ProfileReducer} from './ProfileReducer';
import {MovieReducer} from './MovieReducer';
import {SearchReducer} from './SearchReducer';
import {ReviewReducer} from './ReviewReducer';

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  movie: MovieReducer,
  search: SearchReducer,
  review: ReviewReducer,
});
