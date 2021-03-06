import React from 'react';
import styled from 'styled-components';
import {
  space,
  layout,
  color,
  border,
  typography,
  variant,
  shadow,
  flexbox,
} from 'styled-system';
import { useLinkProps } from 'react-navi';

import theme from '../../theme';

const variants = {
  variants: {
    primary: {
      color: 'black',
      bg: 'primary',
      border: 0,
      '&:not(:disabled):hover': {
        bg: 'transparent',
        color: theme.colors.primary,
      },
      '&:not(:disabled):focus': {
        bg: 'transparent',
        color: theme.colors.primary,
      },
    },
    secondary: {
      color: 'black',
      bg: 'white',
      border: 0,
      borderColor: 'white',
      '&:not(:disabled):hover': {
        bg: 'transparent',
        color: 'white',
      },
      '&:not(:disabled):focus': {
        bg: 'transparent',
        color: 'white',
      },
    },
    danger: {
      color: 'black',
      border: 0,
      borderColor: 'red',
      bg: 'red',
      '&:not(:disabled):hover': {
        bg: 'transparent',
        color: 'red',
      },
      '&:not(:disabled):focus': {
        bg: 'transparent',
        color: 'red',
      },
    },
    text: {
      color: 'white',
      border: 'none',
      bg: 'transparent',
      opacity: 0.8,
      padding: 0,
      '&:not(:disabled):hover': {
        opacity: 1,
      },
      '&:not(:disabled):focus': {
        opacity: 1,
      },
    },
    icon: {
      bg: 'transparent',
      border: 'none',
      padding: 0,
    },
  },
};

export const Btn = styled.button`
appearance: none;
border: none;
outline: none;
font-family: inherit;
cursor: pointer;
transition: ${props => props.theme.transitions[0]};
transform: translateZ(0);
backface-visibility: hidden;
white-space: nowrap;
font-size: 12px;
padding: 10px 12px;
text-transform: uppercase;
text-renderering: geometricPercision;

&:disabled {
  cursor: not-allowed;
  opacity: .3;
}

&:focus {
  outline: none;
}

${variant(variants)}

${space} ${layout} ${typography} ${color} ${border} ${shadow} ${flexbox}
`;
Btn.defaultProps = {
  variant: 'primary',
  fontWeight: 2,
  borderRadius: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const LinkButton = styled(Btn).attrs({
  as: 'a',
})`
  text-decoration: none;
`;

const Button = ({ href, title, onClick, ...rest }) => {
  if (href) {
    return (
      <LinkButton {...useLinkProps({ href, onClick })} {...rest}>
        {title}
      </LinkButton>
    );
  }

  return (
    <Btn onClick={onClick} {...rest}>
      {title}
    </Btn>
  );
};

Button.defaultProps = {
  href: null,
  title: '',
};

export default Button;
