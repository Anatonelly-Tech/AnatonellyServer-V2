const { User: UserModel } = require('../models/User');


const userController = {
    create: async (req, res) => {
        const { name, email, password, hash } = req.body;
        try {
            const user = {
                hash,
                name,
                email,
                password,
            };

            const response = await UserModel.create(user);
            res.status(200).json({ response, msg: 'Usuário criado com sucesso!' });
        } catch (err) {
          if (err.code === 11000) {
            try{
                const response = await UserModel.findOne({ email });
                if (response) {
                    res.status(200).json({ error: 'Email de registro já existe!' });
                }
                else{
                    return res.status(400).json({ error: "Hash de registro já existe!" });
                }
            }
            catch(err){
                res.status(400).json({ error: "Falha no registro" });
            }
          }
          console.log(err);
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await UserModel.find();
            res.status(200).json({ response });
        } catch (err) {
            console.log(err);
        }
    },
    getQueryParms: async (req, res) => {
        if(req.query.name){
            try {
                const response = await UserModel.find({ name: new RegExp(req.query.name, 'i') });
                res.status(200).json({ response });
            } catch (err) {
                console.log(err);
            }
        }
        if(req.query.email){
            try {
                const response = await UserModel.find({  email: new RegExp(req.query.email, 'i')});
                res.status(200).json({ response });
            } catch (err) {
                console.log(err);
            }
        }
        if(req.query.hash){
            try {
                const response = await UserModel.find({  hash: req.query.hash });

                res.status(200).json({ response });
            } catch (err) {
                console.log(err);
            }
        }
    },
    delete: async (req,res) => {
        try{
            console.log(req.query.hash);
            const response = await UserModel.deleteOne({hash: req.query.hash});
            res.status(200).json({ msg: 'Registro deletado com sucesso!' });
        }
        catch(err){
            console.log(err);
        }
    },
    update: async (req, res) => {
        const { name, email, password, hash } = req.body;
        try {
            const user = {
                hash,
                name,
                email,
                password,
            };

            const response = await UserModel.updateOne({hash: req.query.hash}, user);
            res.status(200).json({ response, msg: 'Registro atualizado com sucesso!' });
        } catch (err) {
          if (err.code === 11000) {
            try{
                const response = await UserModel.findOne({ email });
                if (response) {
                    res.status(200).json({ error: 'Email de registro já existe!' });
                }
                else{
                    return res.status(400).json({ error: "Hash de registro já existe!" });
                }
            }
            catch(err){
                res.status(400).json({ error: "Falha no registro" });
            }
          }
          console.log(err);
        }
    },
    
}
module.exports = userController;
