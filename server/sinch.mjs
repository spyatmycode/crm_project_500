// Find your Service Plan ID and API Token at dashboard.sinch.com/sms/api/rest
// Find your Sinch numbers at dashboard.sinch.com/numbers/your-numbers/numbers
const SERVICE_PLAN_ID = '780f7c1f53d3417aae2d1d7163ef8935';
const API_TOKEN = '021a6817b8fe46318282537964caf285';
const SINCH_NUMBER = '447520662019';
const TO_NUMBER = '9029985332';

import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      },
      body: JSON.stringify({
        from: SINCH_NUMBER,
        to: [TO_NUMBER],
        body: 'WOWOWOWOOWOWOWOWOWOWOWOW MJS IS CRAZYYY'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();