"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, X } from "lucide-react";

const contratoSchema = z.object({
  numero: z.string().min(1, "Número do contrato é obrigatório"),
  objeto: z.string().min(10, "Objeto deve ter pelo menos 10 caracteres"),
  contratada: z.string().min(1, "Empresa contratada é obrigatória"),
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos"),
  valor: z.string().min(1, "Valor é obrigatório"),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().min(1, "Data de fim é obrigatória"),
  fiscal: z.string().min(1, "Fiscal é obrigatório"),
  modalidade: z.enum(["PREGÃO", "CONCORRÊNCIA", "DISPENSA", "INEXIGIBILIDADE"]),
  tipo: z.enum(["SERVIÇOS", "OBRAS", "COMPRAS", "TECNOLOGIA"]),
  observacoes: z.string().optional(),
});

type ContratoFormData = z.infer<typeof contratoSchema>;

export default function NovoContratoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContratoFormData>({
    resolver: zodResolver(contratoSchema),
    defaultValues: {
      modalidade: "PREGÃO",
      tipo: "SERVIÇOS",
    },
  });

  const handleFormSubmit = async (data: ContratoFormData) => {
    setIsSubmitting(true);
    try {
      // Simular envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Novo contrato:", data);
      
      // Redirecionar para o dashboard
      router.push("/");
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6 shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="flex-1">
          <h1 className="title-licito text-2xl">Novo Contrato</h1>
          <p className="text-sm text-gray-600">
            Cadastre um novo contrato público
          </p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Dados do Contrato</CardTitle>
            <CardDescription>
              Preencha todas as informações necessárias para o novo contrato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="numero">Número do Contrato *</Label>
                  <Input
                    id="numero"
                    {...register("numero")}
                    placeholder="Ex: CONTR-2024-001"
                  />
                  {errors.numero && (
                    <p className="text-sm text-red-600">{errors.numero.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modalidade">Modalidade *</Label>
                  <Select
                    onValueChange={(value) => setValue("modalidade", value as any)}
                    defaultValue="PREGÃO"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PREGÃO">Pregão</SelectItem>
                      <SelectItem value="CONCORRÊNCIA">Concorrência</SelectItem>
                      <SelectItem value="DISPENSA">Dispensa</SelectItem>
                      <SelectItem value="INEXIGIBILIDADE">Inexigibilidade</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.modalidade && (
                    <p className="text-sm text-red-600">{errors.modalidade.message}</p>
                  )}
                </div>
              </div>

              {/* Objeto */}
              <div className="space-y-2">
                <Label htmlFor="objeto">Objeto do Contrato *</Label>
                <Textarea
                  id="objeto"
                  {...register("objeto")}
                  placeholder="Descreva o objeto do contrato..."
                  rows={3}
                />
                {errors.objeto && (
                  <p className="text-sm text-red-600">{errors.objeto.message}</p>
                )}
              </div>

              {/* Empresa Contratada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contratada">Empresa Contratada *</Label>
                  <Input
                    id="contratada"
                    {...register("contratada")}
                    placeholder="Nome da empresa"
                  />
                  {errors.contratada && (
                    <p className="text-sm text-red-600">{errors.contratada.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    {...register("cnpj")}
                    placeholder="00.000.000/0000-00"
                  />
                  {errors.cnpj && (
                    <p className="text-sm text-red-600">{errors.cnpj.message}</p>
                  )}
                </div>
              </div>

              {/* Valores e Datas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor Total *</Label>
                  <Input
                    id="valor"
                    {...register("valor")}
                    placeholder="R$ 0,00"
                  />
                  {errors.valor && (
                    <p className="text-sm text-red-600">{errors.valor.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início *</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    {...register("dataInicio")}
                  />
                  {errors.dataInicio && (
                    <p className="text-sm text-red-600">{errors.dataInicio.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Fim *</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    {...register("dataFim")}
                  />
                  {errors.dataFim && (
                    <p className="text-sm text-red-600">{errors.dataFim.message}</p>
                  )}
                </div>
              </div>

              {/* Fiscal e Tipo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fiscal">Fiscal Responsável *</Label>
                  <Input
                    id="fiscal"
                    {...register("fiscal")}
                    placeholder="Nome do fiscal"
                  />
                  {errors.fiscal && (
                    <p className="text-sm text-red-600">{errors.fiscal.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Contrato *</Label>
                  <Select
                    onValueChange={(value) => setValue("tipo", value as any)}
                    defaultValue="SERVIÇOS"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SERVIÇOS">Serviços</SelectItem>
                      <SelectItem value="OBRAS">Obras</SelectItem>
                      <SelectItem value="COMPRAS">Compras</SelectItem>
                      <SelectItem value="TECNOLOGIA">Tecnologia</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipo && (
                    <p className="text-sm text-red-600">{errors.tipo.message}</p>
                  )}
                </div>
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  {...register("observacoes")}
                  placeholder="Observações adicionais..."
                  rows={3}
                />
                {errors.observacoes && (
                  <p className="text-sm text-red-600">{errors.observacoes.message}</p>
                )}
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Salvando..." : "Salvar Contrato"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
