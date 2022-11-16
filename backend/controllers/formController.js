const Form = require('../models/formModel');

// create a new form -- ADMIN - coordinator
exports.createForm = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.user", req.user);
    // req.body.user = req.user.id;
    // give unique applicationNo to each form
    const currentYear = new Date().getFullYear();
    console.log("currentYear", currentYear);
    const applicationNo = `MAHANSK${currentYear}MPS`;
    console.log("applicationNo", applicationNo);
    try {
        const form = new Form({
            user: req.user._id,
            ...req.body,
        });
        await form.save();
        res.status(201).json({
            success: true,
            form,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// get all forms -- ADMIN
exports.getAllForms = async (req, res) => {
    try {
        const leads = await Form.find();
        res.status(200).json({
            success: true,
            data: {
                leads,
            },
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
        });
    }
}

//delete a form -- ADMIN
exports.deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: 'No form found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Form deleted',
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
        });
    }
}

//delete all forms -- ADMIN
exports.deleteAllForms = async (req, res) => {
    try {
        const form = await Form.deleteMany();
        if (!form) {
            return res.status(404).json({
                success: false,
                message: 'No form found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'All forms deleted',
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
        });
    }
}


//get forms for a specific user -- USER
exports.getUserForms = async (req, res) => {
    try {
        const form = await Form.find({ user: req.user.id });
        if (!form) {
            return res.status(404).json({
                success: false,
                message: 'No form found',
            });
        }
        res.status(200).json({
            success: true,
            data: {
                form,
            },
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
        });
    }
}

//update a form -- USER
exports.updateForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        if (!form) {
            return res.status(404).json({
                success: false,
                message: 'No form found',
            });
        }
        res.status(200).json({
            success: true,
            data: {
                form,
            },
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
        });
    }
}



