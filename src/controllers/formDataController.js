const {FormData: FormDataModel} = require('../models/FormData');
const {ResponsibleFreight: ResponsibleFreightModel} = require('../models/ResponsibleFreight');


const formDataController = {
    create: async (req, res) => {
        try {
            // destructuring
            const { 
                name, 
                collectCity, 
                collectDate, 
                deliveryCity, 
                deliveryDate, 
                product, 
                species,
                weight,
                volume,
                weightCuban,
                sizeCubic,
                length,
                height,
                freightPrice,
                paymentForm,
                comments,
                advancePrice,
                radioCalculoDoValor,
                radioValueLocalizacao,
                radioValueTipoCarga,
                radioValueLona,
                radioValueRastreador,
                radioUnidade,
                radioValueValor,
                radioValuePedagio,
                radioPacoteEscolhido,
                veiculos,
                carrocerias,
            } = req.body;

            const  idResponsible  = req.query.idResponsible;
            // schema
            const formData = {
                name,
                collectCity,
                collectDate,
                deliveryCity,
                deliveryDate,
                responsibleFreight: await ResponsibleFreightModel.find({idResponsible}),
                product, 
                species,
                weight,
                volume,
                weightCuban,
                sizeCubic,
                length,
                height,
                freightPrice,
                paymentForm,
                comments,
                advancePrice,
                radioCalculoDoValor,
                radioValueLocalizacao,
                radioValueTipoCarga,
                radioValueLona,
                radioValueRastreador,
                radioUnidade,
                radioValueValor,
                radioValuePedagio,
                radioPacoteEscolhido,
                veiculos,
                carrocerias,        
            };

            const response = await FormDataModel.create(formData);
            res.status(200).json({ response, msg: 'Formulário criado com sucesso!' });
        } catch (err) {
            if (err.code == '11000') {
                res.status(400).json({ error: 'Id do formulário já existe!' });
            }
            console.log(err);
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await FormDataModel.find();
            res.status(200).json({ response });
        } catch (err) {
            console.log(err);
        }
    },
    getById: async (req, res) => {
        try{
            const idForm = req.params.idForm;
    
            const response = await FormDataModel.findOne({ idForm });
            
            res.status(200).json({ response });
        } 
        catch (err) {
            console.log(err);
        }
    },
    delete: async (req, res) => {
        try {
            const idForm = req.params.idForm;
            const response = await FormDataModel.findOneAndDelete({ idForm });
            if(!response){
                return res.status(400).json({ error: "Id do formulário não existe!" });
            }
            res.status(200).json({ msg: 'Formulário deletado com sucesso!'});
        } catch (err) {
            console.log(err);
        }
    },
    update: async (req, res) => {
        try {
            const idForm = req.query.idForm;
            const idResponsible = req.query.idResponsible;
            const { 
                name, 
                collectCity, 
                collectDate, 
                deliveryCity, 
                deliveryDate, 
                product, 
                species,
                weight,
                volume,
                weightCuban,
                sizeCubic,
                length,
                height,
                freightPrice,
                paymentForm,
                comments,
                advancePrice,
                radioCalculoDoValor,
                radioValueLocalizacao,
                radioValueTipoCarga,
                radioValueLona,
                radioValueRastreador,
                radioUnidade,
                radioValueValor,
                radioValuePedagio,
                radioPacoteEscolhido,
                veiculos,
                carrocerias,
            } = req.body;
            const formData = {
                name,
                collectCity,
                collectDate,
                deliveryCity,
                deliveryDate,
                responsibleFreight: await ResponsibleFreightModel.find({idResponsible}),
                product, 
                species,
                weight,
                volume,
                weightCuban,
                sizeCubic,
                length,
                height,
                freightPrice,
                paymentForm,
                comments,
                advancePrice,
                radioCalculoDoValor,
                radioValueLocalizacao,
                radioValueTipoCarga,
                radioValueLona,
                radioValueRastreador,
                radioUnidade,
                radioValueValor,
                radioValuePedagio,
                radioPacoteEscolhido,
                veiculos,
                carrocerias,        
            };


            const response = await FormDataModel.findOneAndUpdate(
                {idForm},
                formData,
                {new: true}
            );

            res.status(200).json({ response });
        } catch (err) {
            console.log(err);
        }
    }       


}

module.exports = formDataController;