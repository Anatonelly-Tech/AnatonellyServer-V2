const {
  ResponsibleFreight: ResponsibleFreightModel,
} = require('../models/ResponsibleFreight');

const responsibleFreightController = {
  create: async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        contactWay,
        department,
        cpf,
        password,
        role,
      } = req.body;

      const responsibleFreight = {
        name,
        cpf,
        email,
        phone,
        contactWay,
        department,
        password,
        role,
      };

      const response = await ResponsibleFreightModel.create(responsibleFreight);
      res
        .status(200)
        .json({ response, msg: 'Responsável do Frete criado com sucesso!' });
    } catch (error) {
      if (error.code == '11000') {
        res.status(406).json({ error: 'Email do responsável já existe!' });
      }
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const response = await ResponsibleFreightModel.find();
      res.status(200).json({ response });
    } catch (err) {
      console.log(err);
    }
  },
  getById: async (req, res) => {
    try {
      const idResponsible = req.params.idResponsible;
      const response = await ResponsibleFreightModel.findOne({ idResponsible });
      res.status(200).json({ response });
    } catch (err) {
      console.log(err);
    }
  },
  getByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      const response = await ResponsibleFreightModel.findOne({ email }).select(
        '+password'
      );
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
      const idResponsible = req.params.idResponsible;
      const response = await ResponsibleFreightModel.findOneAndDelete({
        idResponsible,
      });
      if (!response) {
        return res.status(400).json({ error: 'Id do responsável não existe!' });
      }
      res
        .status(200)
        .json({ msg: 'Responsável do Frete deletado com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    try {
      const idResponsible = req.params.idResponsible;
      const {
        name,
        email,
        phone,
        contactWay,
        department,
        password,
        role,
        cpf,
      } = req.body;

      const responsibleFreight = {
        name,
        cpf,
        email,
        phone,
        contactWay,
        department,
        password,
        role,
      };

      const response = await ResponsibleFreightModel.findOneAndUpdate(
        { idResponsible },
        responsibleFreight,
        { new: true }
      );
      res.status(200).json({ response });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = responsibleFreightController;
