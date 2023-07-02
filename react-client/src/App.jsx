import './App.css'
import {OidcProvider, TokenRenewMode, useOidc} from "@axa-fr/react-oidc";

export const configuration = {
    client_id: 'react-api-client',
    redirect_uri: window.location.origin + '/authentication/callback',
    silent_redirect_uri: window.location.origin + '/authentication/silent-callback',
    silent_login_uri: window.location.origin + '/authentication/silent-login',
    scope: 'openid profile email api.read api.write offline_access',
    authority: 'http://localhost:8080/auth',
    // authority_time_cache_wellknowurl_in_second: 60* 60,
    refresh_time_before_tokens_expiration_in_second: 40,
    // service_worker_relative_url: '/OidcServiceWorker.js',
    service_worker_only: false,
    storage: localStorage,
    token_renew_mode: TokenRenewMode.access_token_invalid,
};

function App() {
  return (
      <OidcProvider configuration={configuration} >
          <div className="App">
              <Home/>
          </div>
      </OidcProvider>
  );
}

export const Home = () => {
    const { login, logout, renewTokens, isAuthenticated } = useOidc();

    return (
        <div className="container-fluid mt-3">
            <p className="card-text">React Demo Application protected by OpenId Connect. More info on about oidc on <a href="https://github.com/AxaGuilDEv/react-oidc">GitHub @axa-fr/react-oidc</a></p>
            {!isAuthenticated && <p><button type="button" className="btn btn-primary" onClick={() => login('/profile')}>Login</button></p>}
            {isAuthenticated && <p><button type="button" className="btn btn-primary" onClick={() => logout('/profile')}>logout /profile</button></p>}
            {isAuthenticated && <p><button type="button" className="btn btn-primary" onClick={() => logout()}>logout</button></p>}
            {isAuthenticated && <p><button type="button" className="btn btn-primary" onClick={() => logout(null)}>logout whithout callbackredirect</button></p>}
            {isAuthenticated && <p><button type="button" className="btn btn-primary" onClick={async () => console.log('renewTokens result', await renewTokens())}>renew tokens</button></p>}
        </div>
    );
};

export default App;
