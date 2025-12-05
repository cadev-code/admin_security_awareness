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
import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';

export const Module = ({
  module,
  closeModule,
}: {
  module: ModuleType;
  closeModule: () => void;
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="w-full space-y-2">
      <Button variant="link" onClick={closeModule}>
        <ArrowLeft />
        Regresar
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{module.title}</CardTitle>
          <CardDescription>Gestionar contenido del módulo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {!showAddForm && (
                <Button
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus />
                  Agregar Contenido
                </Button>
              )}
            </div>
            {showAddForm && (
              <AddContent
                type={module.type as 'VIDEO' | 'AUDIO' | 'IMAGE'}
                closeForm={() => setShowAddForm(false)}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
