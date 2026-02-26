import UserController from './UserController'
import Auth from './Auth'
import Settings from './Settings'
const Controllers = {
    UserController: Object.assign(UserController, UserController),
Auth: Object.assign(Auth, Auth),
Settings: Object.assign(Settings, Settings),
}

export default Controllers