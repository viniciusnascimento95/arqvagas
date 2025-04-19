'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/services/api';
import { FieldArray, Form, Formik } from "formik";

import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import JobSchema, { initialValuesOportunity } from './opotinity.schema';

export default function AdicionarOportunidade() {

  const router = useRouter();
  const { toast } = useToast()

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Adicionar Nova Oportunidade</h1>
      <Formik
        initialValues={initialValuesOportunity}
        validationSchema={JobSchema}
        enableReinitialize
        onSubmit={async (values, { resetForm }) => {
          const response = await api.post('/oportunity', {
            ...values,
            companyInfo: {
              name: values.companyInfo.name,
              industry: values.companyInfo.industry,
            },
            toolsAndSoftware: values.toolsAndSoftware.map((tool) => ({
              tool: tool.tool,
              level: tool.level,
            }))
          })
          if (response.status === 201) {
            toast({
              className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
              ),
              variant: 'default',
              title: "Oportunidade criada com sucesso!",
              description: "Você pode visualizar a oportunidade criada na lista de oportunidades.",
            })
            resetForm();
            router.push('/list-oportunity');
          } else {
            toast({
              className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
              ),
              variant: 'destructive',
              title: "Erro ao criar oportunidade!",
              description: "Tente novamente mais tarde.",
            })
          }
        }}
      >
        {({ errors, touched, values, handleChange, handleBlur, isValid, setFieldValue }) => (
          <Form>

            {/* Título do Formulário */}
            {/* {JSON.stringify(values, null, 3)} */}

            <p className="text-gray-600">Preencha os campos abaixo para criar uma nova vaga.</p>

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

              <div className="col-span-1">
                <label htmlFor="managedJob" className="block text-sm font-medium">
                  Vaga Gerenciada
                </label>
                <select
                  id="managedJob"
                  name="managedJob"
                  value={values.managedJob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="" disabled>Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {touched.managedJob && errors.managedJob && (
                  <p className="text-red-500 text-sm mt-1">{errors.managedJob}</p>
                )}
              </div>

              {values.managedJob === 'Não' && (
                <div className="col-span-2">
                  <label htmlFor="externalUrl" className="block text-sm font-medium">
                    Informe a url de inscrição da vaga externa
                  </label>
                  <Input
                    id="externalUrl"
                    name="externalUrl"
                    type="text"
                    placeholder="https://www.example.com"
                    value={values.externalUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2"
                  />
                  {touched.externalUrl && errors.externalUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.externalUrl}</p>
                  )}
                </div>
              )}

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
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-1 my-5">
              <div className="col-span-1">
                <label htmlFor="expectedStartDate" className="block text-sm font-medium mb-2">
                  Previsão de inicio
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        errors.expectedStartDate && "border-red-500"
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
                      onSelect={(itemData) => setFieldValue("expectedStartDate", itemData)}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {errors.expectedStartDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expectedStartDate}</p>
                )}
              </div>

              <div className="col-span-1">
                <label htmlFor="applicationDeadline" className="block text-sm font-medium mb-2">
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
                      onSelect={(itemData) => setFieldValue("applicationDeadline", itemData)}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
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
            <Separator className="my-4" />

            {/* Campo: Requisitos */}
            <div className="grid grid-cols-3 gap-4 my-5">
              <Card className='p-3'>
                <div>
                  {values.requirements.length > 0 && (
                    <label htmlFor="requirements" className="block text-sm font-medium text-center mb-3">
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
                            <Button variant="destructive"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-white hover:text-gray-300"
                            >
                              Remover
                            </Button>
                          </div>
                        ))}
                        {/* Botão para adicionar novo requisito */}
                        <Button variant="ghost"
                          type="button"
                          onClick={() => arrayHelpers.push('')} // Adiciona um campo vazio
                          className="w-full text-blue-500 hover:text-blue-700 mt-2"
                        >
                          Adicionar Requisito
                        </Button>
                      </div>
                    )}
                  />
                  {touched.requirements && errors.requirements && (
                    <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>
                  )}
                </div>
              </Card>

              {/* Campo: Beneficios */}
              <Card className='p-3'>
                <div>
                  {values.benefits.length > 0 && (<label htmlFor="benefits" className="block text-sm font-medium text-center mb-3">
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
                              placeholder={`Beneficio ${index + 1}`}
                              onChange={handleChange}
                              className="flex-1"
                            />
                            <Button variant="destructive"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-white hover:text-gray-300"
                            >
                              Remover
                            </Button>
                          </div>
                        ))}
                        {/* Botão para adicionar novo requisito */}
                        <Button variant="ghost"
                          type="button"
                          onClick={() => arrayHelpers.push('')} // Adiciona um campo vazio
                          className="w-full text-blue-500 hover:text-blue-700 mt-2"
                        >
                          Adicionar Beneficio
                        </Button>
                      </div>
                    )}
                  />
                  {touched.benefits && errors.benefits && (
                    <p className="text-red-500 text-sm mt-1">{errors.benefits}</p>
                  )}
                </div>
              </Card>

              {/* Campo: toolsAndSoftware */}
              <Card className='p-3'>
                <div>
                  {values.toolsAndSoftware.length > 0 && (<label htmlFor="toolsAndSoftware" className="block text-sm font-medium text-center mb-3">
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
                              // name={`toolsAndSoftware[${index}]`}
                              name={`toolsAndSoftware[${index}].tool`}
                              value={tool.tool}
                              placeholder={`Ferramenta ${index + 1}`}
                              onChange={handleChange}
                              className="flex-1"
                            />

                            <select
                              value={tool.level}
                              onChange={(e) => setFieldValue(`toolsAndSoftware[${index}].level`, e.target.value)}
                              className="flex h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              <option value="" disabled>Selecione o nível</option>
                              <option value="Não tenho">Não tenho</option>
                              <option value="Básico">Básico</option>
                              <option value="Intermediário">Intermediário</option>
                              <option value="Avançado">Avançado</option>
                            </select>
                            <Button variant="destructive"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-white hover:text-gray-300"
                            >
                              Remover
                            </Button>
                          </div>
                        ))}
                        {/* Botão para adicionar novo requisito */}
                        <Button variant="ghost"
                          type="button"
                          onClick={() => arrayHelpers.push({ tool: '', level: '' })} // Adiciona um campo vazio
                          className="w-full text-blue-500 hover:text-blue-700 mt-2"
                        >
                          Adicionar Ferramenta
                        </Button>
                      </div>
                    )}
                  />
                  {touched.toolsAndSoftware && errors.toolsAndSoftware && (
                    <p className="text-red-500 text-sm mt-1">
                      {Array.isArray(errors.toolsAndSoftware)
                        ? errors.toolsAndSoftware.map((error, index) => (
                          <span key={index}>
                            {typeof error === 'object' && 'skill' in error
                              ? error.tool || error.level
                              : String(error)}
                          </span>
                        ))
                        : errors.toolsAndSoftware}
                    </p>
                  )}
                </div>
              </Card>
            </div>

            <Card className='p-4'>
              {/* Campo: mainResponsibilities */}
              <div className='my-2'>
                {values.mainResponsibilities.length > 0 && (<label htmlFor="mainResponsibilities" className="block text-sm font-medium">
                  Minhas responsabilidades
                </label>)}

                <FieldArray
                  name="mainResponsibilities"
                  render={arrayHelpers => (
                    <div>
                      {/* Renderiza cada campo do array */}
                      {values.mainResponsibilities.map((tool, index) => (
                        <div key={index} className="flex items-center gap-4 my-2">
                          <Input
                            type="text"
                            name={`mainResponsibilities[${index}]`}
                            value={tool}
                            placeholder={`Responsabilidade ${index + 1}`}
                            onChange={handleChange}
                            className="flex-1"
                          />
                          <Button variant="destructive"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // Remove o campo
                            className="text-white hover:text-gray-300"
                          >
                            Remover
                          </Button>
                        </div>
                      ))}
                      {/* Botão para adicionar novo requisito */}
                      <Button variant="ghost"
                        type="button"
                        onClick={() => arrayHelpers.push('')} // Adiciona um campo vazio
                        className="w-full text-blue-500 hover:text-blue-700 mt-2"
                      >
                        Adicionar Responsabilidade
                      </Button>
                    </div>
                  )}
                />
                {touched.mainResponsibilities && errors.mainResponsibilities && (
                  <p className="text-red-500 text-sm mt-1">{errors.mainResponsibilities}</p>
                )}
              </div>
            </Card>

            {/* Botão de Envio */}
            <div className="flex justify-end">
              <Button type="submit" className="mt-5 w-40 bg-blue-600 hover:bg-blue-700"
                disabled={!isValid}
              >
                Enviar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

