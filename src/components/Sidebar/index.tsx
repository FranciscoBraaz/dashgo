import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import React from 'react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiLogoutCircleLine,
} from 'react-icons/ri';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { userLogout } = useAuth();
  const router = useRouter();
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

  async function handleLogout() {
    await userLogout();
    router.push('/');
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
        <NavSection title="">
          <Button
            variant="link"
            color="#fff"
            display="flex"
            align="center"
            onClick={handleLogout}
          >
            <Icon as={RiLogoutCircleLine} fontSize="20" />
            <Text ml="4" fontWeight="medium">
              Sair
            </Text>
          </Button>
        </NavSection>
      </Stack>
    </Box>
  );
}
