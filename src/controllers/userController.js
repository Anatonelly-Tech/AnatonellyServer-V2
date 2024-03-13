const { User: UserModel } = require('../models/User');
const {
  ResponsibleFreight: ResponsibleFreightModel,
} = require('../models/ResponsibleFreight');

const fs = require('fs');

const userController = {
  create: async (req, res) => {
    try {
      const {
        name,
        email,
        role,
        phone,
        password,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
      } = req.body;
      const picture = req.file ? req.file.path : '';

      const user = {
        name,
        email,
        role,
        phone,
        password,
        picture: picture,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
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
      const response = await UserModel.findOne({ idUser });
      if (!response) {
        return res.status(400).json({ error: 'Id do usuário não existe!' });
      }
      fs.unlink(response.picture, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
      });

      await UserModel.findOneAndDelete({ idUser });

      return res.status(200).json({ msg: 'Usuário deletado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },

  update: async (req, res) => {
    try {
      const idUser = req.params.idUser;
      const {
        name,
        email,
        role,
        password,
        employeesID,
        phone,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
      } = req.body;

      const picture = req.file ? req.file.path : '';

      const user = {
        name,
        email,
        password,
        role,
        picture: picture,
        phone,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
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
  updateByEmailRemoveResp: async (req, res) => {
    try {
      const email = req.params.email;
      const {
        name,
        role,
        password,
        employeesID,
        phone,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
      } = req.body;

      const picture = req.file ? req.file.path : '';
      const actualUser = await UserModel.findOne({ email: email });
      const actualEmployeesId = actualUser.employeesID;

      // Usando um Set para armazenar os IDs únicos
      let totalEmployees = [];
      totalEmployees = actualEmployeesId.filter(
        (item) => item !== employeesID
      );

      const finalEmployees = Array.from(totalEmployees);
      // Convertendo o Set de volta para um array

      const user = {
        name,
        email,
        password,
        role,
        picture: picture,
        phone,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
        employees: await ResponsibleFreightModel.find({
          idResponsible: finalEmployees,
        }),
        employeesID: finalEmployees,
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
  updateByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      const {
        name,
        role,
        password,
        employeesID,
        phone,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
      } = req.body;
      const picture = req.file ? req.file.path : '';

      const actualUser = await UserModel.findOne({ email: email });
      const actualEmployeesId = actualUser.employeesID;

      let totalEmployeesSet = [];
      totalEmployeesSet = actualEmployeesId;
      // Usando um Set para armazenar os IDs únicos
      if (totalEmployeesSet.length === 0) {
        totalEmployeesSet.push(employeesID);
      } else {
        if (totalEmployeesSet.includes(employeesID)) {
          console.log('ID já existe');
        } else {
          totalEmployeesSet.push(employeesID);
        }
      }
      const totalEmployees = Array.from(totalEmployeesSet);
      console.log(totalEmployees);
      const user = {
        name,
        email,
        password,
        role,
        picture: picture,

        phone,
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
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
