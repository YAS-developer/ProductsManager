
import { useEffect, useState,  } from 'react';
import Product from '../../models/product';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, FormControlLabel, Checkbox } from '@mui/material';



interface AddDialogProps {
    open: boolean;
    closeAddDialog: () => void
}

export default function AddDialog({open, closeAddDialog}: AddDialogProps){

    const [newProduct, setNewProduct] = useState<Product | undefined>(new Product(0, '', '', 0, 0, 0, false));
    const [newProductView, setNewProductView] = useState<Product | undefined>(new Product(0, '', '', 0, 0, 0, false));

    useEffect(() => {
        setNewProductView(newProduct)
        console.log(newProductView)
    }, [newProduct]);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const name = event.target.name;
        let value: string | number | boolean = event.target.value;
    
        if (name === 'price' || name === 'rating' || name === 'warranty_years') {
          if (value === '' || (typeof value === 'number' && value < 0)) {
            value = 0;
          }
          else if(value.startsWith('0') && value.length > 1){
            value = Number(value.slice(1));
          }
        } else if (name === 'available') {
          value = !newProduct?.available;
        }
    
        setNewProduct((prevState: any) => ({
          ...prevState,
          [name]: value,
        }));
        

      };

    return(
        <>
            { newProductView &&
                 <Dialog open={open} onClose={closeAddDialog}   maxWidth="xl" 
                 PaperProps={{
                     style:{
                         height: '70vh'
                     }
                 }}
             >
                 <DialogTitle>Ajout d'un Produit</DialogTitle>
                 <DialogContent>
                     <Box mb={2} sx={{ width: '500px' }}></Box>    
                     <Box mb={2} sx={{ width: '500px' }}>
                         <TextField
                             name="name"
                             label="Nom"
                             value={newProductView.name}
                             onChange={inputChange}
                             fullWidth
                         />
                     </Box>
                     <Box mb={2} sx={{ width: '500px' }}>
                         <TextField
                             name="type"
                             label="Type"
                             value={newProductView.type}
                             onChange={inputChange}
                             fullWidth
                         />
                     </Box>
                     <Box mb={2} sx={{ width: '500px' }}>
                         <TextField
                             name="price"
                             label="Prix"
                             type="number"
                             value={newProductView.price}
                             onChange={inputChange}
                             fullWidth
                         />
                     </Box>
                     <Box mb={2} sx={{ width: '500px' }}>
                         <TextField
                             name="rating"
                             label="Note"
                             type="number"
                             value={newProductView.rating}
                             onChange={inputChange}
                             fullWidth
                         />
                     </Box>
                     
                     <Box mb={2} sx={{ width: '500px' }}>
                         <TextField
                             name="warranty_years"
                             label="Durée de garantie (années)"
                             type="number"
                             value={newProductView.warranty_years}
                             onChange={inputChange}
                             fullWidth
                         />
                     </Box>
                     <Box mb={2} sx={{ width: '500px' }}>
                     <FormControlLabel
                         label="Disponible"
                         control={
                         <Checkbox
                             name="available"
                             checked={newProductView.available}
                             onChange={inputChange}
                         />
                         }
                     />
                     </Box>
 
             </DialogContent>
                 <DialogActions>
                 <Button onClick={closeAddDialog}>Annuler</Button>
                 <Button variant="contained" color="primary">
                     Enregistrer
                 </Button>
                 </DialogActions>
             </Dialog>
            }
        </>
    )
}