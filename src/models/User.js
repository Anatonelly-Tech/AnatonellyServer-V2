const mongoose = require('mongoose');

const { formatToTimeZone } = require('date-fns-timezone');
const { addHours } = require('date-fns');
const format = 'DD-MM-YYYY HH:mm:ss';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'User'],
    default: 'User',
  },
  createdAt: {
    type: String,
    default: formatToTimeZone(addHours(new Date(), -1), format, {
      timeZone: 'America/Sao_Paulo',
    }),
  },
  idUser: {
    type: Number,
    unique: true,
  },
  employees: {
    type: Array,
  },
  employeesID: {
    type: Array,
  },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isNew) {
      // Se o documento já existe, não faz nada
      return next();
    }

    // Encontra o último documento para obter o valor mais alto
    const lastDocument = await this.constructor.findOne(
      {},
      {},
      { sort: { idUser: -1 } }
    );

    // Define o próximo valor de auto-incremento

    this.idUser = (lastDocument && lastDocument.idUser + 1) || 1;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  UserSchema,
};
