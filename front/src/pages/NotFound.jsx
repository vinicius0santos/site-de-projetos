export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1>Erro 404</h1>
        <h2>Página Não Encontrada</h2>
        <p>A URL que você tentou acessar não existe.</p>
      </div>
    </div>
  );
}