import { User } from '../types';
import { saveUser, removeUser } from './storageService';

export const login = async (email: string, password: string): Promise<User> => {
  if (!email || !password) throw new Error('Preencha todos os campos');
  if (password.length < 6) throw new Error('Senha deve ter pelo menos 6 caracteres');

  const user: User = {
    id: Date.now().toString(),
    name: email.split('@')[0],
    email,
    age: 30,
  };

  await saveUser(user);
  return user;
};

export const logout = async (): Promise<void> => {
  await removeUser();
};