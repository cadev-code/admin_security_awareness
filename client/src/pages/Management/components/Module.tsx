import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type Module as ModuleType } from '@/types';
import { AddContent } from './AddContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GripVertical, Plus } from 'lucide-react';
import { useState } from 'react';
import { useModuleContent } from '@/hooks';

export const Module = ({
  module,
  closeModule,
}: {
  module: ModuleType;
  closeModule: () => void;
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const { data, isPending } = useModuleContent(module.type, String(module.id));

  return (
    <div className="w-full space-y-4">
      <Button variant="link" onClick={closeModule}>
        <ArrowLeft />
        Regresar
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{module.title}</CardTitle>
          <CardDescription>Gestionar contenido del módulo</CardDescription>
          <p className="text-sm font-semibold">
            Categoría:{' '}
            {module.type === 'VIDEO'
              ? 'Videos'
              : module.type === 'AUDIO'
                ? 'Audios'
                : 'Imágenes'}
          </p>
        </CardHeader>
        {!showAddForm && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setShowAddForm(true)}
                  disabled={isPending}
                >
                  <Plus />
                  Agregar Contenido
                </Button>
              </div>
              <div className="space-y-4">
                {data?.data.map((module) => (
                  <div className="flex flex-row gap-2 items-center">
                    <GripVertical className="text-gray-500 cursor-grab" />
                    <div className="border rounded px-4 py-2 bg-gray-50 w-full flex items-center gap-4">
                      <h3 className="font-medium">{module.title}</h3>
                      <Button
                        size="sm"
                        className="cursor-pointer bg-gray-600 hover:bg-gray-500"
                      >
                        Modificar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      {showAddForm && (
        <AddContent
          idModule={module.id}
          type={module.type as 'VIDEO' | 'AUDIO' | 'IMAGE'}
          closeForm={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};
