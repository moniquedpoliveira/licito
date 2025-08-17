"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const userSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  role: z.enum([
    "ADMINISTRADOR",
    "GESTOR_CONTRATO",
    "FISCAL_ADMINISTRATIVO",
    "FISCAL_TECNICO",
    "ORDENADOR_DESPESAS",
  ]),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: any;
  onSubmit: (data: UserFormData) => Promise<void>;
}

const roleOptions = [
  { value: "ADMINISTRADOR", label: "Administrador" },
  { value: "GESTOR_CONTRATO", label: "Gestor de Contrato" },
  { value: "FISCAL_ADMINISTRATIVO", label: "Fiscal Administrativo" },
  { value: "FISCAL_TECNICO", label: "Fiscal Técnico" },
  { value: "ORDENADOR_DESPESAS", label: "Ordenador de Despesas" },
];

export function UserForm({ open, onOpenChange, user, onSubmit }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "GESTOR_CONTRATO",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("password", ""); // Não preencher senha ao editar
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const handleFormSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {user ? "Editar Usuário" : "Adicionar Usuário"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Edite as informações do usuário abaixo."
              : "Preencha as informações para criar um novo usuário."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Digite o nome completo"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Digite o email"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Função</Label>
            <Select
              onValueChange={(value) => setValue("role", value as any)}
              defaultValue={user?.role || "GESTOR_CONTRATO"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {user ? "Nova Senha (deixe em branco para manter)" : "Senha"}
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder={
                user ? "Digite a nova senha" : "Digite a senha"
              }
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : user ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
