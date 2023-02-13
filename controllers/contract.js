const Client = require('../models/Client.js')
const Contract = require('../models/Contract.js')
const { cloudinary } = require('../middlewares/multer.js')

exports.getContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll({ include: Client })
        const clients = await Client.findAll({})

        return res.status(200).json({ contracts, clients })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

exports.createContract = async (req, res) => {
    try {
        const file = req.file
        let fileResults = null

        await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({
                    resource_type: "auto",
                    folder: 'documents',
                    public_id: `${Date.now()}_${file.originalname}`,
                }, (error, result) => {
                    if (error) return reject();

                    fileResults = result;
                    return resolve();
                }
                )
                .end(file.buffer);
        });

        req.body.deliverable = req.body.deliverable === 'on' ? true : false
        const newContract = await Contract.create({
            ...req.body,
            document: fileResults?.secure_url,
            documentOriginalName: req?.file?.originalname,
        })

        const contract = await Contract.findByPk(newContract.id, { include: Client })
        return res.status(200).json({ contract })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}


exports.updateContract = async (req, res) => {
    try {
        const { id } = req.params
        const file = req?.file

        let fileResults = null

        let newData = { ...req.body }


        if (file) {
            await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({
                        resource_type: "auto",
                        folder: 'documents',
                        public_id: `${Date.now()}_${file.originalname}`,
                    }, (error, result) => {
                        if (error) return reject();

                        fileResults = result;
                        return resolve();
                    }
                    )
                    .end(file.buffer);
            });

            newData = {
                ...req.body,
                document: fileResults?.secure_url,
                documentOriginalName: req?.file?.originalname,
            }
        }


        newData.deliverable = newData.deliverable === 'on' ? true : false
        await Contract.update(newData, {
            where: { id }
        })

        const contract = await Contract.findByPk(id, { include: Client })
        return res.status(200).json({ contract })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

exports.deleteContract = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Contract.destroy({ where: { id } })
        if (!deleted) {
            return res.status(404).json({ error: 'Contract not found' })
        }
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
