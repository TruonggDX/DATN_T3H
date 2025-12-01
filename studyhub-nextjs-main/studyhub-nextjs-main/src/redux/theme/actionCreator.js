import actions from './actions';

const { setMode, setLanguage, setCurrency, modeErr, languageErr, currencyErr } = actions;

const setThemeMode = (mode) => {
	return async (dispatch) => {
		try {
			dispatch(setMode(mode));
		} catch (err) {
			// dispatch(modeErr(err));
		}
	};
};

const setThemeLanguage = (language) => {
	return async (dispatch) => {
		try {
			dispatch(setLanguage(language));
		} catch (err) {
			// dispatch(languageErr(err));
		}
	};
};

const setThemeCurrency = (currency) => {
	return async (dispatch) => {
		try {
			dispatch(setCurrency(currency));
		} catch (err) {
			// dispatch(currencyErr(err));
		}
	};
};

export { setThemeMode, setThemeLanguage, setThemeCurrency };
