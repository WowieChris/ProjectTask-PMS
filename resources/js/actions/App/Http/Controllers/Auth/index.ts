import OtpController from './OtpController'
import PasswordSetupController from './PasswordSetupController'
const Auth = {
    OtpController: Object.assign(OtpController, OtpController),
PasswordSetupController: Object.assign(PasswordSetupController, PasswordSetupController),
}

export default Auth