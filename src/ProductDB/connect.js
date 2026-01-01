const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;

export const ConnectionDB = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.an9ktjh.mongodb.net/productsDB?retryWrites=true&w=majority`;
 