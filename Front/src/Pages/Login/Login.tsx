import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type FormData = {
  login: string;
  password: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  max-width: 552px;
  height: 290px;
  background: rgba(255, 255, 255, 0.15);
 
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  margin-top: -90px;
  padding: 38px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 30, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: black;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

const Title = styled.h2`
  font-size: 24px;

`;

const Input =  styled.input`
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
border-radius: 2rem;
width: 100%;

padding: 1rem;
border: none;
outline: none;
color: #3c354e;
font-size: 1rem;
font-weight: bold;
&:focus {
  display: inline-block;
  box-shadow: 0 0 0 0.2rem #b9abe0;
  backdrop-filter: blur(12rem);
  border-radius: 2rem;
}
&::placeholder {
  color: #b9abe099;
  font-weight: 100;
  font-size: 1rem;
}
`;

const Button = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
`;

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const json = await response.json();
  
      if (response.ok) {
        const token = json.token;
        localStorage.setItem('token', token);
        navigate('/dashboard');
        toast.success('Login realizado com sucesso!');
      } else {
        setError('Credenciais inválidas');
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
 }
  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Title>Login</Title>
        <Input type="text" {...register('login')} placeholder="Login" />
        <Input type="password" {...register('password')} placeholder="Senha" />
        <Button type="submit">Entrar</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
