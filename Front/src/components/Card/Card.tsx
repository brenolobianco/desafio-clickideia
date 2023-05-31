import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete, MdArrowBack, MdArrowForward } from 'react-icons/md';

interface CardProps {
  card: Card;
  onDelete: (id: number | string) => void;
  onMove: (card: Card, targetList: string) => void;
  onEdit: (editedCard: Card) => void;
}

interface Card {
  id: number | string;
  titulo: string;
  conteudo: string;
  lista: string;
}
interface CardProps {
  isDragging?: boolean;
}

const Container = styled.div`
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
  height: 160px;
  width: 220px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;justify-content:center;
  input{  width: 100%;
  height: 2rem;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;}
 textarea{  width: 100%;
  height: 2rem;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;}
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const ButtonContainer = styled.div`
  display: flex;
`;
const Button = styled.button`
  background-color: #555;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;


const Title = styled.h3`
  font-size: 19px;
  font-weight: bold;
  
 
`;

const Content = styled.p`
  
  cursor: pointer;width:90%;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;

`;

const Card: React.FC<CardProps> = ({ card, onDelete, onMove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState<Card>({
    id: '',
    titulo: '',
    conteudo: '',
    lista: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedCard(card);
  };

  const saveEditedCard = () => {
    onEdit(editedCard);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
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
      {isEditing ? (
        <>
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={editedCard.titulo}
            onChange={handleInputChange}
          />
          <textarea
            name="conteudo"
            placeholder="Conteúdo"
            value={editedCard.conteudo}
            onChange={handleInputChange}
          />
          <ButtonContainer>
          <Button onClick={saveEditedCard}>Salvar</Button>
          <Button onClick={cancelEdit}>Cancelar</Button></ButtonContainer>
        </>
      ) : (
        <>
          <Title onClick={handleEdit}>{card.titulo}</Title>
          <Content onClick={handleEdit}>{card.conteudo}</Content>
          <ButtonContainer>
          <Button onClick={handleEdit}>
            <MdEdit />
          </Button>
          <Button onClick={handleDelete}>
            <MdDelete />
          </Button>
          <Button onClick={handleMoveBack} disabled={!getPreviousList(card.lista)}>
            <MdArrowBack />
          </Button>
          <Button onClick={handleMoveForward} disabled={!hasNextList(card.lista)}>
            <MdArrowForward />
          </Button>
        </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default Card;
