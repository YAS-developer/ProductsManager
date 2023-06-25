import {Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material"
import Product from "../../models/product";

interface DeleteDialogProps {
    open: boolean;
    rowSelected: Product ;
    closeDeleteDialog: () => void
}




export default function DeleteDialog({open, rowSelected, closeDeleteDialog} : DeleteDialogProps){

    const confirmDelete = () => {
        
    }


    return(
    
        <Dialog open={open} onClose={closeDeleteDialog} maxWidth="xl">
            <DialogTitle>Confirmation de suppression</DialogTitle>
            <DialogContent>{
                     rowSelected && <p>Êtes-vous sûr de vouloir supprimer le produit {rowSelected.name}?</p>
            } 
            </DialogContent>
            <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
                Non
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
                Oui
            </Button>
            </DialogActions>
        </Dialog>
    )
}

