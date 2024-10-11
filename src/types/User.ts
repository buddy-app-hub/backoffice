export enum UserFields {
    FirebaseUID = 'firebaseUID',
    FirstName = 'firstName',
    LastName = 'lastName',
    Gender = 'gender',
    UserType = 'userType',
    Email = 'email'
}

export interface User {
    [UserFields.FirebaseUID]: string;
    [UserFields.FirstName]: string;
    [UserFields.LastName]: string;
    [UserFields.Gender]: string;
    [UserFields.UserType]: string;
    [UserFields.Email]: string;
  }
