import { Router } from "express";
import { body } from "express-validator";
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleWare from '../middleware/auth.middleware.js'

const router = Router();

router.post('/create',
    authMiddleWare.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
)
router.get('/all',
    authMiddleWare.authUser,
    projectController.getAllProject
)

// This route handles adding users to a project.
// It listens for PUT requests at the '/add-user' endpoint.
// The route is protected by the 'authUser' middleware, ensuring only authenticated users can access it.
// It validates the request body to ensure:
//   - 'projectId' is a string and is present in the request body.
//   - 'users' is an array with at least one element, and every element in the array is a string.
// If validation passes, the 'addUserToProject' controller is called to process the request.
router.put('/add-user',
    authMiddleWare.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    projectController.addUserToProject
)

router.get('/get-project/:projectId',
    authMiddleWare.authUser,
    projectController.getProjectById
)
export default router;