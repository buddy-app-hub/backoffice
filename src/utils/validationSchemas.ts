import * as yup from 'yup';

export const REQUIRED_FIELD_MESSAGE = 'Campo obligatorio';
export const MAIL_FORMAT_MESSAGE = 'Formato de mail incorrecto';

export const RequiredSchema = yup.mixed().required(REQUIRED_FIELD_MESSAGE);

export const RequiredMailSchema = yup
  .string()
  .required(REQUIRED_FIELD_MESSAGE)
  .email(MAIL_FORMAT_MESSAGE);
export const MailSchema = yup.string().email(MAIL_FORMAT_MESSAGE);
