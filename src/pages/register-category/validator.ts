import * as yup from 'yup';

export interface InputInterface {
  title: string;
  shortDescription: string;
  guide: string;
}

export default async function validateInput(
  data: InputInterface,
): Promise<InputInterface | yup.ValidationError> {
  const schema = yup.object().shape({
    title: yup.string().required('O título da categoria é obrigatório'),
    shortDescription: yup.string().required('A descrição é obrigatória'),
    guide: yup.string().required('O guia é obrigatório'),
  });

  return await schema.validate(data);
}
