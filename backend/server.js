const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();


// const port = 3000;

// COnnexion a la base de donnees

connectDB();

//Instantiation de l'application
const app =  express();
// Middleware pour traiter les donnees json entrees dans la requete 

app.use(express.urlencoded({extended : false}));



// USER
app.use("/users",require("./routes/user.routes.js"));


// proposition
app.use("/propositions",require("./routes/proposition.routes.js"));

//response 
app.use("/responses",require("./routes/response.routes.js"));


// address
app.use("/addresses",require("./routes/address.routes.js"));


//category
app.use("/categories",require("./routes/category.routes.js"));

// image
app.use("/images",require("./routes/image.routes.js"));


//authentification
app.use("/auth",require("./routes/auth.routes.js"));


const PORT = process.env.PORT;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(PORT, (err) => {
    if (err) {
      console.error(`Erreur lors du démarrage du serveur : ${err}`);
    } else {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    }
  });
  

