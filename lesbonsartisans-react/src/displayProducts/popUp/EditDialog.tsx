import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
import Product from '../../models/product';

interface EditDialogProps {
    open: boolean;
    rowSelected: Product 
    closeEditDialog: () => void
    isChecked: boolean
    switchCheck: () => void
}

export default function EditDialog ({ open, rowSelected, closeEditDialog, isChecked, switchCheck}: EditDialogProps){


    useEffect(() => {
        setEditProduct(rowSelected);
    }, [rowSelected]);

    const [editProduct, setEditProduct] = useState<Product>(rowSelected)


    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        let value: string | number | boolean = event.target.value;
      
        if (name === 'price' || name === 'rating' || name === 'warranty_years') {
            if (value === '' || (typeof value === 'number' && value < 0)) {
              value = 0;
            }
            else if(value.startsWith('0') && value.length > 1){
              value = Number(value.slice(1));
            }
        } else if (name === 'available') {
            switchCheck()
        }


        setEditProduct((prevState: any) => ({
          ...prevState,
          [name]: value,
        }))
    }

    const SaveChanges = () => {
        console.log("SAVE ALL")
        closeEditDialog()
    }


    return(
        <>
            <Dialog open={open} onClose={closeEditDialog}   maxWidth="xl" 
                PaperProps={{
                    style:{
                        height: '70vh'
                    }
                }}
            >
                <DialogTitle>Modification</DialogTitle>
                <DialogContent>
                    <Box mb={2} sx={{ width: '500px' }}></Box>    
                    <Box mb={2} sx={{ width: '500px' }}>
                        <TextField
                            name="name"
                            label="Nom"
                            value={editProduct.name}
                            onChange={inputChange}
                            fullWidth
                        />
                    </Box>
                    <Box mb={2} sx={{ width: '500px' }}>
                        <TextField
                            name="type"
                            label="Type"
                            value={editProduct.type}
                        onChange={inputChange}
                            fullWidth
                        />
                    </Box>
                    <Box mb={2} sx={{ width: '500px' }}>
                        <TextField
                            name="price"
                            label="Prix"
                            type="number"
                            value={editProduct.price}
                            onChange={inputChange}
                            fullWidth
                        />
                    </Box>
                    <Box mb={2} sx={{ width: '500px' }}>
                        <TextField
                            name="rating"
                            label="Note"
                            type="number"
                            value={editProduct.rating}
                        onChange={inputChange}
                            fullWidth
                        />
                    </Box>
                    
                    <Box mb={2} sx={{ width: '500px' }}>
                        <TextField
                            name="warranty_years"
                            label="Durée de garantie (années)"
                            type="number"
                            value={editProduct.warranty_years}
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
                            checked={isChecked}
                            onChange={inputChange}
                        />
                        }
                    />
                    </Box>

            </DialogContent>
                <DialogActions>
                <Button onClick={closeEditDialog}>Annuler</Button>
                <Button onClick={SaveChanges} variant="contained" color="primary">
                    Enregistrer
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


    
