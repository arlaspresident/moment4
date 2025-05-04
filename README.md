# moment 4 – backend

detta är backend delen av moment 4 i kursen backend-baserad webbutveckling. det är en express baserad webbtjänst som hanterar registrering, inloggning och autentisering med hjälp av jwt 

## publicerad version

api: https://moment4-sw08.onrender.com

## funktionalitet

- registrering av användare (post /api/register)
- inloggning (post /api/login)
- lösenord hash: bcryptjs används för att kryptera lösenord innan de lagras i databasen
- vid lyckad inloggning returneras en jwt
- skyddad route (get /api/secret) som kräver giltig jwt i authorization-headern
- om token saknas eller är ogiltig returneras 401 unauthorized

## vad jag använde

- express
- sqlite3
- dotenv
- cors
- bcryptjs
- jsonwebtoken



