import { createAsyncThunk } from "@reduxjs/toolkit";
//import { useParams } from "react-router-dom"
import axios from "axios";
let apiUrl = "https://minga-violeta-back.onrender.com/"
import AsyncStorage from '@react-native-async-storage/async-storage';




const read_chapters = createAsyncThunk('read_chapters', async({id_manga})=>{
    const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          return token;
        } catch (error) {
          console.log('Error al obtener el token:', error);
          return null;
        }
      };
      
      const getHeaders = async () => {
        const token = await getToken();
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return headers;
      }
    try {
        console.log(id_manga)
        let response = await axios(apiUrl+'chapters/me?manga_id='+id_manga, headers)
        console.log(response)
    
        return {
            chapters: response.data.response
        }

    } catch(error) {
        return {
            chapters: []
        }
        
    }
})

const delete_chapters = createAsyncThunk('delete_chapters', async({id})=>{
    const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          return token;
        } catch (error) {
          console.log('Error al obtener el token:', error);
          return null;
        }
      };
      
      const getHeaders = async () => {
        const token = await getToken();
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return headers;
      };
    try {
        let response = await axios.delete(apiUrl+'chapters/'+id, headers)
        console.log(response)
        return{
            id_delete: id
        }
    } catch(error){
        return{
            chapters: []
        }
    }
})

const update_chapters = createAsyncThunk('update_chapters', async({id, data})=>{
    const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          return token;
        } catch (error) {
          console.log('Error al obtener el token:', error);
          return null;
        }
      };
      
      const getHeaders = async () => {
        const token = await getToken();
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return headers;
      };
    try {
        let response = await axios.put(apiUrl+'chapters/'+id, data, headers)
        console.log(response)
        return{
            data: response.data.response
        }

    } catch(error){
        return{
            chapters: []
        }
    }
})

const actions = {read_chapters ,  delete_chapters, update_chapters}
export default actions