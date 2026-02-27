import Auth from './Auth'
import Settings from './Settings'
import UserController from './UserController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers