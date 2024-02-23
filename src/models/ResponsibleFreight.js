const mongoose = require('mongoose');

const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone');
const { addHours } = require('date-fns');
const format = 'DD-MM-YYYY HH:mm:ss';

const ResponsibleFreightSchema = new mongoose.Schema({
  idResponsible: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  contactWay: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    enum: [
      'Administrativo',
      'Comercial',
      'Compras',
      'Diretoria',
      'Financeiro',
      'Fiscal',
      'Gerencial',
      'Operacional',
      'Suporte',
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: String,
    default: formatToTimeZone(addHours(new Date(), -1), format, {
      timeZone: 'America/Sao_Paulo',
    }),
  },
});

// Auto-incremento
ResponsibleFreightSchema.pre('save', async function (next) {
  try {
    // Se não existir, continua com o auto-incremento
    if (!this.isNew) {
      // Se o documento já existe, não faz nada
      return next();
    }

    // Encontra o último documento para obter o valor mais alto
    const lastDocument = await this.constructor.findOne(
      {},
      {},
      { sort: { idResponsible: -1 } }
    );

    // Define o próximo valor de auto-incremento
    this.idResponsible = (lastDocument && lastDocument.idResponsible + 1) || 1;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  ResponsibleFreight: mongoose.model(
    'ResponsibleFreight',
    ResponsibleFreightSchema
  ),
  ResponsibleFreightSchema,
};
