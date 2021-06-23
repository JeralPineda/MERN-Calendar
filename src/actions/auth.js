import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
   return async (dispatch) => {
      //    Petición login
      const resp = await fetchSinToken('auth', { email, password }, 'POST');

      const body = await resp.json();

      //   Si el body es ok: true guardamos el token en localstorage
      if (body.ok) {
         localStorage.setItem('x-token', body.token);
         localStorage.setItem('token-init-date', new Date().getTime()); //fecha en que se creo el token

         dispatch(
            login({
               uid: body.uid,
               name: body.name,
            })
         );
      }
   };
};

export const startChecking = () => {
   return async (dispatch) => {
      //    Petición login
      const resp = await fetchConToken('renew');

      const body = await resp.json();

      //   Si el body es ok: true guardamos el token en localstorage
      if (body.ok) {
         localStorage.setItem('x-token', body.token);
         localStorage.setItem('token-init-date', new Date().getTime()); //fecha en que se creo el token

         dispatch(
            login({
               uid: body.uid,
               name: body.name,
            })
         );
      }
   };
};

// acción para guardar el usuario autenticado en el state
const login = (user) => ({
   type: types.authLogin,
   payload: user,
});
