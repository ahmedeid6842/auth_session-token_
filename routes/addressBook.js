const express = require("express");
const router = express.Router();

const { getAddressController, addAddressController, updateAddressController, deleteAddressController } = require("../controllers/addressBook")
const { isAuth } = require("../middleware/isAuthSession")

router.get("/", getAddressController);
router.post("/", addAddressController);
router.put("/", updateAddressController);
router.delete("/", deleteAddressController);


module.exports = router;