import { combineReducers } from 'redux';
import flagPickerReducer from './flagPickerReducer';

export default combineReducers({
    flagPicker: flagPickerReducer
});