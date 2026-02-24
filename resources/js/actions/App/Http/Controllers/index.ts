import Settings from './Settings'
import UserController from './UserController'
const Controllers = {
    UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers