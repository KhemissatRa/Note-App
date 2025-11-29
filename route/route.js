const express = require("express");
const router = express.Router(); // ✅ use express.Router()

const { 
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deletedNote 
} = require("../controler/notecontroler");
const Auth = require("../midlware/Auth_middleware");
const isAdmin = require("../midlware/admin_middwre");
router.post("/notes",Auth, createNote);
router.get("/notes", Auth,getAllNotes);
router.get("/notes/:id",Auth, getNote);
router.put("/notes/:id",Auth, updateNote);
router.delete("/notes/:id",Auth,deletedNote);
module.exports = router; // ✅ export router directly
