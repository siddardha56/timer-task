export const initialData = {

  messages: ['Because I am Batman', 'In the brightest day in the darkest night no evil shall escape my sight' +
  ' those who worship evils might be ware of my power GREEN LANTERNS LIGHT', 'I am last son of krypton',
    'I wont let darkness controll me, I command it', 'My pain and loss is what I am'],
  mainMessage: ''
};


export default function saveActionReducer(state = initialData, action) {
  	let newState = Object.assign({}, state);
  	if(action.type === 'DISPLAY_MESSAGE')
  		newState.mainMessage = newState.messages[action.payload];
	else
    	newState.mainMessage = '';
  	
	return newState;
};