import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper Fetch', () => {
   let token = '';

   test('fetch sin token debe de funcionar', async () => {
      const resp = await fetchSinToken('auth', { email: 'jeral@gmail.com', password: '123456' }, 'POST');

      expect(resp instanceof Response).toBe(true);

      const body = await resp.json();
      expect(body.ok).toBe(true);

      token = body.token;
   });

   test('fetch con token debe de funcionar', async () => {
      localStorage.setItem('x-token', token);

      const resp = await fetchConToken('events/60d193b592d92a0015c925c8', {}, 'DELETE');

      const body = await resp.json();

      expect(body.msg).toBe('Evento no existe por ese id');
   });
});
