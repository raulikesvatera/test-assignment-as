import { Store } from 'react-notifications-component';

class Notification {
    static addNotification(message, type = 'info', title = null) {
        Store.addNotification({
            title: title || this._getDefaultTitle(type),
            message: message,
            type: type,
            container: "top-right",
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    static _getDefaultTitle(type) {
        const titles = {
            success: 'Success',
            danger: 'Error',
            warning: 'Warning',
            info: 'Information',
            default: 'Notification'
        };
        return titles[type] || titles.default;
    }

    static success(message, title = null) {
        this.addNotification(message, 'success', title);
    }

    static error(message, title = null) {
        this.addNotification(message, 'danger', title);
    }

    static warning(message, title = null) {
        this.addNotification(message, 'warning', title);
    }

    static info(message, title = null) {
        this.addNotification(message, 'info', title);
    }
}

export default Notification;
