
# 📘 Guia Básico do Prisma

## 1️⃣ Instalação do Prisma
Primeiro, instale o Prisma no seu projeto. Caso ainda não tenha, execute o comando:

```bash
npm install prisma --save-dev
```

Adicione o Prisma Client, que será usado para interagir com o banco de dados:

```bash
npm install @prisma/client
```

Inicialize o Prisma no projeto:

```bash
npx prisma init
```

Isso criará os arquivos:
- **`prisma/schema.prisma`** (onde você define os modelos do banco).
- **`.env`** (onde configuramos o acesso ao banco de dados).

---

## 2️⃣ Configuração do Banco de Dados
No arquivo `.env`, configure a URL de conexão ao banco. Por exemplo, para um banco SQLite:

```env
DATABASE_URL="file:./dev.db"
```

Ou para PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

---

## 3️⃣ Definindo os Modelos
No arquivo `prisma/schema.prisma`, você define os modelos. Aqui está um exemplo básico:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

---

## 4️⃣ Gerando as Tabelas no Banco
Após configurar os modelos, execute os seguintes comandos:

1. **Formatar o arquivo `schema.prisma`:**
   ```bash
   npx prisma format
   ```

2. **Criar a migration:**
   Este comando cria um histórico das mudanças no banco.
   ```bash
   npx prisma migrate dev --name nome_da_migration
   ```
   Exemplo: 
   ```bash
   npx prisma migrate dev --name create_user_table
   ```

3. **Prisma Client:**
   Após gerar a migration, atualize o Prisma Client:
   ```bash
   npx prisma generate
   ```

Agora, as tabelas estão criadas e você pode começar a usar!

---

## 5️⃣ Comandos Úteis do Prisma
Aqui está uma lista de comandos comuns e para que servem:

| Comando                              | Função                                                                 |
|--------------------------------------|------------------------------------------------------------------------|
| `npx prisma init`                    | Inicializa o Prisma no projeto.                                       |
| `npx prisma format`                  | Formata o arquivo `schema.prisma`.                                    |
| `npx prisma migrate dev --name ...`  | Cria ou atualiza tabelas no banco com base no `schema.prisma`.         |
| `npx prisma generate`                | Gera o Prisma Client para interagir com o banco no código.            |
| `npx prisma studio`                  | Abre uma interface visual para explorar e editar dados no banco.      |

---

## 6️⃣ Consultas no Prisma Client
Depois de configurar o banco, você pode usar o Prisma Client para realizar operações no banco. Exemplos:

**Criar um registro:**
```typescript
const newUser = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
  },
});
console.log(newUser);
```

**Buscar todos os registros:**
```typescript
const users = await prisma.user.findMany();
console.log(users);
```

**Buscar um registro por ID:**
```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
});
console.log(user);
```

**Atualizar um registro:**
```typescript
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { name: "Jane Doe" },
});
console.log(updatedUser);
```

**Deletar um registro:**
```typescript
const deletedUser = await prisma.user.delete({
  where: { id: 1 },
});
console.log(deletedUser);
```

---

## 7️⃣ Dicas Importantes
- Sempre use `npx prisma format` antes de criar migrations, para garantir que o arquivo `schema.prisma` esteja correto.
- Use `npx prisma studio` para explorar os dados visualmente durante o desenvolvimento.
- Configure corretamente sua `DATABASE_URL` no `.env` para evitar problemas de conexão.

---

## Exemplo Completo
Aqui está um exemplo de um fluxo básico com o Prisma:

1. **Definir o modelo no `schema.prisma`:**
   ```prisma
   model Post {
     id        Int      @id @default(autoincrement())
     title     String
     content   String?
     createdAt DateTime @default(now())
   }
   ```

2. **Criar a migration:**
   ```bash
   npx prisma migrate dev --name create_post_table
   ```

3. **Inserir dados no código:**
   ```typescript
   const newPost = await prisma.post.create({
     data: {
       title: "Meu Primeiro Post",
       content: "Este é o conteúdo do post",
     },
   });
   console.log(newPost);
   ```

4. **Visualizar os dados no Prisma Studio:**
   ```bash
   npx prisma studio
   ```

---

Com este guia, você tem um ponto de partida sólido para usar o Prisma no seu projeto.
