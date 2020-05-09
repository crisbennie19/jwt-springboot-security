export function verifyRole(rolename){
     let onlineUser = JSON.parse(localStorage.getItem('adminUser') )

     var specific = onlineUser.data.roles.find( role => {
      return role == rolename
    })

    return specific
}