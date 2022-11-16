const express = require('express');
const router = express.Router();
const {
    createForm,
    deleteForm,
    getAllForms,
    deleteAllForms,
    getUserForms,
    updateForm,
} = require('../controllers/formController');

const { isAutheticatedUser, authorisedRoles } = require('../middlewares/auth.js');

// create a new form -- ADMIN
router.route("/lead/new").post(isAutheticatedUser, createForm);

// delete a form -- ADMIN
router.route("/lead/:id").delete(deleteForm);

// get all forms -- ADMIN
router.route("/allLeads").get(isAutheticatedUser, authorisedRoles("admin"), getAllForms);

// delete all forms -- ADMIN
router.route("/lead/delete/all").delete(deleteAllForms);

//get user specific forms -- USER
router.route("/leads/coordinator").get(isAutheticatedUser, getUserForms);

//update a form -- ADMIN
router.route("/lead/:id").put(
    isAutheticatedUser,
    updateForm
)

module.exports = router;