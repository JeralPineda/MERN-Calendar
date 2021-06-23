import { fetchSinToken } from '../helpers/fetch';

export const startLogin = (email, password) => {
   return async () => {
      //    Petición login
      const resp = await fetchSinToken('auth', { email, password }, 'POST');

      const body = await resp.json();

      //   Si el body es ok: true guardamos el token en localstorage
      if (body.ok) {
         localStorage.setItem('x-token', body.token);
         localStorage.setItem('token-init-date', new Date().getTime()); //fecha en que se creo el token
      }
   };
};
