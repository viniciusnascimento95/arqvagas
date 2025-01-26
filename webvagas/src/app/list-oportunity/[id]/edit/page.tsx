'use client'
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { FieldArray, Form, Formik } from "formik";
import { CalendarIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobSchema from './opotinity.schema';

interface jobOportunity {
  id: string,
  jobTitle: string,
  contractType: string,
  requirements: [],
  jobDescription: string,
  experienceLevel: string,
  benefits: [],
  location: string,
  workSchedule: string,
  availablePositions: string,
  expectedStartDate: Date,
  companyInfo: {
    name: string,
    industry: string,
  },
  mainResponsibilities: [],
  toolsAndSoftware: [],
  publicationDate: Date,
  applicationDeadline: '',
  isAvailable: true,
}

export default function Edit() {
  const { id } = useParams();
  const router = useRouter()
  const [job, setJob] = useState<jobOportunity | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (id) {
      api.get(`oportunity/${id}`).then((res) => {
        console.log('=>res --->', res.data);
        setJob(res.data)
      })
    }
  }, [id])


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edição Oportunidade - {job?.jobTitle} </h1>
      <Formik
        enableReinitialize
        initialValues={
          {
            id: job?.id || '',
            jobTitle: job?.jobTitle || '',
            contractType: job?.contractType || '',
            requirements: job?.requirements || [],
            jobDescription: job?.jobDescription || '',
            experienceLevel: job?.experienceLevel || '',
            benefits: job?.benefits || [],
            location: job?.location || '',
            workSchedule: job?.workSchedule || '',
            availablePositions: job?.availablePositions || '',
            expectedStartDate: job?.expectedStartDate || '',
            companyInfo: {
              name: job?.companyInfo.name || '',
              industry: job?.companyInfo.industry || '',

            },
            mainResponsibilities: job?.mainResponsibilities || [],
            toolsAndSoftware: job?.toolsAndSoftware || [],
            publicationDate: job?.publicationDate || new Date().toISOString().split('T')[0],
            applicationDeadline: job?.applicationDeadline || '',
            isAvailable: job?.isAvailable || false,
          }
        }
        validationSchema={JobSchema}
        onSubmit={async (values, { resetForm }) => {
          const response = await api.patch('/oportunity/' + values.id, {
            ...values,
            companyInfo: {
              name: values.companyInfo.name,
              industry: values.companyInfo.industry,
            }
          })

          if (response.status === 200) {
            toast({
              className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
              ),
              variant: 'default',
              title: "Oportunidade atualizada com sucesso!",
              description: "Você pode visualizar a oportunidade atualizada na lista de oportunidades.",
            })
            resetForm();
            router.push('/list-oportunity');
          }
        }}
      >
        {({ errors, touched, values, handleChange, handleBlur, isValid, setFieldValue }) => (
          <Form>
            {/* Título do Formulário */}
            <p className="text-gray-600">Você está editando as informações.</p>

            <div className="grid grid-cols-4 gap-4 my-5">
              {/* Campo: Título da vaga */}
              <div className="col-span-2">
                <label htmlFor="jobTitle" className="block text-sm font-medium">
                  Título da vaga
                </label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  placeholder="Ex.: Desenvolvedor Frontend"
                  value={values.jobTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2"
                />
                {touched.jobTitle && errors.jobTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="availablePositions" className="block text-sm font-medium">
                  Vagas disponiveis
                </label>
                <Input
                  id="availablePositions"
                  name="availablePositions"
                  type="number"
                  placeholder="Ex.: 1"
                  value={values.availablePositions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2"
                />
                {touched.availablePositions && errors.availablePositions && (
                  <p className="text-red-500 text-sm mt-1">{errors.availablePositions}</p>
                )}
              </div>

              {/* Campo: Título da vaga */}
              <div className="col-span-1">
                <label htmlFor="contractType" className="block text-sm font-medium">
                  Tipo de contrato
                </label>
                <Input
                  id="contractType"
                  name="contractType"
                  type="text"
                  placeholder="CLT | PJ | Estágio"
                  value={values.contractType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2"
                />
                {touched.contractType && errors.contractType && (
                  <p className="text-red-500 text-sm mt-1">{errors.contractType}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-5">
              <div className="col-span-1">
                <label htmlFor="expectedStartDate" className="block text-sm font-medium">
                  Previsão de inicio
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !values.expectedStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {values.expectedStartDate ? format(values.expectedStartDate, "dd/MM/yyyy").toLocaleLowerCase() : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={ptBR}
                      lang='pt-BR'
                      mode="single"
                      selected={new Date(values.expectedStartDate)}
                      onSelect={(item) => {
                        setFieldValue("expectedStartDate", item)
                        console.log('=>iteasdfasdfasdfm --->', item);
                        console.log('=>item --->', typeof item);
                      }}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {touched.expectedStartDate && errors.expectedStartDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expectedStartDate}</p>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="applicationDeadline" className="block text-sm font-medium">
                  Prazo para aplicação
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        errors.applicationDeadline && "border-red-500"
                      )}
                    >
                      <CalendarIcon />
                      {values.applicationDeadline ? format(values.applicationDeadline, "dd/MM/yyyy").toLocaleLowerCase() : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={ptBR}
                      lang='pt-BR'
                      mode="single"
                      selected={new Date(values.applicationDeadline)}
                      onSelect={(item) => {
                        setFieldValue("applicationDeadline", item)
                        console.log('=>applicationDeadline --->', item);

                      }}
                      disabled={(date) =>
                        date < new Date() || date < values.expectedStartDate
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.applicationDeadline && (
                  <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline}</p>
                )}
              </div>

              <div className="col-span-1">
                <label htmlFor="workSchedule" className="block text-sm font-medium">
                  Horário de trabalho
                </label>
                <Input
                  id="workSchedule"
                  name="workSchedule"
                  type="text"
                  placeholder="Horário de trabalho exemplo: 8h/dia"
                  value={values.workSchedule}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2"
                />
                {touched.workSchedule && errors.workSchedule && (
                  <p className="text-red-500 text-sm mt-1">{errors.workSchedule}</p>
                )}
              </div>
            </div>

            {/* Campo: Nome da Empresa */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium">
                  Nome da Empresa
                </label>
                <Input
                  id="companyInfo.name"
                  name="companyInfo.name"
                  type="text"
                  placeholder="Ex.: TechCorp"
                  value={values.companyInfo.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2"
                />
                {touched.companyInfo && errors.companyInfo && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyInfo.name}</p>
                )}
              </div>
              {/* Campo: Setor */}
              <div>
                <label htmlFor="companyInfo.industry" className="block text-sm font-medium">
                  Setor
                </label>
                <Input
                  id="companyInfo.industry"
                  name="companyInfo.industry"
                  type="text"
                  placeholder="Ex.: Tecnologia"
                  value={values.companyInfo.industry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2"
                />
                {touched.companyInfo && errors.companyInfo && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyInfo.industry}</p>
                )}
              </div>
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium">
                  Experiência
                </label>
                <Input
                  id="experienceLevel"
                  name="experienceLevel"
                  type="text"
                  placeholder="Ex.: Junior | Pleno | Sênior"
                  value={values.experienceLevel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2"
                />
                {touched.experienceLevel && errors.experienceLevel && (
                  <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>
                )}
              </div>
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
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-2"
              />
              {touched.location && errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* {JSON.stringify(values, null, 3)} */}

            {/* Campo: Descrição do Trabalho */}
            <div className='my-4'>
              <label htmlFor="jobDescription" className="block text-sm font-medium">
                Descrição do Trabalho
              </label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Descreva as responsabilidades e expectativas do cargo"
                value={values.jobDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-2"
              />
              {touched.jobDescription && errors.jobDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobDescription}
                </p>
              )}
            </div>

            {/* Campo: Requisitos */}
            <div>
              {values.requirements.length > 0 && (
                <label htmlFor="requirements" className="block text-sm font-medium">
                  Requisitos
                </label>
              )}

              <FieldArray
                name="requirements"
                render={arrayHelpers => (
                  <div>
                    {/* Renderiza cada campo do array */}
                    {values.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-4 mb-2">
                        <Input
                          type="text"
                          name={`requirements[${index}]`}
                          value={requirement}
                          placeholder={`Requisito ${index + 1}`}
                          onChange={handleChange}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // Remove o campo
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    {/* Botão para adicionar novo requisito */}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push('')} // Adiciona um campo vazio
                      className="w-full text-blue-500 hover:text-blue-700 mt-2"

                    // className=" bg-blue-600 hover:bg-blue-700"
                    >
                      Adicionar Requisito
                    </button>
                  </div>
                )}
              />
              {touched.requirements && errors.requirements && (
                <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>
              )}
            </div>

            {/* Campo: Beneficios */}
            <div>
              {values.benefits.length > 0 && (<label htmlFor="benefits" className="block text-sm font-medium">
                Beneficios
              </label>)}

              <FieldArray
                name="benefits"
                render={arrayHelpers => (
                  <div>
                    {/* Renderiza cada campo do array */}
                    {values.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-4 mb-2">
                        <Input
                          type="text"
                          name={`benefits[${index}]`}
                          value={benefit}
                          placeholder={`Requisito ${index + 1}`}
                          onChange={handleChange}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // Remove o campo
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    {/* Botão para adicionar novo requisito */}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push('')} // Adiciona um campo vazio
                      className="w-full text-blue-500 hover:text-blue-700 mt-2"
                    >
                      Adicionar Beneficio
                    </button>
                  </div>
                )}
              />
              {touched.benefits && errors.benefits && (
                <p className="text-red-500 text-sm mt-1">{errors.benefits}</p>
              )}
            </div>

            {/* Campo: toolsAndSoftware */}
            <div className='my-5'>
              {values.toolsAndSoftware.length > 0 && (<label htmlFor="toolsAndSoftware" className="block text-sm font-medium">
                Ferramentas de trabalho
              </label>)}

              <FieldArray
                name="toolsAndSoftware"
                render={arrayHelpers => (
                  <div>
                    {/* Renderiza cada campo do array */}
                    {values.toolsAndSoftware.map((tool, index) => (
                      <div key={index} className="flex items-center gap-4 mb-2">
                        <Input
                          type="text"
                          name={`toolsAndSoftware[${index}]`}
                          value={tool}
                          placeholder={`Ferramentas de trabalho ${index + 1}`}
                          onChange={handleChange}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // Remove o campo
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    {/* Botão para adicionar novo requisito */}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push('')} // Adiciona um campo vazio
                      className="w-full text-blue-500 hover:text-blue-700 mt-2"
                    >
                      Adicionar Ferramenta
                    </button>
                  </div>
                )}
              />
              {touched.toolsAndSoftware && errors.toolsAndSoftware && (
                <p className="text-red-500 text-sm mt-1">{errors.toolsAndSoftware}</p>
              )}
            </div>

            {/* Campo: mainResponsibilities */}
            <div className='my-5'>
              {values.mainResponsibilities.length > 0 && (<label htmlFor="mainResponsibilities" className="block text-sm font-medium">
                Minhas responsabilidades
              </label>)}

              <FieldArray
                name="mainResponsibilities"
                render={arrayHelpers => (
                  <div>
                    {/* Renderiza cada campo do array */}
                    {values.mainResponsibilities.map((tool, index) => (
                      <div key={index} className="flex items-center gap-4 mb-2">
                        <Input
                          type="text"
                          name={`mainResponsibilities[${index}]`}
                          value={tool}
                          placeholder={`Minhas responsabilidades ${index + 1}`}
                          onChange={handleChange}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // Remove o campo
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    {/* Botão para adicionar novo requisito */}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push('')} // Adiciona um campo vazio
                      className="w-full text-blue-500 hover:text-blue-700 mt-2"
                    >
                      Adicionar Responsabilidade da vaga
                    </button>
                  </div>
                )}
              />
              {touched.mainResponsibilities && errors.mainResponsibilities && (
                <p className="text-red-500 text-sm mt-1">{errors.mainResponsibilities}</p>
              )}
            </div>

            {/* Botão de Envio */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!isValid}
            >
              Enviar
            </Button>

            {/* {JSON.stringify(errors, null, 2)} */}
          </Form>
        )}
      </Formik>


    </div>
  )
}

