'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AdicionarOportunidade() {

  // Configuração inicial do Formik
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      companyName: "",
      industry: "",
      teamSize: "",
      location: "",
      jobDescription: "",
      requirements: "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("O título do trabalho é obrigatório"),
      companyName: Yup.string().required("O nome da empresa é obrigatório"),
      industry: Yup.string().required("O setor é obrigatório"),
      teamSize: Yup.string().required("O tamanho da equipe é obrigatório"),
      location: Yup.string().required("A localização é obrigatória"),
      jobDescription: Yup.string()
        .required("A descrição do trabalho é obrigatória")
        .min(20, "A descrição deve ter pelo menos 20 caracteres"),
      requirements: Yup.string()
        .required("Os requisitos são obrigatórios")
        .min(10, "Os requisitos devem ter pelo menos 10 caracteres"),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Formulário enviado com sucesso!");
    },
  });



  // const [formData, setFormData] = useState({
  //   titulo: '',
  //   empresa: '',
  //   localizacao: '',
  //   descricao: '',
  //   requisitos: '',
  //   salario: '',
  // })


  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setFormData(prevState => ({ ...prevState, [name]: value }))
  // }


  // const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   // Aqui você pode adicionar a lógica para enviar os dados para o backend
  //   console.log(formData)
  //   // Resetar o formulário após o envio
  //   setFormData({
  //     titulo: '',
  //     empresa: '',
  //     localizacao: '',
  //     descricao: '',
  //     requisitos: '',
  //     salario: '',
  //   })
  // }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Adicionar Nova Oportunidade</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6 max-w-lg mx-auto">
        {/* Campo: Título do Trabalho */}
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium">
            Título do Trabalho
          </label>
          <Input
            id="jobTitle"
            name="jobTitle"
            type="text"
            placeholder="Ex.: Desenvolvedor Frontend"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2"
          />
          {formik.touched.jobTitle && formik.errors.jobTitle && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.jobTitle}</p>
          )}
        </div>

        {/* Campo: Nome da Empresa */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium">
            Nome da Empresa
          </label>
          <Input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="Ex.: TechCorp"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2"
          />
          {formik.touched.companyName && formik.errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.companyName}
            </p>
          )}
        </div>

        {/* Campo: Setor */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium">
            Setor
          </label>
          <Input
            id="industry"
            name="industry"
            type="text"
            placeholder="Ex.: Tecnologia"
            value={formik.values.industry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2"
          />
          {formik.touched.industry && formik.errors.industry && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.industry}</p>
          )}
        </div>

        {/* Campo: Tamanho da Equipe */}
        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium">
            Tamanho da Equipe
          </label>
          <Input
            id="teamSize"
            name="teamSize"
            type="text"
            placeholder="Ex.: 10-50 pessoas"
            value={formik.values.teamSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2"
          />
          {formik.touched.teamSize && formik.errors.teamSize && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.teamSize}</p>
          )}
        </div>

        {/* Campo: Localização */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Localização
          </label>
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="Ex.: Remoto ou São Paulo"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2"
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
          )}
        </div>

        {/* Campo: Descrição do Trabalho */}
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium">
            Descrição do Trabalho
          </label>
          <Textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Descreva as responsabilidades e expectativas do cargo"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2"
          />
          {formik.touched.jobDescription && formik.errors.jobDescription && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.jobDescription}
            </p>
          )}
        </div>

        {/* Campo: Requisitos */}
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium">
            Requisitos
          </label>
          <Textarea
            id="requirements"
            name="requirements"
            placeholder="Liste os requisitos necessários para a vaga"
            value={formik.values.requirements}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2"
          />
          {formik.touched.requirements && formik.errors.requirements && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.requirements}</p>
          )}
        </div>

        {/* Botão de Envio */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Enviar
        </Button>
      </form>

     
    </div>
  )
}

