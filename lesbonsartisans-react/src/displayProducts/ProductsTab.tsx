// import * as React from 'react';
import { useState } from 'react';
import Product from '../models/product';
import { PRODUCTS } from '../models/data-products';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton} from '@mui/material';
import AddDialog  from './popUp/AddDialog';
import EditDialog from './popUp/EditDialog';
import DeleteDialog from './popUp/DeleteDialog';






export default function DataTable() {
    const rows = PRODUCTS;

    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false)

    const [rowSelected, setRowSelected] = useState<Product | undefined>(undefined)

    const [editDialogOpen, setEditDialogOpen] = useState(false)

    const [isChecked, setIsChecked] = useState<boolean>(false)

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

  
    const switchCheck = () => {
        setIsChecked((prevIsChecked) => {
            const updatedIsChecked = !prevIsChecked;
            return updatedIsChecked;
        });
    }

    const closeAddDialog = () => {
        setAddDialogOpen(false)
    }

    const closeEditDialog = () => {
        setEditDialogOpen(false)
    }

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
    }

    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerAlign: 'left', width: 150 },
        { field: 'name', headerName: 'name', headerAlign: 'left', width: 150 },
        { field: 'type', headerName: 'type', headerAlign: 'left', width: 150 },
        { field: 'price', headerName: 'price', headerAlign: 'left', type: 'number', width: 150 },
        { field: 'rating', headerName: 'rating', headerAlign: 'left', type: 'number', width: 150 },
        { field: 'warranty_years', headerName: 'warranty_years', headerAlign: 'left', type: 'number', width: 170 },
        { field: 'available', headerName: 'available', headerAlign: 'left', type: 'boolean', width: 150, disableColumnMenu: true, sortComparator: () => 0 },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            width: 150,
            disableColumnMenu: true,
            sortComparator: () => 0,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => {
                        setAddDialogOpen(true)
                    }}>
                    <AddIcon />
                    </IconButton>

                    <IconButton onClick={() => {
                        setEditDialogOpen(true) 
                        setRowSelected(params.row)
                        setIsChecked(params.row.available)
                        // console.log(isChecked)
                    }}>
                    <EditIcon />
                    </IconButton>
                    
                    <IconButton onClick={() => {
                        setDeleteDialogOpen(true)
                        setRowSelected(params.row)
                    }}>
                    <DeleteIcon />
                    
                    </IconButton>
                </div>
                
            ),
        },
    ];
  


  return (
    <div style={{ height: '50%', width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            style={{ minHeight: 'calc(100vh - 70px)' }} // Définir la hauteur du DataGrid pour occuper tout l'espace
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            disableRowSelectionOnClick  
            autoHeight
        />

        <AddDialog 
            open={addDialogOpen}
            closeAddDialog={closeAddDialog}
        />
        {rowSelected && (
            <>
                <EditDialog
                  open={editDialogOpen}
                  rowSelected={rowSelected}
                  closeEditDialog={closeEditDialog}
                  isChecked={isChecked}
                  switchCheck={switchCheck} 
                  />
                  
                <DeleteDialog 
                  open={deleteDialogOpen}
                  rowSelected={rowSelected}
                  closeDeleteDialog = {closeDeleteDialog}
                /> 
            </>
        ) 
        }
    </div> 
  )
}
