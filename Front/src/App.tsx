import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import marked from 'marked';
import DOMPurify from 'dompurify';
import Card from './components/Card';
import NewCard from './components/NewCard';

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid white;
  margin: 20px;
`;

const ColumnContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 20px;
  border: 1px solid blue;
`;

const ColumnTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const EmptyMessage = styled.p`
  color: #999999;
  font-style: italic;
`;

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  const createCard = async (newCard: Card) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/cards', newCard);
      const createdCard = response.data;
      setCards(prevCards => [...prevCards, createdCard]);
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  const updateCard = async (updatedCard: Card) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/cards/${updatedCard.id}`, updatedCard);
      setCards(prevCards => {
        const updatedCards = prevCards.map(card => (card.id === updatedCard.id ? updatedCard : card));
        return updatedCards;
      });
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  const deleteCard = async (id: number | string) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/cards/${id}`);
      fetchCards();
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  const moveCard = async (card: Card, targetList: string) => {
    const targetIndex = cards.findIndex(c => c.id === card.id);
    const updatedCard = { ...card, lista: targetList };
    const updatedCards = [...cards];
    updatedCards.splice(targetIndex, 1, updatedCard);

    try {
      await axios.put(`http://127.0.0.1:5000/api/cards/${card.id}`, updatedCard);
      setCards(updatedCards);
    } catch (error) {
      console.error('Failed to move card:', error);
    }
  };

  const renderCards = (list: string) => {
    const filteredCards = cards.filter(card => card.lista === list);

    if (filteredCards.length === 0) {
      return <EmptyMessage>No cards in this column</EmptyMessage>;
    }

    return filteredCards.map(card => (
      <Card
        key={card.id}
        card={card}
        onDelete={deleteCard}
        onMove={moveCard}
        // onEdit={updateCard}
        // markdownToHtml={convertMarkdownToHtml}
      />
    ));
  };

  // const convertMarkdownToHtml = (markdown: string) => {
  //   const sanitizedHtml = DOMPurify.sanitize(marked(markdown));
  //   return { __html: sanitizedHtml };
  // };

  return (
    <AppContainer>
      <ColumnContainer>
        <ColumnTitle>To Do</ColumnTitle>
        {renderCards('ToDo')}
      </ColumnContainer>
      <ColumnContainer>
        <ColumnTitle>Doing</ColumnTitle>
        {renderCards('Doing')}
      </ColumnContainer>
      <ColumnContainer>
        <ColumnTitle>Done</ColumnTitle>
        {renderCards('Done')}
      </ColumnContainer>
      <div>
        <NewCard onCreate={createCard} />
      </div>
    </AppContainer>
  );
};

export default App;
