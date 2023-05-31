

const VONAGE_API_KEY = "cd2d74c2"
const VONAGE_API_SECRET ="NtGNLFlbhb2zLMGa"
const TO_NUMBER = 2348060062364
const VONAGE_BRAND_NAME ="Nifemi Akeju"

import { Vonage } from "@vonage/server-sdk"

const vonage = new Vonage({
  apiKey: "cd2d74c2",
  apiSecret:"NtGNLFlbhb2zLMGa"
})

const from = VONAGE_BRAND_NAME
const to = TO_NUMBER
const text = 'A text message sent using the Vonage SMS API'

async function sendSMS() {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();