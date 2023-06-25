/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useState} from 'react';
import axos from  'axios'


export default function Service(){
    
    // etant donne que malheuresement pas utiliser l'API par manque de temps j'ai directement un jeton de mon compte. Ce dernier est normalement automatise dans le code.

    const [token, setToken] = useState<String>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk3YWQ1MzdkNjlkMjE1NGMzYWUwZTYiLCJpYXQiOjE2ODc2NjE5MDd9.AmE_jRRc0fj-abfQSvc1tXQG1XmwemrzfT1uqLCtw2M')
    const urlOfApi = "http://localhost:3001" 
    
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    };
    
    // USER

    const register = (email: string, password: string) => {
        return axos.post(urlOfApi+"/api/users",{
            email: email,
            password: password
        })
    }

    const login = (email: string, password: string) =>{
        return axos.post(urlOfApi+"/api/users/login",{
            email: email,
            password: password
        })
    }

    const getUserConnected = () =>{
        return axos.get(urlOfApi+"/api/users/me", config)
    }

    const setUserConnected = (email: string, password: string) =>{
        return axos.put(urlOfApi+"/api/users/me",{
            email: email,
            password: password
        },config)
    }

    const deleteUserConnected = () =>{
        return axos.delete(urlOfApi+"/api/users/me", config)
    }


    // PRODUCT

    const createProduct = (
        name: String,
        type: String,
        price: String,
        rating: String,
        warrantly_years:String,
        available: boolean
    ) => {
        return axos.post(urlOfApi+"/api/products",{
            name: name,
            type: type,
            price: price,
            rating: rating,
            warrantly_years:warrantly_years,
            available: available
        } ,config)
    }

    const getAllProducts = () =>{
        return axos.get(urlOfApi+"/api/products", config)
    }


    const getProduct = (id: Number) =>{
        return axos.get(urlOfApi+"/api/products/"+id, config)
    }

    const setProduct = (
        id: Number,
        name: String,
        type: String,
        price: String,
        rating: String,
        warrantly_years:String,
        available: boolean
    ) => {
        return axos.put(urlOfApi+"/api/products/"+id, config)
    }

    const deleteProduct = (id: Number) => {
        return axos.delete(urlOfApi+"/api/products/"+id, config)
    }
}
  
