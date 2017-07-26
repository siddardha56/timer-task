
export const showMessage = (index) => ({
  type: 'DISPLAY_MESSAGE',
  payload: index,
});

export const hideMessage = () => ({ 
	type: 'HIDE_MESSAGE'
});
