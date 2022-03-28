const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
const express = require('express');
const fecth = require('node-fetch');

const app = express();

const fetchOptionsGet = {
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
};

const fetchOptionsPost = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
};

app.get('/', (req,res)=>{
    return res.status(200).json({message: 'hello from survival-bff'})
});

app.get(`/users/username-validation`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/users/username-validation?username=${req.query.username}`;
        const result = await fecth(url, fetchOptionsGet);
        const body = await result.text();
        return res.status(200).send(body);
    })
});

app.get(`/users/email-validation`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/users/email-validation?email=${req.query.email}`;
        const result = await fecth(url, fetchOptionsGet);
        const body = await result.text();
        return res.status(200).send(body);
    })
});


app.post(`/users/add-new-user`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/users/add-new-user?username=${req.query.username}&lastname=${req.query.lastname}&email=${req.query.email}&password=${req.query.password}&secretQuestion=${req.query.secretQuestion}&secretAnswer=${req.query.secretAnswer}`;
        const result = await fecth(url, fetchOptionsPost);
        const body = await result.text();
        return res.status(200).send(body);
    })
});

app.get(`/users/sing-in`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/users/sing-in?username=${req.query.username}&password=${req.query.password}`;
        const result = await fecth(url, fetchOptionsGet);
        const body = await result.text();
        return res.status(200).send(body);
    })
});

app.post(`/users/edit-account`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/users/edit-account?username=${req.query.username}&password=${req.query.password}&email=${req.query.email}`;
        const result = await fecth(url, fetchOptionsPost);
        const body = await result.text();
        return res.status(200).send(body);
    })
});

app.get(`/users/get-load-information`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/users/get-load-information`;
        const result = await fecth(url, fetchOptionsGet);
        const body = await result.json();
        return res.status(200).send(body);
    })
});

app.post(`/users/user-add-silk`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/users/add-silk-after-payment?username=${req.query.username}&silkQuantity=${req.query.silkQuantity}`
        const result = await fecth(url, fetchOptionsPost);
        const body = await result.text();
        return res.status(200).send(body);
    })
});


app.get(`/users/create-payment-paypal`,async (req,res)=>{
    cors(req,res, async ()=>{
        const url = `http://localhost:3002/payment/create-payment-paypal?username=${req.query.username}&amount=${req.query.amount}&silkQuantity=${req.query.silkQuantity}`;
        const result = await fecth(url, fetchOptionsGet);
        const body = await result.text();
        return res.status(200).send(body);
    })
});

app.post(`/payment/process-payment-mercado-pago`,async (req,res)=>{
    cors(req,res, async ()=>{
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: req.body
        }
        const url = `http://localhost:3002/payment/process-payment-mercadopago`;
        const result = await fecth(url, options);
        const body = await result.json();
        return res.status(200).send(body);
    })
});

exports.app = functions.https.onRequest(app);

