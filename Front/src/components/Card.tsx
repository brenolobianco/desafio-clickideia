import React from 'react';
import styled from 'styled-components';

interface CardProps {
  card: Card;
  onDelete: (id: number | string) => void;
  onMove: (card: Card, targetList: string) => void;
}

interface Card {
  id: number | string;
  titulo: string;
  conteudo: string;
  lista: string;
}

const Container = styled.div`
  width: 300px;
  background-color: #fff5ff;
  box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin-top: 0;
  font-size: 18px;
  color: #333333;
`;

const Content = styled.p`
  font-size: 14px;
  color: #666666;
`;

const Button = styled.button`
  margin-top: 8px;
  padding: 8px 12px;
  border: none;
  background-color: #eeeeee;
  color: #333333;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dddddd;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Card: React.FC<CardProps> = ({ card, onDelete, onMove }) => {
  const handleDelete = () => {
    onDelete(card.id);
  };

  const handleMoveBack = () => {
    const previousList = getPreviousList(card.lista);
    onMove(card, previousList);
  };

  const handleMoveForward = () => {
    const nextList = getNextList(card.lista);
    onMove(card, nextList);
  };

  const getPreviousList = (list: string) => {
    const lists = ['ToDo', 'Doing', 'Done'];
    const currentIndex = lists.indexOf(list);
    return lists[currentIndex - 1] || '';
  };

  const hasNextList = (list: string) => {
    const lists = ['ToDo', 'Doing', 'Done'];
    const currentIndex = lists.indexOf(list);
    return currentIndex < lists.length - 1;
  };

  const getNextList = (list: string) => {
    const lists = ['ToDo', 'Doing', 'Done'];
    const currentIndex = lists.indexOf(list);
    return lists[currentIndex + 1] || '';
  };

  return (
    <Container>
      <Title>{card.titulo}</Title>
      <Content>Des{card.conteudo}</Content>
      <Button onClick={handleDelete}>Excluir</Button>
      <Button onClick={handleMoveBack} disabled={!getPreviousList(card.lista)}>
        Voltar
      </Button>
      <Button onClick={handleMoveForward} disabled={!hasNextList(card.lista)}>
        Avançar
      </Button>
    </Container>
  );
};

export default Card;
