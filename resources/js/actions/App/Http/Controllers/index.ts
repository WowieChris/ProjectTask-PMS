import Auth from './Auth'
import UserController from './UserController'
import Settings from './Settings'
import DistrictController from './DistrictController'
import DivisionController from './DivisionController'
import UserGroupController from './UserGroupController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
DistrictController: Object.assign(DistrictController, DistrictController),
DivisionController: Object.assign(DivisionController, DivisionController),
UserGroupController: Object.assign(UserGroupController, UserGroupController),
}

export default Controllers