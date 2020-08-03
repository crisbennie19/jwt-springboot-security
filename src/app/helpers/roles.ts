export function verifyRole(rolename){
     let onlineUser = JSON.parse(localStorage.getItem('adminUser') )

     var specific = onlineUser.data.roles.find( role => {
      return role == rolename
    })

    return specific
}

export class menuList{

  public static menu = [
    {route:'/dashboard',icon:'dashboard', name:'Dashboard', role:["ADMINISTRATOR","ACCOUNT"]},
    {route:'/wallet',icon:'account_balance_wallet', name:'Wallet', role:["ADMINISTRATOR","ACCOUNT"]},
    {route:'/transactions',icon:'compare_arrows', name:'Transactions', role:["ADMINISTRATOR","ACCOUNT"]},
    // {route:'/charges',icon:'import_export', name:'Charges'},
    {route:'/interests',icon:'monetization_on', name:'Interests', role:["ADMINISTRATOR"]},
    {route:'/messages',icon:'email', name:'Messages', role:["ADMINISTRATOR"]},
    {route:'/users',icon:'account_box', name:'Users', role:["ADMINISTRATOR","SUPPORT"]},
    {route:'/credit',icon:'credit_card', name:'Credit', role:["ADMINISTRATOR","BANK","ACCOUNT"]},
    {route:'/savings',icon:'save_alt', name:'Savings', role:["ADMINISTRATOR","BANK","ACCOUNT"]},
    {route:'/logs',icon:'receipt', name:'Logs', role:["ADMINISTRATOR"]},
    {route:'/referrals',icon:'insert_comment', name:'Referral', role:["ADMINISTRATOR","SUPPORT"]},
    {route:'/reports',icon:'report', name:'Report', role:["ADMINISTRATOR","ACCOUNT"]},
    {route:'/support',icon:'live_help', name:'Support', role:["ADMINISTRATOR","SUPPORT"]},
    {route:'/settings',icon:'settings', name:'Settings', role:["ADMINISTRATOR","BANK"]}
  ]

}