import { Financials } from "../models/FinancialDetails.js";



// Business details for the ipo eligibility
export async function getAllFinancialDetails(req, res) {
  try {
    const allFinancials = await Financials.find({}).populate("createdBy");
    return res.status(200).json({ allFinancials });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}


export async function EditFinancialDetails(req, res) {
  try {
    const { gstNumber,turnOverYear,turnOver,patYear,PAT } = req.body;
    const updateFields = {};
    if (gstNumber) updateFields.gstNumber = gstNumber;
    if (turnOverYear) updateFields.turnOverYear = turnOverYear;
    if (turnOver) updateFields.turnOver = turnOver;
    if (patYear) updateFields.patYear = patYear;
    if (PAT) updateFields.PAT = PAT;

    const editedFinancialDetails = await Financials.findOneAndUpdate(
      { gstNumber },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!editedFinancialDetails) {
      return res.status(404).send("Financials not found");
    }
    return res.status(200).json({ editedFinancialDetails });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}