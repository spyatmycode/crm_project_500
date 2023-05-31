import Twilio from 'twilio';

const accountSid = 'YOUR_ACCOUNT_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const verifyServiceSid = 'YOUR_VERIFY_SERVICE_SID';

const client = Twilio(accountSid, authToken);

const initiateVerification = async (phoneNumber) => {
  try {
    const verification = await client.verify.services(verifyServiceSid).verifications.create({
      to: phoneNumber,
      channel: 'sms', // or 'call' for voice verification
    });
    console.log(verification.sid);
    // Handle success or provide feedback to the user
  } catch (error) {
    console.error(error);
    // Handle error or provide feedback to the user
  }
};

const phoneNumber = '+2349029985332'; // Replace with the phone number to verify
initiateVerification(phoneNumber);
