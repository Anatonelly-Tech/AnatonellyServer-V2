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
        isAdmin,
      } = req.body;

      const responsibleFreight = {
        name,
        cpf,
        email,
        phone,
        contactWay,
        department,
        password,
        isAdmin,
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
        isAdmin,
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
        isAdmin,
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
