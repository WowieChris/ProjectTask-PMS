import Auth from './Auth'
import UserController from './UserController'
import Settings from './Settings'
import SavedLocationController from './SavedLocationController'
import Api from './Api'
import locationController from './locationController'
import DistrictController from './DistrictController'
import DivisionController from './DivisionController'
import AreaController from './AreaController'
import BranchController from './BranchController'
import UserGroupController from './UserGroupController'
import DesignationsController from './DesignationsController'
import MyLocationController from './MyLocationController'
import NavigationController from './NavigationController'
import ScheduledLocationMoveController from './ScheduledLocationMoveController'
import EngineerAssignmentController from './EngineerAssignmentController'
import SeniorFieldAssignmentController from './SeniorFieldAssignmentController'
import EARequestController from './EARequestController'
import EAHVAController from './EAHVAController'
import ScheduledTransferController from './ScheduledTransferController'
import AssetController from './AssetController'
import AssetDashboardController from './AssetDashboardController'
import AssetCategoryController from './AssetCategoryController'
import AssetAssignmentController from './AssetAssignmentController'
import AssetTransferController from './AssetTransferController'
import AssetMaintenanceController from './AssetMaintenanceController'
import AssetLogController from './AssetLogController'
import EmployeeController from './EmployeeController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
SavedLocationController: Object.assign(SavedLocationController, SavedLocationController),
Api: Object.assign(Api, Api),
locationController: Object.assign(locationController, locationController),
DistrictController: Object.assign(DistrictController, DistrictController),
DivisionController: Object.assign(DivisionController, DivisionController),
AreaController: Object.assign(AreaController, AreaController),
BranchController: Object.assign(BranchController, BranchController),
UserGroupController: Object.assign(UserGroupController, UserGroupController),
DesignationsController: Object.assign(DesignationsController, DesignationsController),
MyLocationController: Object.assign(MyLocationController, MyLocationController),
NavigationController: Object.assign(NavigationController, NavigationController),
ScheduledLocationMoveController: Object.assign(ScheduledLocationMoveController, ScheduledLocationMoveController),
EngineerAssignmentController: Object.assign(EngineerAssignmentController, EngineerAssignmentController),
SeniorFieldAssignmentController: Object.assign(SeniorFieldAssignmentController, SeniorFieldAssignmentController),
EARequestController: Object.assign(EARequestController, EARequestController),
EAHVAController: Object.assign(EAHVAController, EAHVAController),
ScheduledTransferController: Object.assign(ScheduledTransferController, ScheduledTransferController),
AssetController: Object.assign(AssetController, AssetController),
AssetDashboardController: Object.assign(AssetDashboardController, AssetDashboardController),
AssetCategoryController: Object.assign(AssetCategoryController, AssetCategoryController),
AssetAssignmentController: Object.assign(AssetAssignmentController, AssetAssignmentController),
AssetTransferController: Object.assign(AssetTransferController, AssetTransferController),
AssetMaintenanceController: Object.assign(AssetMaintenanceController, AssetMaintenanceController),
AssetLogController: Object.assign(AssetLogController, AssetLogController),
EmployeeController: Object.assign(EmployeeController, EmployeeController),
}

export default Controllers