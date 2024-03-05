
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const  {  User,Address,Proposition } = require("../models/models");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'wamba';
const TOKEN_EXPIRATION_TIME = '120'; // 1 heure d'expiration




// FONCTION DE GENERATION DE LA CHAINE ALEATOIRE POUR LA CONFIRMATION DE L'USER

function generateUniqueToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');

}

// fonction qui envoie le mail de confirmation
async function sendConfirmationEmail(user) {

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4ef3fad278252d",
      pass: "ac931c0d45b8dd"
    }
  });

  const confirmationLink = `http://localhost:5000/auth/confirm?token=${user.confirmationToken}`;

  const mailOptions = {
    from: 'shadowgroup',
    to: user.email,
    subject: 'Confirmation d\'inscription',
    text: `Cliquez sur le lien suivant pour confirmer votre inscription : ${confirmationLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail de confirmation envoyé :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation :', error);
  }
}

// confirm user
module.exports.confirmUser = async(req, res)=> {
  
  const { token } = req.query;

  console.log('token recupere');

  try {
    const user = await User.findOne({ confirmationToken: token });

    if (user) {


      console.log('Utilisateur trouvé :', user);

      user.isAuthenticated = true;
      user.confirmationToken = null; // Optionnel : une fois confirmé, vous pouvez effacer le jeton
      await user.save();

      console.log('Utilisateur après la mise à jour :', user);
      return res.send('Inscription confirmée !');
    } else {
      return res.status(404).send('Token invalide.');
    }
  } catch (error) {
    console.error('Erreur lors de la confirmation de l\'utilisateur :', error);
    return res.status(500).send('Erreur lors de la confirmation de l\'utilisateur.');
  }
};


  //LOGIN  (Route pour générer un token JWT lors de la connexion)

module.exports.login = async(req,res)=> {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Authentification échouée! user inexistant' });
      }

//decryptage et verification
      const passwordMatch =  bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });

      }

// TOken de connexion
      const token = jwt.sign({ email: user.email, id: user.id, exp: Math.floor(Date.now() / 1000) + (3600)}, SECRET_KEY);
      res.json({ token });

      
  
     
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



//Creation des utilisateurs



module.exports.createUser = async (req, res) => {

   // Récupérez l'ID de l'utilisateur à partir du token
   const storedToken = req.headers.authorization;
   const decodedToken = jwt.decode(storedToken);
   const userId = decodedToken.id;

  try {
    if (!req.body.username || !req.body.email) {
      return res.status(400).json({ message: "Username or email is missing!" });
    }

    // Vérifions si le username ou l'email existe déjà
    const existingUser = await User.findOne({ username: req.body.username });
    const existingUser2 = await User.findOne({ email: req.body.email });

    if (existingUser || existingUser2) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const confirmationToken = generateUniqueToken();

    
    const address = await Address.create({
    
      ville : req.body.ville,
      region:req.body.region,
      pays:req.body.pays,
      rue:req.body.rue,
      user:userId
    });

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      address : address.id,
      confirmationToken: confirmationToken,
      isAuthenticated: false
    });

    // Envoi du mail de confirmation
    await sendConfirmationEmail(user);

    // Affichage de l'utilisateur créé
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};



//get all users

module.exports.getAllUsers = async(req,res) =>{

    const users = await User.find()

    res.status(200).json(users);
}






//get  a specific user

module.exports.getUser = async(req,res) =>{


  const user = await User.findById(req.params.id)

  res.status(200).json(user);
}


//edit user

module.exports.editUser = async(req,res) =>{

    const user = await User.findById(req.params.id);
   
    if(!user){

        res.status(400).json({message : " utilisateur inexistant !"});
    }
        

    const userUpdated = await User.findByIdAndUpdate(user,req.body,{new :true});

       
  
       res.status(200).json("User updated :" + userUpdated);
        
 };




//delete user

 module.exports.deleteUser = async (req, res) => {
     try {
         // Utilisez findOne au lieu de findById
         const user = await User.findOne({ _id: req.params.id });
 
         // Débogage : Affichez le contenu de l'objet post dans la console
         console.log(user);
 
         // Vérifiez si le post a été trouvé
         if (!user) {
             return res.status(400).json({ message: "user inexistant !" });
         }
 
         // Utilisez la méthode deleteOne pour supprimer le document
         const result = await User.deleteOne({ _id: req.params.id });
 
         // Vérifiez si la suppression a été réussie
         if (result.deletedCount === 1) {
             // Réponse en cas de succès
             return res.status(200).json({ message: "User deleted successfully!" });
         } else {
             // Réponse en cas d'échec de la suppression
             return res.status(400).json({ message: "Unable to delete the post." });
         }
     } catch (error) {
         // Débogage : Affichez l'erreur dans la console
         console.error("Error deleting user:", error);
 
         // Réponse en cas d'erreur serveur
         return res.status(500).json({ message: "Internal Server Error" });
     }
}



module.exports.getUserProp = async (req, res) => {

  const userId = req.params.userId;

console.log(userId);


    try {
      // Recherche de l'utilisateur avec ses propositions
      const user = await User.findOne(userId).populate('propositions');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Accès aux propositions de l'utilisateur via user.propositions
      const propositions = user.propositions;


      res.status(200).json({ data: propositions });
  } catch (error) {
      console.error('Error fetching propositions:', error);
      res.status(500).json({ message: 'Failed to fetch propositions' });
  }

}