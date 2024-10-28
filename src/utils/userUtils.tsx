import {User, UserFields, UserPersonalDataFields} from "src/types/user";

export const getFullNameUser = (user?: User) => {
  if (!user || !user[UserFields.PersonalData]) return '';

  const personalData = user[UserFields.PersonalData];

  return `${personalData[UserPersonalDataFields.FirstName]} ${personalData[UserPersonalDataFields.LastName]}`
}

export const getInitials = (string: string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

export const getInitialsByUser = (user?: User) => getInitials(getFullNameUser(user))
