let subscriptions = {
    'loginUser': [],
    'notification': [],
    'hide': []
};

export default {
    events: {
        loginUser: 'loginUser',
        notification: 'notification',
        hide: 'hide'
    },
    subscribe: (eventName, fn) => 
        subscriptions[eventName].push(fn),
    trigger: (eventName, data) => 
        subscriptions[eventName].forEach(fn => fn(data))
}