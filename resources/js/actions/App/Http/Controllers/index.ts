import Auth from './Auth'
import UserController from './UserController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    UserController: Object.assign(UserController, UserController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers