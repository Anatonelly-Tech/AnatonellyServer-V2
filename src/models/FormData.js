const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  idForm: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  collectCity: {
    type: String,
    required: true,
  },
  collectDate: {
    type: String,
  },
  deliveryCity: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
  },
  responsibleFreight: {
    type: Array,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
  },
  weightCuban: {
    type: String,
  },
  sizeCubic: {
    type: String,
  },
  length: {
    type: String,
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  idResponsible: {
    type: Array,
    required: true,
  },

  freightPrice: {
    type: String,
    required: true,
  },
  paymentForm: {
    type: String,
    required: true,
    enum: ['Pix', 'Deposito', 'Cartao', 'Cheque', 'Outros'],
  },
  comments: {
    type: String,
  },
  advancePrice: {
    type: String,
  },
  valueCalculation: {
    type: String,
    required: true,
    enum: ['KG', 'T', 'Total'],
  },
  radioValueLocalizacao: {
    type: String,
    required: true,
    enum: ['Nacional', 'Internacional'],
  },
  radioValueTipoCarga: {
    type: String,
    required: true,
    enum: ['Completa', 'Complemento'],
  },
  radioValueLona: {
    type: String,
    required: true,
    enum: ['needCover', 'dontNeedCover'],
  },
  radioValueRastreador: {
    type: String,
    required: true,
    enum: ['needTracker', 'dontNeedTracker'],
  },
  unitMeasurement: {
    type: String,
    required: true,
    enum: ['KG', 'T'],
  },
  radioValueValor: {
    type: String,
    required: true,
    enum: ['JaSeiValor', 'aCombinar'],
  },
  radioValuePedagio: {
    type: String,
    required: true,
    enum: ['InclusoNoValor', 'PagoAParte'],
  },
  radioPacoteEscolhido: {
    type: String,
    required: true,
    enum: ['FreteSimples', 'FreteDestaque'],
  },
  veiculos: {
    type: Array,
    required: true,
  },
  carrocerias: {
    type: Array,
    required: true,
  },
  statusItem: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
FormDataSchema.pre('save', async function (next) {
  try {
    if (!this.isNew) {
      // Se o documento já existe, não faz nada
      return next();
    }

    // Encontra o último documento para obter o valor mais alto
    const lastDocument = await this.constructor.findOne(
      {},
      {},
      { sort: { idForm: -1 } }
    );

    // Define o próximo valor de auto-incremento

    this.idForm = (lastDocument && lastDocument.idForm + 1) || 1;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = { FormData: mongoose.model('FormData', FormDataSchema) };
