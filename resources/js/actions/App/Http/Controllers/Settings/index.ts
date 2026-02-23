import TwoFactorAuthenticationController from './TwoFactorAuthenticationController'
import ProfileController from './ProfileController'
import PasswordController from './PasswordController'
import TwoFactorMethodController from './TwoFactorMethodController'

const Settings = {
    TwoFactorAuthenticationController: Object.assign(TwoFactorAuthenticationController, TwoFactorAuthenticationController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    PasswordController: Object.assign(PasswordController, PasswordController),
    TwoFactorMethodController: Object.assign(TwoFactorMethodController, TwoFactorMethodController),
}

export default Settings