export enum UserFields {
    FirebaseUID = 'firebaseUID',
    UserType = 'userType',
    Email = 'email',
    PersonalData = 'personalData'
}

export interface User {
    [UserFields.FirebaseUID]: string;
    [UserFields.UserType]: string;
    [UserFields.Email]: string;
    [UserFields.PersonalData]: UserPersonalData;
}

export enum UserPersonalDataFields {
    Address = 'address',
    Age = 'age',
    BirthDate = 'birthDate',
    FirstName = 'firstName',
    LastName = 'lastName',
    Gender = 'gender',
    MaritalStatus = 'maritalStatus',
    Nationality = 'nationality',
}

export interface UserPersonalData {
    [UserPersonalDataFields.Address]: string;
    [UserPersonalDataFields.Age]: string;
    [UserPersonalDataFields.BirthDate]: string;
    [UserPersonalDataFields.FirstName]: string;
    [UserPersonalDataFields.LastName]: string;
    [UserPersonalDataFields.MaritalStatus]: string;
    [UserPersonalDataFields.Nationality]: string;
}

  