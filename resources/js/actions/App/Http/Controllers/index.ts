import Auth from './Auth'
import UserController from './UserController'
import Settings from './Settings'
import DivisionController from './DivisionController'
import DistrictController from './DistrictController'
import UserGroupController from './UserGroupController'
import BrowseController from './BrowseController'
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