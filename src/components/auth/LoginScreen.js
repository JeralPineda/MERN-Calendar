import React from 'react';
import './login.css';

export const LoginScreen = () => {
   const toggleForm = (e) => {
      e.preventDefault();
      const container = document.querySelector('.container');
      container.classList.toggle('active');
   };

   return (
      <section>
         <div className='container'>
            <div className='user signinBx'>
               <div className='imgBx'>
                  <img src='./images/5.jpg' alt='' />
               </div>

               <div className='formBx'>
                  <form>
                     <h2>Ingreso</h2>
                     <input type='text' name='' placeholder='Nombre' />

                     <input type='password' name='' placeholder='Contraseña' />

                     <input type='submit' name='' value='Ingresar' />

                     <p className='signup'>
                        No tienes una cuenta ?
                        <a href='/login' onClick={toggleForm}>
                           Crear cuenta
                        </a>
                     </p>
                  </form>
               </div>
            </div>

            <div className='user signupBx'>
               <div className='formBx'>
                  <form>
                     <h2>Registro</h2>

                     <input type='text' name='' placeholder='Nombre' />

                     <input type='email' name='' placeholder='Correo' />

                     <input type='password' name='' placeholder='Contraseña' />

                     <input type='password' name='' placeholder='Confirmar Contraseña' />

                     <input type='submit' name='' value='Crear cuenta' />

                     <p className='signup'>
                        Ya tienes una cuenta ?
                        <a href='/login' onClick={toggleForm}>
                           Ingresar
                        </a>
                     </p>
                  </form>
               </div>

               <div className='imgBx'>
                  <img src='./images/1.jpg' alt='' />
               </div>
            </div>
         </div>
      </section>
   );
};
