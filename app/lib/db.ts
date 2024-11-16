const userId = process.env.USER_ID;
const password = process.env.PASSWORD;

// Check if the required environment variables are defined
if (!userId || !password) {
  throw new Error('Missing environment variables: USER_ID or PASSWORD');
}

// Construct the connection string
export const connectionStr = `mongodb+srv://${userId}:${password}@ecommercestore.tpjj7gs.mongodb.net/patientAppointmentSystem?retryWrites=true&w=majority&appName=EcommerceStore`;
