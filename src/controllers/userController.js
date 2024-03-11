const { User: UserModel } = require('../models/User');
const {
  ResponsibleFreight: ResponsibleFreightModel,
} = require('../models/ResponsibleFreight');

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, role, password, picture } = req.body;
      const user = {
        name,
        email,
        password,
        role,
        picture,
      };

      const tryFindUser = await UserModel.findOne({ email: user.email });
      if (tryFindUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const response = await UserModel.create(user);

      return res
        .status(200)
        .json({ response, msg: 'Usuário criado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },
  getAll: async (req, res) => {
    try {
      const response = await UserModel.find();
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  getById: async (req, res) => {
    try {
      const idUser = req.params.idUser;
      const response = await UserModel.findOne({ idUser });
      if (!response) {
        return res.status(400).json({ error: 'Usuário não existe!' });
      }
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  getByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      const response = await UserModel.findOne({ email }).select('+password');
      if (!response) {
        return res.status(400).json({ error: 'Email não existe!' });
      }
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Erro ao buscar email!' });
    }
  },

  delete: async (req, res) => {
    try {
      const idUser = req.params.idUser;
      const response = await UserModel.findOneAndDelete({ idUser });
      if (!response) {
        return res.status(400).json({ error: 'Id do usuário não existe!' });
      }
      return res.status(200).json({ msg: 'Usuário deletado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },

  update: async (req, res) => {
    try {
      const idUser = req.params.idUser;
      const { name, email, role, password, picture, employeesID } = req.body;
      const user = {
        name,
        email,
        password,
        role,
        picture,
        employees: await ResponsibleFreightModel.find({
          idResponsible: employeesID,
        }),
        employeesID,
      };

      const response = await UserModel.findOneAndUpdate({ idUser }, user, {
        new: true,
      });

      return res
        .status(200)
        .json({ response, msg: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
  updateByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      const { name, role, password, picture, employeesID } = req.body;

      const actualUser = await UserModel.findOne({ email: email });
      const actualEmployeesId = actualUser.employeesID;
      
      let totalEmployeesSet = [];
      totalEmployeesSet = actualEmployeesId;
      // Usando um Set para armazenar os IDs únicos

      if (totalEmployeesSet.includes(employeesID)) {
        console.log('ID já existe');
      }
      else
      {
        totalEmployeesSet.push(employeesID);
      }
      // Convertendo o Set de volta para um array
      const totalEmployees = Array.from(totalEmployeesSet);

      const user = {
        name,
        email,
        password,
        role,
        picture,
        employees: await ResponsibleFreightModel.find({
          idResponsible: totalEmployees,
        }),
        employeesID: totalEmployees,
      };

      const response = await UserModel.findOneAndUpdate(
        { email: email },
        user,
        {
          new: true,
        }
      );

      if (!response) {
        return res.status(400).json({ error: 'Email não existe!' });
      }

      return res
        .status(200)
        .json({ response, msg: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
};
module.exports = userController;
