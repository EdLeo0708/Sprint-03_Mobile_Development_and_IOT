# H-bit — Mobile Health Monitoring

Este projeto é uma aplicação mobile foi desenvolvido com o objetivo de oferecer uma interface para o monitoramento de dados de saúde, permitindo que os usuários acompanhem métricas vitais de forma simples e intuitiva.

## Tecnologias Utilizadas

- **React Native** 
- **Expo** 
- **TypeScript** 
- **React Navigation** 
- **AsyncStorage** 
- **DALL-E 3 / AI Tools** 

## Funcionalidades

- **Autenticação completa:** Tela de login funcional com validação e persistência de sessão.
- **Dashboard de Saúde:** Resumo dos últimos dados registrados (Frequência Cardíaca, Passos, Água, Humor).
- **Registro de Dados (IoT Simulation):** Interface para entrada de métricas de saúde com validação em tempo real.
- **Histórico de Registros:** Visualização em lista (FlatList) de todos os dados salvos localmente.
- **Perfil do Usuário:** Gerenciamento de conta com botão de Sair e opção de Resetar Histórico.
- **Design Premium:** Interface inspirada na identidade visual da H-bit, com foco em usabilidade e estética moderna.

## Estrutura do Projeto

```text
H-bit/
├── assets/             # Imagens, logotipos e ícones
├── src/
│   ├── components/     # Componentes reutilizáveis (HealthCard, InputForm, Loading)
│   ├── screens/        # Telas da aplicação (Login, Home, Track, Profile)
│   ├── services/       # Lógica de negócio (Autenticação e Armazenamento Local)
│   ├── navigation/     # Configuração das abas e rotas
│   ├── theme/          # Sistema de cores e estilos globais
│   ├── types/          # Definições de interfaces TypeScript
│   └── enums/          # Constantes e Enums (MoodLevels, StorageKeys, Screens)
├── App.tsx             # Ponto de entrada do aplicativo
└── README.md           # Documentação do projeto
```

## Como Executar

### Pré-requisitos
- **Node.js** instalado.
- Aplicativo Expo Go no celular ou um emulador configurado.

### Passos
1. **Instalar dependências:**
   npm install

2. **Iniciar o projeto:**
   npx expo start

3. Escaneie o QR Code com o aplicativo Expo Go para visualizar no celular

## Acesso(Teste)

Para facilitar a avaliação, utilize o login abaixo:

**E-mail:** `usuario@teste.com`
**Senha:** `123456` 

---

Disciplina: Mobile Development and IoT  
Sprint: 3  
Instituição: FIAP  
Ano: 2024
