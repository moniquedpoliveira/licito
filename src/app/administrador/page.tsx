"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  DollarSign,
  Clock,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UserForm } from "@/components/user-form";
import { PasswordChangeDialog } from "@/components/password-change-dialog";

// Dados mockados para demonstração
const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    role: "ADMINISTRADOR",
    status: "ATIVO",
    createdAt: "2024-01-15T00:00:00Z",
    lastLogin: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    role: "GESTOR_CONTRATO",
    status: "ATIVO",
    createdAt: "2024-01-10T00:00:00Z",
    lastLogin: "2024-01-19T14:20:00Z",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@empresa.com",
    role: "FISCAL_ADMINISTRATIVO",
    status: "ATIVO",
    createdAt: "2024-01-05T00:00:00Z",
    lastLogin: "2024-01-18T09:15:00Z",
  },
  {
    id: "4",
    name: "Ana Oliveira",
    email: "ana.oliveira@empresa.com",
    role: "FISCAL_TECNICO",
    status: "INATIVO",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T16:45:00Z",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@empresa.com",
    role: "ORDENADOR_DESPESAS",
    status: "ATIVO",
    createdAt: "2024-01-20T00:00:00Z",
    lastLogin: "2024-01-21T11:30:00Z",
  },
];

const mockStats = {
  total: mockUsers.length,
  ativos: mockUsers.filter((u) => u.status === "ATIVO").length,
  inativos: mockUsers.filter((u) => u.status === "INATIVO").length,
  recentes: mockUsers.filter((u) => {
    const createdAt = new Date(u.createdAt);
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }).length,
};

// Funções mockadas para simular API
const getUsersStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockStats;
};

const getUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockUsers;
};

const createUser = async (userData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newUser = {
    id: (mockUsers.length + 1).toString(),
    ...userData,
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };
  mockUsers.push(newUser);
  return newUser;
};

const updateUser = async (id: string, userData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const userIndex = mockUsers.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return mockUsers[userIndex];
  }
  throw new Error("Usuário não encontrado");
};

const toggleUserStatus = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = mockUsers.find((u) => u.id === id);
  if (user) {
    user.status = user.status === "ATIVO" ? "INATIVO" : "ATIVO";
    return user;
  }
  throw new Error("Usuário não encontrado");
};

const changeUserPassword = async (id: string, newPassword: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simular alteração de senha
  return { success: true };
};

const deleteUser = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const userIndex = mockUsers.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
    return { success: true };
  }
  throw new Error("Usuário não encontrado");
};

export default function AdministradorDashboard() {
  const queryClient = useQueryClient();
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["users-stats"],
    queryFn: getUsersStats,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleCreateUser = async (userData: any) => {
    try {
      await createUser(userData);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users-stats"] });
      setIsUserFormOpen(false);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleUpdateUser = async (userData: any) => {
    if (!editingUser) return;
    try {
      await updateUser(editingUser.id, userData);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditingUser(null);
      setIsUserFormOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleUserStatus(id);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users-stats"] });
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    if (!selectedUserId) return;
    try {
      await changeUserPassword(selectedUserId, newPassword);
      setIsPasswordDialogOpen(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      await deleteUser(id);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users-stats"] });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const getRoleLabel = (role: string) => {
    const labels: { [key: string]: string } = {
      ADMINISTRADOR: "Administrador",
      GESTOR_CONTRATO: "Gestor de Contrato",
      FISCAL_ADMINISTRATIVO: "Fiscal Administrativo",
      FISCAL_TECNICO: "Fiscal Técnico",
      ORDENADOR_DESPESAS: "Ordenador de Despesas",
    };
    return labels[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      ADMINISTRADOR: "bg-red-100 text-red-800",
      GESTOR_CONTRATO: "bg-blue-100 text-blue-800",
      FISCAL_ADMINISTRATIVO: "bg-green-100 text-green-800",
      FISCAL_TECNICO: "bg-yellow-100 text-yellow-800",
      ORDENADOR_DESPESAS: "bg-purple-100 text-purple-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    return status === "ATIVO"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex h-20 shrink-0 items-center gap-4 border-b bg-white px-6 shadow-sm">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Administração</h1>
          <p className="text-lg text-gray-600 font-medium">
            Gerencie todos os usuários do sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="flex items-center gap-2"
            onClick={() => setIsUserFormOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Adicionar Usuário
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Visão Geral - Cards de Estatísticas */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Visão Geral dos Usuários
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Usuários
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "..." : stats?.total || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  usuários cadastrados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuários Ativos
                </CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {statsLoading ? "..." : stats?.ativos || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  ativos no sistema
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuários Inativos
                </CardTitle>
                <UserX className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {statsLoading ? "..." : stats?.inativos || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  inativos no sistema
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuários Recentes
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {statsLoading ? "..." : stats?.recentes || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  últimos 30 dias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lista de Usuários */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários do Sistema</CardTitle>
            <CardDescription>
              Gerencie todos os usuários e suas permissões
            </CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="text-center py-8">Carregando usuários...</div>
            ) : (
              <div className="space-y-4">
                {users?.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-semibold text-lg">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status === "ATIVO" ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <span>
                          Criado em:{" "}
                          {format(new Date(user.createdAt), "dd/MM/yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                        {user.lastLogin && (
                          <>
                            <span className="mx-2">•</span>
                            <span>
                              Último login:{" "}
                              {format(new Date(user.lastLogin), "dd/MM/yyyy HH:mm", {
                                locale: ptBR,
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingUser(user);
                          setIsUserFormOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setIsPasswordDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "ATIVO" ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Usuário */}
      <UserForm
        open={isUserFormOpen}
        onOpenChange={setIsUserFormOpen}
        user={editingUser}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
      />

      {/* Diálogo de Alteração de Senha */}
      <PasswordChangeDialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        userId={selectedUserId || ""}
        userName="Usuário"
        onSubmit={handleChangePassword}
      />
    </div>
  );
}
