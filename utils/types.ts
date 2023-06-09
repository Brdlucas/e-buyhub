// Interface pour définir les responses
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
  }
  
  // Interface pour le model frontend
  export interface Users {
    firstname: string
    lastname: string
    email: string
    password: string
  }

  export interface newsLetters {
    email: string
  }

  export interface contact {
    firstname: string
    lastname: string
    email: string
    title: string
    description: string
  }