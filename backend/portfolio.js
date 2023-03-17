const http = require('http')
const fs = require('fs')

require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const { resolve } = require('path')
const { response } = require('express')
const { resourceLimits } = require('worker_threads')

const port = process.env.PORT


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    fs.readFile('index.html', async function(error, data){
        if (error){
            res.writeHead(404)
            res.write('ERROR: File Not Found')
        }else {
            //results = await getFisrtApp()

            //if (results.ok){
                //const jsonObject = await results.json()

                //console.log(jsonObject)
                //resultingPublicKey = jsonObject['data'][0]['publicKey']
                //console.log(resultingPublicKey)
                //res.render('index', {publicKey:resultingPublicKey})
                res.write(data)
                
            //}
            
            
        }
        res.end()
    })
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



function uploadApp(){
    return new Promise((resolve, reject) => {
        console.log('Atempting To Read APK')
        fs.readFile('Tire-Finder.apk', async function(error, data){
        if (error){
            reject('APK File Not Found')
        }else {
            console.log('Attempting To Fetch')
            let results = await fetch('https://api.appetize.io/v1/apps', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('tok_dfcwgyuw7rgla4rgos4d6cqa4i:'),
                },
                body: JSON.stringify(data)
                })
            results => {
                if (results.ok){
                    console.log('FETCH OK')
                    console.log(results.json())
                    resolve(results)
                }else{
                    reject('FETCH FAILED')
                }
            }
            
        }
        
    })
    })


    
    
    
}


function getFisrtApp(){
    return new Promise((resolve, reject) => {

        console.log('Atempting To Read APK')

        fs.readFile('Tire-Finder.apk', async function(error, data){

        if (error){

            reject('APK File Not Found')

        }else {

            console.log('Attempting To Fetch')

            const results = await fetch('https://api.appetize.io/v1/apps', { 

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('tok_dfcwgyuw7rgla4rgos4d6cqa4i:'),
                },
                //body: JSON.stringify(data)
                })
            
                if (results.ok){
                    console.log('FETCH OK')
                    resolve(results)
                }else{
                    reject('FETCH FAILED')
                }
        }
        
    })
    })


    
    
    
}