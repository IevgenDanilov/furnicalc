const { Module } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const add = async (req, res) => {
  const result = await Module.create(req.body);
  sendSuccessReq(res, { result }, 201);
};

module.exports = add;
