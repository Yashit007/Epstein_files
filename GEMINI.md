# Votersaathi Project Context

## Project Overview
**Votersaathi** is a political platform developed to provide unbiased political content, news, and a social space for opinion expression. It is a Node.js-based web application that serves as a hub for political analysis, latest news, and political portfolios.

### Technologies
- **Backend:** Node.js with Express.js framework.
- **Frontend:** HTML5, CSS3, JavaScript.
- **Frameworks/Libraries:** 
  - **CSS:** Tailwind CSS, Bootstrap 5, W3.CSS.
  - **Database:** MongoDB (using the native `mongodb` driver).
- **Tooling:** `dotenv` for environment variables, `nodemon` for development.

### Architecture
- **Entry Point:** `server.js` handles routing and server initialization.
- **Static Assets:** Located in the `public/` directory, including the main entry page `Jenny.html`.
- **Database Logic:** Contained in `db/conneciton.js` (Note: the filename contains a typo).
- **API Endpoints:**
  - `/news`: Proxies an external news API.
  - `/testdb` & `/testdb_Uname`: Provide database connection testing and diagnostic logging.

---

## Building and Running

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB instance (local or Atlas)

### Installation
```bash
npm install
```

### Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### Running the Project
**Development Mode:**
```bash
npx nodemon server.js
```
**Production Mode:**
```bash
node server.js
```

---

## Development Conventions

### File Structure
- `server.js`: Main application logic and routing.
- `db/`: Database connection and configuration.
- `public/`: All frontend assets (HTML, CSS, JS, Images).
- `node_modules/`: Project dependencies.

### Coding Practices
- **ES Modules:** The project uses `import`/`export` syntax (`"type": "module"` in `package.json`).
- **Typo Awareness:** Be mindful of existing typos in filenames (e.g., `conneciton.js`) and database collections to maintain compatibility with existing logic.
- **Frontend Integration:** Uses a mix of utility-first (Tailwind) and component-based (Bootstrap) CSS frameworks alongside custom styles in `VoterSathi.css`.
- **Error Handling:** The database connection in `db/conneciton.js` uses try/catch blocks for graceful degradation.
