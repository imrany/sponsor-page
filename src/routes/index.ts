import express from "express"
import { addContribution, addContributionUsingQueryParams, fetchContributionByRef, fetchContributions, storeTransaction } from "../controllers";

const router=express.Router();

//stk push : post
router.post("/contribute",addContribution)
// get: https://example.com/api/contribute?phone_number=0720202020&amount=200
router.get("/contribute",addContributionUsingQueryParams)

//callback : get
router.get("/callback",storeTransaction)
//fetch all contributions from database
router.get("/contributions",fetchContributions)
router.get("/contributions/:external_reference",fetchContributionByRef)

export default router;