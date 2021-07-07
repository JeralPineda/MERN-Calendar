import { uiReducer } from '../../reducers/uiReducer';
import { uiCloseModal, uiOpenModal } from '../../actions/ui';

const iniState = {
   modalOpen: false,
};

describe('Pruebas en uiReducer', () => {
   test('debe de retornar el estado por defecto', () => {
      const state = uiReducer(iniState, {});

      expect(state).toEqual(iniState);
   });

   test('debe de abrir y cerrar el modal', () => {
      //   abrir modal
      const modalOpen = uiOpenModal();

      const state = uiReducer(iniState, modalOpen);

      expect(state).toEqual({ modalOpen: true });

      //   Cerrar modal
      const modalClose = uiCloseModal();

      const stateClose = uiReducer(iniState, modalClose);

      expect(stateClose).toEqual({ modalOpen: false });
   });
});
