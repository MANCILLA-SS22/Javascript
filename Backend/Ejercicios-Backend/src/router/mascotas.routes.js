import { Router } from 'express';
import {getAllPets, createPet, createPetWithImage, updatePet, deletePet} from '../controllers/mascotas.controller.js';
import { uploader } from '../utils/multer.js';

const router = Router();

router.get('/', getAllPets);
router.post('/', createPet);
router.post('/withimage', uploader.single('image'), createPetWithImage);
router.put('/:pid', updatePet);
router.delete('/:pid', deletePet);

export default router;