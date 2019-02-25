import requester from './../infrastructure/requester'

const logout = () => {
    requester.post('user', '_logout', '', '');
    sessionStorage.clear()
    console.log('You logged out!')
}
export default logout

