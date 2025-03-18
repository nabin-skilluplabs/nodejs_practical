
import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All jobs");
  });

router.get("/:id", (req, res) => {
 const id = req.params.id;
 res.json({status: "OK", data: { id }});
});

router.post("/", (req, res) => {
    const body = req.body;
    res.json({status: "OK", message: "New job added successfully!", data: body});
  });

router.put("/:id", (req, res) => {
    res.json({status: "OK", message: `Job with id ${req.params.id} updated successfully!`});
});

router.delete("/:id", (req, res) => {
    res.json({status: "OK", message: `Job with id ${req.params.id} deleted successfully!`});
});

export default router;