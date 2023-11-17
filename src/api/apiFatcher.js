import React from "react";
import axios from "axios";

const baseURL = "https://api.themoviedb.org/3"
export let apis = {
    fatchDetails : async (catagory, id)=>{
        try {
            const {data} = await axios.get(`${baseURL}/${catagory}/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
            return data
        } catch(error) {
            console.log(error)
        }
    },

    fatchCrew : async (catagory, id)=>{
        const {data} = await axios.get(`${baseURL}/${catagory}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchList : async (catagory, type, pageNo)=>{
        const {data} = await axios.get(`${baseURL}/${catagory}/${type}?page=${pageNo}&api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchVideo : async (catagory, id)=>{
        const {data} = await axios.get(`${baseURL}/${catagory}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchImage : async (catagory, id)=>{
        const {data} = await axios.get(`${baseURL}/${catagory}/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchRecommendation : async (catagory, id)=>{
        const {data} = await axios.get(`${baseURL}/${catagory}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    }, 

    fatchTails : async (catagory, type)=>{
        const {data} = await axios.get(`${baseURL}/${catagory}/${type}?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchPerson : async (pid)=>{
        const {data} = await axios.get(`${baseURL}/person/${pid}?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchPersonLinks : async (pid)=>{
        const {data} = await axios.get(`${baseURL}/person/${pid}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    }, 

    fatchKeywords : async (category,id)=>{
        const {data} = await axios.get(`${baseURL}/${category}/${id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchSearch : async (category,query)=>{
        const {data} = await axios.get(`${baseURL}/search/${category}?query=${query}&api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    },

    fatchKnownFor : async (pid)=>{
        const {data} = await axios.get(`${baseURL}/person/${pid}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`)
        return data
    }
    
}

