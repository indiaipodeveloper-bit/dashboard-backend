import { Business } from "../models/BusinessDetails.js";

// Business details for the ipo eligibility
export async function getAllBusinessDetails(req, res) {
  try {
    const AllBusinessDetails = await Business.find({}).populate("createdBy");
    return res.status(200).json({ AllBusinessDetails });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// edit the business details 
export async function EditBusinessDetails(req, res) {
  try {
    const { businessName, companyType, contactNo } = req.body;
    const updateFields = {};

    if (businessName) updateFields.businessName = businessName;
    if (companyType) updateFields.companyType = companyType;
    if (contactNo) updateFields.contactNo = contactNo;

    const editedBusinessDetails = await Business.findOneAndUpdate(
      { contactNo },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!editedBusinessDetails) {
      return res.status(404).send("Business not found");
    }
    return res.status(200).json({ editedBusinessDetails });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}