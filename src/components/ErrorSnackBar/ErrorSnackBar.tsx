import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../APP/store';
import { setAppErrorAC } from '../../APP/app-reducer';
import { useDispatch } from 'react-redux';

 function CustomizedSnackbars() {

    const error= useSelector <AppRootStateType, string | null>(state=>state.app.error)
    const dispatch=useDispatch()
//   const [open, setOpen] = React.useState(true);

 

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null))
    // setOpen(false);
  };


 
const isOpen = error !== null;

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
        
      </Snackbar>
         </div>
  );
}
export default  CustomizedSnackbars


