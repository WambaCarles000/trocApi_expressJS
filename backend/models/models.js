const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
   username: { type: String, required: true },
   email: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   isAuthenticated: { type: Boolean,default : false },
   confirmationToken: { type: String, default : null },
   propositions: [{ type: Schema.Types.ObjectId, ref: 'Proposition' }],
   responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
   address: { type: Schema.Types.ObjectId, ref: 'Address', unique: true },
}, {
   timestamps: true,
}

);





const propositionSchema = new Schema({
    intitule: { type: String, required: true },
    description: { type: String, required: true },
    contrePartie: { type: String, required: true },
    date: { type: Date, default: Date.now },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
});

const responseSchema = new Schema({
    intitule: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    proposition: { type: Schema.Types.ObjectId, ref: 'Proposition' },
});

const imageSchema = new Schema({
    url: { type: String, required: true },
    proposition: { type: Schema.Types.ObjectId, ref: 'Proposition' },
    response: { type: Schema.Types.ObjectId, ref: 'Response' },
});

const addressSchema = new Schema({
    ville: { type: String, required: true },
    region: { type: String, required: true },
    pays: { type: String, required: true },
    rue: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
});

const categorySchema = new Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
    propositions: [{ type: Schema.Types.ObjectId, ref: 'Proposition' }],
    responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
});




const User = mongoose.model('User', userSchema);
const Proposition = mongoose.model('Proposition', propositionSchema);
const Response = mongoose.model('Response', responseSchema);
const Image = mongoose.model('Image', imageSchema);
const Address = mongoose.model('Address', addressSchema);
const Category = mongoose.model('Category', categorySchema);


module.exports = {

   User,
   Proposition,
   Response,
   Image,
   Address,
   Category,
   
};