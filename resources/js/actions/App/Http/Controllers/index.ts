import Auth from './Auth'
import UserController from './UserController'
import Settings from './Settings'
import locationController from './locationController'
import DistrictController from './DistrictController'
import DivisionController from './DivisionController'
import AreaController from './AreaController'
import BranchController from './BranchController'
import UserGroupController from './UserGroupController'
import DesignationsController from './DesignationsController'
import MyLocationController from './MyLocationController'
import NavigationController from './NavigationController'
import EngineerAssignmentController from './EngineerAssignmentController'
import SeniorFieldAssignmentController from './SeniorFieldAssignmentController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
locationController: Object.assign(locationController, locationController),
DistrictController: Object.assign(DistrictController, DistrictController),
DivisionController: Object.assign(DivisionController, DivisionController),
AreaController: Object.assign(AreaController, AreaController),
BranchController: Object.assign(BranchController, BranchController),
UserGroupController: Object.assign(UserGroupController, UserGroupController),
DesignationsController: Object.assign(DesignationsController, DesignationsController),
MyLocationController: Object.assign(MyLocationController, MyLocationController),
NavigationController: Object.assign(NavigationController, NavigationController),
EngineerAssignmentController: Object.assign(EngineerAssignmentController, EngineerAssignmentController),
SeniorFieldAssignmentController: Object.assign(SeniorFieldAssignmentController, SeniorFieldAssignmentController),
}

export default Controllers