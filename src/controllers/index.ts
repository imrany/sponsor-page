import axios from "axios"
import { db } from "../sqlite";
import { v4 as uuidv4 } from 'uuid';
import { config } from "dotenv";
config()

export const addContribution = async (req: any, res: any) => {
    try {
        const { amount, phone_number }=req.body
        const external_reference=`INV-${uuidv4().trim().split("-").slice(0,1)}`
        // Concatenating username and password with colon 
        const credentials = `${process.env.USERNAME}:${process.env.PASSWORD}`; 
        // Base64 encode the credentials 
        const encodedCredentials = btoa(credentials); 
        const { data } = await axios.post('https://backend.payhero.co.ke/api/v2/payments', { 
            amount, 
            phone_number, 
            channel_id: process.env.CHANNEL_ID, 
            provider: 'm-pesa', 
            external_reference, 
            callback_url: process.env.CALLBACK_URL 
        }, { 
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Basic ${encodedCredentials}` 
            }, 
            maxRedirects: 10, 
            timeout: 0 
        }); 
        
        console.log(data)
        if(data.success){
            res.status(201).json({message:`stk push was successfull`})
        }else{
            res.status(204).json({error:`stk push was unsuccessfull`})
        }
    } catch (error: any) {
        console.error("Error adding contribution:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addContributionUsingQueryParams = async (req: any, res: any) => {
    try {
        const { amount, phone_number }=req.query
        const external_reference=`INV-${uuidv4().trim().split("-").slice(0,1)}`
        // Concatenating username and password with colon 
        const credentials = `${process.env.USERNAME}:${process.env.PASSWORD}`; 
        // Base64 encode the credentials 
        const encodedCredentials = btoa(credentials); 
        const { data } = await axios.post('https://backend.payhero.co.ke/api/v2/payments', { 
            amount, 
            phone_number, 
            channel_id: process.env.CHANNEL_ID, 
            provider: 'm-pesa', 
            external_reference, 
            callback_url: process.env.CALLBACK_URL 
        }, { 
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Basic ${encodedCredentials}` 
            }, 
            maxRedirects: 10, 
            timeout: 0 
        }); 

        console.log(data)
        if(data.success){
            res.status(201).json({message:`stk push was successfull`})
        }else{
            res.status(204).json({error:`stk push was unsuccessfull`})
        }
    } catch (error: any) {
        console.error("Error adding contribution:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const storeTransaction = async (req: any, res: any) => {
    try {
        const { 
            amount, 
            CheckoutRequestID, 
            ExternalReference, 
            MerchantRequestID,
            MpesaReceiptNumber,
            Phone,
            ResultCode,
            ResultDesc,
            Status
        }=req.body.response
        db.run(`INSERT INTO contributors (amount, CheckoutRequestID, ExternalReference, MerchantRequestID, MpesaReceiptNumber, Phone, ResultCode, ResultDesc, Status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,[
            amount, 
            CheckoutRequestID, 
            ExternalReference, 
            MerchantRequestID,
            MpesaReceiptNumber,
            Phone,
            ResultCode,
            ResultDesc,
            Status
        ], (error:any, data:any) => {
            if (error) {
                console.log({ error: error })
                res.send({ error: error })
            } else {
                console.log({message:`Received`});
                res.status(200).json({ message: `Received` });
            };
        });
    } catch (error) {
        console.error("Error fetching contributions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const fetchContributions = async (req: any, res: any) => {
    try {
        db.all(`SELECT * FROM contributors;`, (error, data) => {
            if (error) {
                console.log({ error: error })
                res.send({ error: error })
            } else {
                console.log({ contributors: data });
                res.status(200).json({ contributors: data });
            };
        });
    } catch (error) {
        console.error("Error fetching contributions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};