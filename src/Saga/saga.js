// Sagas
import { takeEvery, put, call } from 'redux-saga/effects';
import {request, requestDogSuccess, requestDogError} from '../Actions/Actions';
import axios from 'axios';

export function* watchFetch() {
    yield takeEvery('FETCHED', fetchAsync);
}

export function* fetchAsync() {

    try {
        yield put(request());
        const {data} = yield call(
            axios.get,'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR,RUB'
        );

        yield put(requestDogSuccess(data));
    } catch (error) {
        yield put(requestDogError());
    }
}


// //Redux Observable 
// // EPIC:

// import 'npm i rxjs';
// // import { FETCH_DATA, FETCH_DATA_FAIL } from './constants';
// // import { fetchData  } from './actions';
// import axios from 'axios';
// import { Observable, from } from 'rxjs';
// import { mergeMap, map } from 'rxjs/operators';
// import { ofType } from 'redux-observable';
// import { combineReducers } from 'redux';

// const FETCH_DOG = 'FETCH_DATA';
// const FETCH_DATA_FAIL = 'FETCH_DATA_FAIL';

// export const fetchDog = exampleData => ({
//     type: FETCH_DOG,
//     payload: { exampleData }
//     });
    
//     export const fetchDataFail = () => ({
//     type: FETCH_DATA_FAIL
//     });

//     const initialState = {};

//     export const exampleData = (state = initialState, action) => {
//       switch (action.type) {
//         case FETCH_DOG:
//           return action.payload
//         case FETCH_DATA_FAIL:
//           return {};
//         default:
//           return state;
//       }
//     };

//     export default combineReducers({
//       exampleData
//     });

// export const exampleEpic = action$ =>
//   action$.pipe(ofType(FETCH_DOG),
//   mergeMap(action =>
//     from(axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR,RUB'))
//       .map(response => fetchDog(response))
//       .catch(error => Observable.ofType(FETCH_DATA_FAIL)))
// );