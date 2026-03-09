import Auth from './Auth'
import BrowseController from './BrowseController'
import DistrictController from './DistrictController'
import AreaController from './AreaController'
import BranchController from './BranchController'
import UserGroupController from './UserGroupController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
DivisionController: Object.assign(DivisionController, DivisionController),
DistrictController: Object.assign(DistrictController, DistrictController),
AreaController: Object.assign(AreaController, AreaController),
BranchController: Object.assign(BranchController, BranchController),
UserGroupController: Object.assign(UserGroupController, UserGroupController),
BrowseController: Object.assign(BrowseController, BrowseController),
}

export default Controllers