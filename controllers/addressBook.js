const Address = require("../models/addressBook");
const { addressSchemaValidation, updateAddressSchemaValidation } = require("../validators/address")

module.exports.getAddressController = async (req, res) => {
    let address = await Address
        .findOne({ userId: req.session.user._id })
        .populate('userId', ['email']);
    if (!address) return res.status(404).send({ message: "no contact found " })
    return res.send({ message: "found", address });
}

module.exports.addAddressController = async (req, res) => {
    const { error } = addressSchemaValidation(req.body);
    if (error) return res.status(400).send(error.message);

    let addressExist = await Address.findOne({ userId: req.session.user._id });
    if (addressExist) return res.status(400).send({ message: "contact already exist" });

    let newAddress = new Address({
        userId: req.session.user._id,
        ...req.body
    })

    await newAddress.save();
    return res.send({ message: "added successfully", newAddress })
}

module.exports.updateAddressController = async (req, res) => {
    const { error } = updateAddressSchemaValidation(req.body);
    if (error) return res.status(400).send(error.message);

    let updatedAddress = await Address.findOneAndUpdate({ userId: req.session.user._id }, { $set: req.body }, { new: true })
    if (!updatedAddress) return res.status(404).send({ message: "no contact found " })

    return res.send({ message: "updated successfully ", updatedAddress })
}

module.exports.deleteAddressController = async (req, res) => {
    let deletedAddress = await Address.findOneAndDelete({ userId: req.session.user._id });
    if (!deletedAddress) return res.status(404).send("no contact found");

    return res.send({ message: "deleted successfully" })
}