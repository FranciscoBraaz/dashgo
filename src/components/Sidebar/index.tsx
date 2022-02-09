import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });
  const { isOpen, onClose } = useSidebarDrawer();

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink href="/dashboard" icon={RiDashboardLine}>
            Dashboard
          </NavLink>
          <NavLink href="/users" icon={RiContactsLine}>
            Usuário
          </NavLink>
        </NavSection>
        <NavSection title="AUTOMAÇÃO">
          <NavLink
            style={{ pointerEvents: 'none', opacity: 0.5 }}
            href="/"
            icon={RiInputMethodLine}
          >
            Formulários
          </NavLink>
          <NavLink
            style={{ pointerEvents: 'none', opacity: 0.5 }}
            href="/"
            icon={RiGitMergeLine}
          >
            Automação
          </NavLink>
        </NavSection>
      </Stack>
    </Box>
  );
}
