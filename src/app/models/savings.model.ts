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