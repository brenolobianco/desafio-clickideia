import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MdAdd } from 'react-icons/md';

interface NewCardProps {
  onCreate: (newCard: Card) => void;
}

interface Card {
  id: number | string;
  titulo: string;
  conteudo: string;
  lista: string;
}

const Container = styled.div`
   background-color: #f5f5f5;
  border-radius: 4px;
  padding: 25px;
  margin-bottom: 16px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 90%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const Button = styled.button`
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
`;

const NewCard: React.FC<NewCardProps> = ({ onCreate }) => {
  const [newCard, setNewCard] = useState<Card>({
    id: uuidv4(),
    titulo: '',
    conteudo: '',
    lista: 'ToDo',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewCard(prevCard => ({ ...prevCard, [name]: value }));
  };

  const handleCreate = () => {
    onCreate(newCard);
    setNewCard({ id: uuidv4(), titulo: '', conteudo: '', lista: 'ToDo' });
  };

  return (
    <Container>
      <Input
        type="text"
        name="titulo"
        placeholder="Título"
        value={newCard.titulo}
        onChange={handleInputChange}
      />
      <TextArea
        name="conteudo"
        placeholder="Conteúdo"
        value={newCard.conteudo}
        onChange={handleInputChange}
      />
      <Button onClick={handleCreate}><MdAdd /></Button>
    </Container>
  );
};

export default NewCard;
