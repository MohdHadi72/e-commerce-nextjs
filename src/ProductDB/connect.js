const { USERNAME, PASSWORD } = process.env;
export const ConnectionDB = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.an9ktjh.mongodb.net/productsDB?appName=Cluster0`;