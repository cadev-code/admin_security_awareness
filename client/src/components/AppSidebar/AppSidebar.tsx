import { ChevronUp, CircleUserRound, LogOut, Paintbrush } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useCurrentUser } from '@/hooks';
import { useIsFetching } from '@tanstack/react-query';
import { Button } from '../ui/button';

const items = [
  {
    title: 'Intranet',
    url: '/management',
    icon: Paintbrush,
  },
];

export const AppSidebar = () => {
  const { data: user } = useCurrentUser();

  const isFetching = useIsFetching();

  return (
    <Sidebar className="select-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Security Awareness</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-1">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer py-4">
                  <CircleUserRound />
                  <span className="truncate">{user?.username}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  onClick={() => console.log('Logout')}
                  disabled={isFetching > 0}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Cerrar Sesión</span>
                    <LogOut className="text-red-600" />
                  </DropdownMenuItem>
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
