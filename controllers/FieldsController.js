import Fields from '../models/FieldModal.js'


export const addFields = async (req, res) => {
    const { label, type, options } = req.body;
    const field = new Fields({ label, type, options: options || [] });

    try {
        await field.save();
        res.status(201).send(field);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getFields = async (req, res) => {
    try {
        const fields = await Fields.find();
        res.status(200).send(fields);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getFieldById = async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Fields.findById(id);
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send(field);
    } catch (error) {
        res.status(500).send(error);
    }
};


export const editField = async (req, res) => {
    const { id } = req.params;
    const { label, type, options } = req.body;

    try {
        const field = await Fields.findByIdAndUpdate(id, { label, type, options: options || [] }, { new: true });
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send(field);
    } catch (error) {
        res.status(400).send(error);
    }
};


export const deleteField = async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Fields.findByIdAndDelete(id);
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send({ message: 'Field deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};