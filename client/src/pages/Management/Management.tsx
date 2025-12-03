import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LayoutTemplate, Plus } from 'lucide-react';
import { AddModule } from './components';
import { useState } from 'react';

export const Management = () => {
  const [showAddModule, setShowAddModule] = useState(false);

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
          <AddModule setShowAddModule={setShowAddModule} />
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
                  >
                    <Plus />
                    Agregar Módulo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
