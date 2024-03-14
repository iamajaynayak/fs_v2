import { loaderActionType } from './loadingActionType'

const INITIAL_STATE ={
	loading : false
}

const loadingReducer= (state = INITIAL_STATE , action ) => {
	switch(action.type) {
		case loaderActionType.SET_LOADING :
		return {
			...state,
			loading : !state.loading
		}
		default:
		return state;
	}
}

export default loadingReducer;