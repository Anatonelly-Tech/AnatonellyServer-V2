const { Driver: DriverModel } = require('../models/Driver');
const {
  ResponsibleFreight: ResponsibleFreightModel,
} = require('../models/ResponsibleFreight');

const fs = require('fs');

const DriverController = {
  create: async (req, res) => {
    try {
      const {
        name,
        email,
        role,
        phone,
        cpf,
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

      const Driver = {
        name,
        email,
        role,
        phone,
        cpf,
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

      const tryFindDriver = await DriverModel.findOne({ cpf: Driver.cpf });
      if (tryFindDriver) {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      } else {
        const response = await DriverModel.create(Driver);
        return res
          .status(200)
          .json({ response, msg: 'Usuário criado com sucesso!' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },
  getAll: async (req, res) => {
    try {
      const response = await DriverModel.find();
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  getById: async (req, res) => {
    try {
      const idDriver = req.params.idDriver;
      const response = await DriverModel.findOne({ idDriver });
      if (!response) {
        return res.status(400).json({ error: 'Usuário não existe!' });
      }
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  getByCpf: async (req, res) => {
    try {
      const cpf = req.params.cpf;
      const response = await DriverModel.findOne({ cpf }).select('+password');
      if (!response) {
        return res.status(400).json({ error: 'CPF não existe!' });
      }
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Erro ao buscar CPF!' });
    }
  },

  delete: async (req, res) => {
    try {
      const idDriver = req.params.idDriver;
      const response = await DriverModel.findOne({ idDriver });
      if (!response) {
        return res.status(400).json({ error: 'Id do usuário não existe!' });
      }
      fs.unlink(response.picture, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
      });

      await DriverModel.findOneAndDelete({ idDriver });

      return res.status(200).json({ msg: 'Usuário deletado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },

  update: async (req, res) => {
    try {
      const idDriver = req.params.idDriver;
      const {
        name,
        role,
        password,
        vehicles,
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

      const Driver = {
        name,
        email,
        password,
        role,
        picture: picture,
        phone,
        cpf,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
        vehicles,
      };

      const response = await DriverModel.findOneAndUpdate(
        { idDriver },
        Driver,
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json({ response, msg: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
  updateByCpf: async (req, res) => {
    try {
      const CPF = req.params.cpf;
      const {
        name,
        role,
        password,
        vehicles,
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

      const Driver = {
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
        vehicles,
      };

      const response = await DriverModel.findOneAndUpdate(
        { cpf: CPF },
        Driver,
        {
          new: true,
        }
      );

      if (!response) {
        return res.status(400).json({ error: 'CPF não existe!' });
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
module.exports = DriverController;
