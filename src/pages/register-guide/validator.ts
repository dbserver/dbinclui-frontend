import * as yup from 'yup';

export interface InputInterface {
  title: string;
  content: string;
  file: File;
}

export default async function validateInput(
  data: InputInterface,
): Promise<InputInterface | yup.ValidationError> {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required('O título é obrigatório')
      .min(1)
      .max(32, 'O título é muito grande'),
    content: yup.string().required('A descrição é obrigatória'),
    file: yup
      .mixed()
      .required('O arquivo é obrigatório'),
  });

  return await schema.validate(data);
}
