module.exports = (app) => {
  const biodata = require("../controllers/Biodata.js");
  const router = require("express").Router();
  const { verifyToken } = require("../middleware/VerifyToken.js");

  // Create a new
  router.post("/", biodata.create);
  // Retrieve all Biodata
  router.get("/", verifyToken, biodata.findAll);
  router.get("/live-antrean", biodata.getAntrean);
  router.get("/download", verifyToken, biodata.downloadExcel);
  // Retrieve a single Biodata with id
  router.get("/:id", verifyToken, biodata.findOne);
  // Update a Biodata with id
  router.put("/:id", verifyToken, biodata.update);
  // Patch a Biodata with id
  router.patch("/:id", verifyToken, biodata.patch);
  // Delete a Biodata with id
  router.delete("/:id", verifyToken, biodata.delete);
  // Delete all Biodata
  router.delete("/",verifyToken, biodata.deleteAll);
  app.use("/api/biodata", router);
};
