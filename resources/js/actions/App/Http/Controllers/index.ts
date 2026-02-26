import DashboardController from './DashboardController'
import Settings from './Settings'
import UserController from './UserController'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    UserController: Object.assign(UserController, UserController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers