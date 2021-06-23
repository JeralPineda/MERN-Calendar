import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';

import './login.css';

export const LoginScreen = () => {
   const dispatch = useDispatch();

   const [formLoginValues, handleLoginInputChange] = useForm({
      lEmail: 'jeral@gmail.com',
      lPassword: '123456',
   });
   const { lEmail, lPassword } = formLoginValues;

   const [formRegisterValues, handleRegisterInputChange] = useForm({
      rName: 'Cristopher',
      rEmail: 'Cris@gmail.com',
      rPassword1: '123456',
      rPassword2: '123456',
   });
   const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

   //  Effecto en los formularios de login y registro
   const toggleForm = (e) => {
      e.preventDefault();
      const container = document.querySelector('.container');
      container.classList.toggle('active');
   };

   const handleLogin = (e) => {
      e.preventDefault();

      dispatch(startLogin(lEmail, lPassword));
   };

   const handleRegister = (e) => {
      e.preventDefault();

      //   Validación de las contraseñas
      if (rPassword1 !== rPassword2) {
         Swal.fire('Error', 'Ambas contraseñas deben de ser iguales', 'error');
      }

      dispatch(startRegister(rEmail, rPassword1, rName));
   };

   return (
      <section>
         <div className='container'>
            <div className='user signinBx'>
               <div className='imgBx'>
                  <img src='./images/5.jpg' alt='' />
               </div>

               <div className='formBx'>
                  <form onSubmit={handleLogin}>
                     <h2>Ingreso</h2>

                     <input
                        type='text' //
                        placeholder='Correo'
                        name='lEmail'
                        value={lEmail}
                        onChange={handleLoginInputChange}
                     />

                     <input
                        type='password' //
                        placeholder='Contraseña'
                        name='lPassword'
                        value={lPassword}
                        onChange={handleLoginInputChange}
                     />

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
                  <form onSubmit={handleRegister}>
                     <h2>Registro</h2>

                     <input
                        type='text' //
                        placeholder='Nombre'
                        name='rName'
                        value={rName}
                        onChange={handleRegisterInputChange}
                     />

                     <input
                        type='email' //
                        placeholder='Correo'
                        name='rEmail'
                        value={rEmail}
                        onChange={handleRegisterInputChange}
                     />

                     <input
                        type='password' //
                        placeholder='Contraseña'
                        name='rPassword1'
                        value={rPassword1}
                        onChange={handleRegisterInputChange}
                     />

                     <input
                        type='password' //
                        placeholder='Confirmar Contraseña'
                        name='rPassword2'
                        value={rPassword2}
                        onChange={handleRegisterInputChange}
                     />

                     <input
                        type='submit' //
                        name=''
                        value='Crear cuenta'
                     />

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
