import * as Yup from 'yup';


interface Tools {
  tool: string;
  level: 'Não tenho' | 'Básico' | 'Intermediário' | 'Avançado';
}

export const initialValuesOportunity = {
  jobTitle: '',
  contractType: '',
  managedJob: '' as 'Sim' | 'Não',
  requirements: [],
  jobDescription: '',
  experienceLevel: '',
  benefits: [],
  location: '',
  workSchedule: '',
  availablePositions: '',
  expectedStartDate: '',
  companyInfo: {
    name: '',
    industry: ''
  },
  mainResponsibilities: [],
  toolsAndSoftware: [] as Tools[],
  publicationDate: new Date().toISOString().split('T')[0],
  applicationDeadline: '',
  isAvailable: true,
};

const ToolsSchema = Yup.object().shape({
  tool: Yup.string().required('O nome da habilidade é obrigatório.'),
  level: Yup.string()
    .oneOf(['Não tenho', 'Básico', 'Intermediário', 'Avançado'], 'Nível inválido')
    .required('O nível da habilidade é obrigatório.')
});

const JobSchema = Yup.object().shape({
  jobTitle: Yup.string()
    .required('O título do trabalho é obrigatório.'),
  contractType: Yup.string()
    .required('O tipo de contrato é obrigatório.'),
  requirements: Yup.array()
    .of(Yup.string().required('Cada ferramenta ou software deve ser uma string válida.'))
    .required('As ferramentas e softwares são obrigatórios.'),
  jobDescription: Yup.string()
    .required('A descrição do trabalho é obrigatória.'),
  experienceLevel: Yup.string()
    .required('O nível de experiência é obrigatório.'),
  benefits: Yup.array()
    .of(Yup.string().required('Cada benefício deve ser uma string válida.'))
    .required('Os benefícios são obrigatórios.'),
  location: Yup.string()
    .required('O local de trabalho é obrigatório.'),
  workSchedule: Yup.string()
    .required('O horário de trabalho é obrigatório.'),
  availablePositions: Yup.number()
    .required('O número de vagas disponíveis é obrigatório.')
    .min(1, 'Deve haver pelo menos uma vaga disponível.'),
  expectedStartDate: Yup.date()
    .required('A data esperada para início é obrigatória.'),
  companyInfo: Yup.object().shape({
    name: Yup.string()
      .required('O nome da empresa é obrigatório.'),
    industry: Yup.string()
      .required('O setor da empresa é obrigatório.'),
  }),
  mainResponsibilities: Yup.array()
    .of(Yup.string().required('Cada responsabilidade deve ser uma string válida.'))
    .required('As responsabilidades principais são obrigatórias.'),
  toolsAndSoftware: Yup.array()
    .of(ToolsSchema)
    .required('Informe a ferramenta ou sofware, são obrigatórios.'),
  publicationDate: Yup.date()
    .required('A data de publicação é obrigatória.'),
  applicationDeadline: Yup.date()
    .required('O prazo para candidaturas é obrigatório.')
    .min(Yup.ref('expectedStartDate'), 'O prazo para candidaturas deve ser após a data Previsão de inicio.'),
  isAvailable: Yup.boolean(),
});

export default JobSchema;
