import styled from '@emotion/styled';
import React from 'react'

type CardProps = {
  title: string;
  content: string;
}

function Card({ title, content }: CardProps) {
  return (
    <CardContainer>
      <h3>{title}</h3>
      <p>{content}</p>
    </CardContainer>
  )
}

export default Card

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border-radius: 1rem;
  padding: clamp(1rem, 2vw, 2rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: clamp(1rem, 2vw, 1.5rem);
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  p {
    font-size: clamp(0.9rem, 1.5vw, 1rem);
  }
`;

/*
@
background: ${({ theme }) => theme.colors.card};
==>
background: ${function(props) {
  return props.theme.colors.card;
}};
이것을 props.theme 이 아니라 props 에서 theme만 꺼내 쓰고싶으면,
background: ${({ theme }) => theme.colors.card};

*/