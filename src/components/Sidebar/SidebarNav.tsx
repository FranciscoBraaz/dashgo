import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiLogoutCircleLine,
} from 'react-icons/ri';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  const { userLogout } = useAuth();
  const router = useRouter();

  function returnUrl() {
    return '/dashboard';
  }

  async function handleLogout() {
    await userLogout();
    router.push('/');
  }

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href={returnUrl()}>
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href="/users">
          Usuário
        </NavLink>
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <NavLink
          icon={RiInputMethodLine}
          href="/"
          style={{ pointerEvents: 'none', opacity: 0.5 }}
        >
          Formulários
        </NavLink>
        <NavLink
          icon={RiGitMergeLine}
          href="/"
          style={{ pointerEvents: 'none', opacity: 0.5 }}
        >
          Automação
        </NavLink>
        <NavSection title="" style={{ display: 'flex' }}>
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
      </NavSection>
    </Stack>
  );
}
