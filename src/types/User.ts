export enum UserFields {
    FirebaseUID = 'firebaseUID',
    UserType = 'userType',
    Email = 'email',
    PersonalData = 'personalData',
    RegistrationDate = 'registrationDate',

    IsBlocked = 'isBlocked',
    IsIdentityValidated = 'isIdentityValidated',
    IsApprovedBuddy = 'isApprovedBuddy',
    IsApplicationToBeBuddyUnderReview = 'isApplicationToBeBuddyUnderReview',
}

export interface User {
    [UserFields.FirebaseUID]: string;
    [UserFields.UserType]: string;
    [UserFields.Email]: string;
    [UserFields.PersonalData]: UserPersonalData;
    [UserFields.RegistrationDate]: Date,

    [UserFields.IsBlocked]: boolean,
    [UserFields.IsIdentityValidated]: boolean,
    [UserFields.IsApprovedBuddy]: boolean,
    [UserFields.IsApplicationToBeBuddyUnderReview]: boolean,
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

  