import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GripVertical, LayoutTemplate, Plus } from 'lucide-react';
import { AddModule } from './components';
import { useState } from 'react';
import { useModules } from '@/hooks';

export const Management = () => {
  const [showAddModule, setShowAddModule] = useState(false);

  const { data, isPending } = useModules();

  console.log(data);

  return (
    <div className="min-h-screen w-full">
      <header className="border-b bg-card">
        <div className="container px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5" />
            <div>
              <h1 className="text-xl font-bold">Administrador Intranet</h1>
              <p className="text-sm text-muted-foreground">
                Administra el contenido de la plataforma
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8 space-y-6">
        {showAddModule ? (
          <AddModule closeForm={() => setShowAddModule(false)} />
        ) : (
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>Módulos</CardTitle>
              <CardDescription>
                Gestiona los módulos disponibles en la intranet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setShowAddModule(true)}
                    disabled={isPending}
                  >
                    <Plus />
                    Agregar Módulo
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {data?.data.map((module) => (
                    <div className="flex flex-row gap-2 items-center">
                      <GripVertical className="text-gray-500 cursor-grab" />
                      <div className="border rounded px-4 py-2 bg-background w-full flex items-center gap-4">
                        <h3 className="font-medium">{module.title}</h3>
                        <Button
                          size="sm"
                          className="cursor-pointer bg-gray-600 hover:bg-gray-500"
                        >
                          Gestionar Contenido
                        </Button>
                        <Button
                          size="sm"
                          className="cursor-pointer bg-gray-600 hover:bg-gray-500"
                        >
                          Editar Módulo
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
