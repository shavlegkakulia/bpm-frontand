import React, { useEffect, useState } from 'react';
import TranslateService from './services/translateService';
import { Constants } from './constants/translate.constants';

function App() {
  const [initialized, setInitialized] = useState<boolean>(false);

  const setLocale = (key) => {
    TranslateService.Use(key).then(Response => {
      setInitialized(Response);
    })
  }
 
  useEffect(() => {
    TranslateService.FetchLocales().then(Response => {
      if(Response.data.success) {
        setLocale(Response.data.data[0].key);
      } else {
        setLocale(Constants._ka)
      }
    });
  }, [])

  if (!initialized) return <div>loading...</div>

  return (
    <div className="App">
      <header className="App-header">
        {TranslateService.T("common.ok")}
      </header>
      <button onClick={() => TranslateService.Use("en")}>en</button>
    </div>
  );
}

export default App;
