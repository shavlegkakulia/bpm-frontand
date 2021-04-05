import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TranslateService from './services/translateService';
import { ITranslateState, IState } from './interfaces/reducer.translate.interface';
import { FetchLocales, FetchTranslates } from './redux/actions/translate.actions';

function App() {
  const dispatch = useDispatch();
  const state = useSelector<ITranslateState>(state => state.TranslateReducer) as IState;

  useEffect(() => {
    dispatch((FetchLocales()));
  }, [])

  if (state.isLoading) return <div>loading...</div>

  return (
    <div className="App">
      <header className="App-header">
        {TranslateService.T(state.Translates, "common.ok")}
      </header>
      <button onClick={() => dispatch(FetchTranslates("en"))}>en</button>
    </div>
  );
}

export default App;
