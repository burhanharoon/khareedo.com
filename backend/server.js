import express from 'express'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({ path: '/config/config.env' })

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`)
})