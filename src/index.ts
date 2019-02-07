// Imports

const dotenv = require('dotenv')
dotenv.config()
import * as morgan from "morgan"
import * as express from "express"
import * as bodyParser from "body-parser"

// Code

import './routines/ProcessReceivedTransactions'
import './routines/ProcessSendTransactions'
import './jobs/RedundantTransactionsObservable'
import './routines/ProcessCreateAddress'
import './routines/SetNodeStatus'

const port: any = process.env.SERVICEPORT

const app: any = express()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(bodyParser.json())

app.use(function (req: any, res: any, next: any) {
    // Website you wish to allow to connect
  
    res.setHeader('Access-Control-Allow-Origin', '*')
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false)
    // Pass to next layer of middleware
    next()
})
app.disable('x-powered-by')

app.listen( port, ()=> {
    console.log("Running on %s",  port)
})