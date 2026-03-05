import Auth from './Auth'
import UserController from './UserController'
import Settings from './Settings'
import DivisionController from './DivisionController'
import DistrictController from './DistrictController'
import UserGroupController from './UserGroupController'
import AreaController from './AreaController'
import AreaBrowseController from './AreaBrowseController'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    UserController: Object.assign(UserController, UserController),
    Settings: Object.assign(Settings, Settings),
    DivisionController: Object.assign(DivisionController, DivisionController),
    DistrictController: Object.assign(DistrictController, DistrictController),
    UserGroupController: Object.assign(UserGroupController, UserGroupController),
    AreaController: Object.assign(AreaController, AreaController),
    AreaBrowseController: Object.assign(AreaBrowseController, AreaBrowseController),
}

export default Controllers