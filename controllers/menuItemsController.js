import MenuItem from "../models/MenuItems.js";

export const createMenuItems = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.json({
                data: {},
                message: 'please add all required fields',
                status: 400
            });
        }
        const menuItem = new MenuItem({ name, price, description });
        await menuItem.save();
        return res.json({
            data: menuItem,
            message: 'Menu item created successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        return res.json({
            data: menuItems,
            message: 'all menu items',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const getSingleMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.json({
                data: {},
                message: 'Menu item not found',
                status: 404
            });
        }
        return res.json({
            data: menuItem,
            message: 'single menu items',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.json({
            data: {},
            message: 'Internal server error',
            status: 500
        });
    }
}

export const updateSingleMenuItem = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, { name, price, description }, { new: true });
        if (!updatedMenuItem) {
            return res.json({
                data: {},
                message: 'Menu item not found',
                status: 404
            });
        }
        return res.json({
            data: updatedMenuItem,
            message: 'Menu item updated successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.json({
                data: {},
                message: 'Menu item not found',
                status: 404
            });
        }
        return res.json({
            data: {},
            message: 'Menu item deleted successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}