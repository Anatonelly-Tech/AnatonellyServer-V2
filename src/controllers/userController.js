const { User: UserModel } = require('../models/User');
const {
  ResponsibleFreight: ResponsibleFreightModel,
} = require('../models/ResponsibleFreight');
const { FormData: FormDataModel } = require('../models/FormData');

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
        freightsID,
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
        freightsID,
        freights: await FormDataModel.find({ idForm: freightsID }),
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
  updateByEmailRemove: async (req, res) => {
    try {
      const email = req.params.email;
      const {
        name,
        role,
        password,
        employeesID,
        freightsID,
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
      const actualFreightsId = actualUser.freightsID;

      let totalEmployees = [];
      let totalFreights = [];

      let removeCountEmployees = 0;
      let removeCountFreights = 0;

      if (employeesID !== undefined) {
        totalEmployees = actualEmployeesId.filter(
          (item) => item !== employeesID
        );
        removeCountEmployees++;
      }
      if (freightsID !== undefined) {
        totalFreights = actualFreightsId.filter((item) => item !== freightsID);
        removeCountFreights++;
      }

      const finalEmployees = Array.from(totalEmployees);
      const finalFreights = Array.from(totalFreights);

      if (
        finalEmployees.length === 0 &&
        finalFreights.length === 0 &&
        removeCountEmployees === 0 &&
        removeCountFreights === 0
      ) {
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
      } else if (finalFreights.length === 0 && removeCountFreights === 0) {
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
          employeesID: finalEmployees,
          employees: await ResponsibleFreightModel.find({
            idResponsible: finalEmployees,
          }),
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
      } else if (finalEmployees.length === 0 && removeCountEmployees === 0) {
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
          freightsID: finalFreights,
          freights: await FormDataModel.find({ idForm: finalFreights }),
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
      } else {
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
          freightsID: finalFreights,
          freights: await FormDataModel.find({ idForm: finalFreights }),
          employeesID: finalEmployees,
          employees: await ResponsibleFreightModel.find({
            idResponsible: finalEmployees,
          }),
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
      }
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
        freightsID,
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
      const actualFreightsId = actualUser.freightsID;

      let totalEmployeesSet = [];
      let totalFreightsSet = [];
      totalEmployeesSet = actualEmployeesId;
      totalFreightsSet = actualFreightsId;

      // Usando um Set para armazenar os IDs únicos
      if (employeesID !== undefined) {
        if (totalEmployeesSet.length === 0) {
          totalEmployeesSet.push(employeesID);
        } else {
          if (totalEmployeesSet.includes(employeesID)) {
            console.log('ID já existe');
          } else {
            totalEmployeesSet.push(employeesID);
          }
        }
      }
      console.log('totalEmployees', totalEmployeesSet);

      if (freightsID !== undefined) {
        if (totalFreightsSet.length === 0) {
          totalFreightsSet.push(freightsID);
        } else {
          if (totalFreightsSet.includes(freightsID)) {
            console.log('ID já existe');
          } else {
            totalFreightsSet.push(freightsID);
          }
        }
      }
      const totalEmployees = Array.from(totalEmployeesSet);
      const totalFreights = Array.from(totalFreightsSet);
      console.log(totalEmployees);
      console.log(totalFreights);

      if (totalEmployees.length === 0 && totalFreights.length === 0) {
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
      } else if (totalFreights.length === 0) {
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
          employeesID: totalEmployees,
          employees: await ResponsibleFreightModel.find({
            idResponsible: totalEmployees,
          }),
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
      } else if (totalEmployees.length === 0) {
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
          freightsID: totalFreights,
          freights: await FormDataModel.find({ idForm: totalFreights }),
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
      } else {
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
          freightsID: totalFreights,
          freights: await FormDataModel.find({ idForm: totalFreights }),
          employeesID: totalEmployees,
          employees: await ResponsibleFreightModel.find({
            idResponsible: totalEmployees,
          }),
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
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
};
module.exports = userController;
