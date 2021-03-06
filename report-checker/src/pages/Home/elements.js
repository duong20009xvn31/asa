import styled, { css } from 'styled-components'
import { Shadow1, Shadow2 } from '../../components/commons/styles/shadow'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Wrapper = styled.div`
  --width-navbar: 22%;
  --width-navbar-collapse: calc(
    var(--padding) * 2 + var(--img-size-small) * 1.5
  );
  width: var(--main-width);
  height: var(--main-height);
  min-width: var(--main-width);
  min-height: var(--main-height);
  display: flex;
  padding: var(--padding);
  background-color: var(--color-1-10);
  border-radius: var(--border-radius-1);

  ${Shadow1}
`
export const NavbarArea = styled.div`
  ${({ isOpen }) =>
    isOpen
      ? css`
          width: var(--width-navbar);
        `
      : css`
          width: var(--width-navbar-collapse);
          transition-delay: var(--transition);
        `}
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--gap-1);
  transition-duration: var(--transition);
`
export const NavbarHeader = styled.div`
  display: flex;
  gap: var(--gap-2);
`
export const NavbarBody = styled.div`
  width: 100%;
  height: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;

  &:before {
    --width: 2px;
    content: '';
    position: absolute;
    top: 0;
    left: calc(var(--img-size-small) / 2 - var(--width));
    width: var(--width);
    height: 100%;
    background-color: var(--color-5);
  }
`
export const NavbarFooter = styled.div`
  display: flex;
  gap: var(--gap-2);
`
export const MainArea = styled.div`
  flex-grow: 1;
  width: 0;
  height: 100%;
  padding: calc(var(--shadow-width-inset) * 2);
  border-radius: var(--border-radius-2);
  background-color: var(--color-6-11);
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);

  ${Shadow2}
`
export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-1);
`
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-1);
`
export const MainBody = styled.div`
  width: 100%;
  flex-grow: 1;
`
