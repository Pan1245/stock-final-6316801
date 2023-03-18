import { connect, model, models, Schema } from "mongoose";
const connectionString = process.env.MONGODB_URI_STOCK

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)

    if (req.method === 'GET') {
        const docs = await Supplier.find();
        res.status(200).json(docs);
    } else if (req.method === 'POST') {
        const doc = await Supplier.create(req.body);
        res.status(201).json(doc);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const supplierSchema = new Schema({
    name: String,
    address: String,
    phone: String,
});

console.log("Mongoose Models", models)
const Supplier = models?.supplier || model('supplier', supplierSchema);