import { pincodes } from "../utils/constants";

export const getPincodes = async (req, res) => {
    return res.json({
        data: pincodes,
        message: 'Pincodes',
        status: 200
    });
};
