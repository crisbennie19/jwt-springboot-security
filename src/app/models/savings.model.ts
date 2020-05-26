export interface Interest {
  active: boolean,
  datecreated:string,
  rate: number,
  savingtype: {
    id: number
  }
}

export interface Savingstype {
    minday: number,
    maxday: number,
    name: string,
    points: number
  }
  export interface verifyPerformance{
    bvn:string
  }
  export interface issueLog{
    category: string,
    description: string,
    initiatoremail: string
  }
  export interface newIssue{
  description: string,
  issuesid: number,
  postedbyemail: string,
  status: string
  }