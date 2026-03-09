import Auth from './Auth'
import BrowseController from './BrowseController'
import DistrictController from './DistrictController'
import DivisionController from './DivisionController'
import Settings from './Settings'
import UserController from './UserController'
import UserGroupController from './UserGroupController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
DivisionController: Object.assign(DivisionController, DivisionController),
DistrictController: Object.assign(DistrictController, DistrictController),
UserGroupController: Object.assign(UserGroupController, UserGroupController),
BrowseController: Object.assign(BrowseController, BrowseController),
}

export default Controllers