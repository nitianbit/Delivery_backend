import DriverDetails from "../models/DriverDetails.js"

export const getDriverDetails = async (req, res) => {
    try {
        const driverDetails = await DriverDetails.find();
        return res.json({
            data: driverDetails,
            message: 'all driver details',
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        })
    }
}

export const getSingleDriverDetails = async (req, res) => {
    try {
        const driverDetails = await DriverDetails.findById(req.params?.id);
        if (!driverDetails) {
            return res.json({
                data: {},
                message: 'Driver not found',
                status: 404
            });
        }
        return res.json({
            data: driverDetails,
            message: 'all driver details',
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        })
    }
}

export const addSingleDriver = async (req, res) => {
    try {
        const { name, mob_no } = req.body;
        if (!name || !mob_no) {
            return res.josn({
                data: {},
                message: 'please add all required fields',
                status: 400
            });
        }

        const driverDetail = new DriverDetails({ name, mob_no })
        await driverDetail.save();
        return res.json({
            data: driverDetail,
            message: 'Driver Added Successfully',
            status: 200
        })
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const updateSingleDriver = async (req, res) => {
    try {
        const { name, mob_no } = req.body;
        const updateDriver = await DriverDetails.findByIdAndUpdate(req.params?.id, { name, mob_no }, { new: true });
        if (!updateDriver) {
            return res.json({
                data: {},
                message: 'Driver not found',
                status: 404
            });
        }
        return res.json({
            data: updateDriver,
            message: 'Driver Details Updated Successfully',
            status: 200
        });
    } catch (error) {
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const deleteSingleDriver = async (req, res) => {
    try {
        console.log(req.params.id)
        const deleteDriver = await DriverDetails.findByIdAndDelete(req.params?.id)
        if (!deleteDriver) {
            return res.json({
                data: {},
                message: 'Driver not found',
                status: 404
            })
        }
        return res.json({
            data: {},
            message: 'Driver Deleted Successfully',
            status: 200
        })
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}
