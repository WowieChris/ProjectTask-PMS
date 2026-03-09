import AuthenticatedSessionController from './AuthenticatedSessionController'
import EmailVerificationPromptController from './EmailVerificationPromptController'
import VerifyEmailController from './VerifyEmailController'
import EmailVerificationNotificationController from './EmailVerificationNotificationController'
import ConfirmedPasswordStatusController from './ConfirmedPasswordStatusController'

const Controllers = {
    AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
    EmailVerificationPromptController: Object.assign(EmailVerificationPromptController, EmailVerificationPromptController),
    VerifyEmailController: Object.assign(VerifyEmailController, VerifyEmailController),
    EmailVerificationNotificationController: Object.assign(EmailVerificationNotificationController, EmailVerificationNotificationController),
    ConfirmedPasswordStatusController: Object.assign(ConfirmedPasswordStatusController, ConfirmedPasswordStatusController),
}

export default Controllers