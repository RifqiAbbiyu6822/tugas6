import express from "express";
import { getNotes, getNotesById, createuser, updateuser, deleteuser } from "../controller/UserController.js";

const router = express.Router();

router.get('/notes', getNotes);
router.get('/notes/:id', getNotesById);
router.post('/notes', createuser);
router.patch('/notes/:id', updateuser);
router.delete('/notes/:id', deleteuser);

export default router;