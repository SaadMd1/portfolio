export default function AdminPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.href = '/admin/index.html'`,
        }}
      />
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Redirecting to admin panel...</p>
        <p>
          If not redirected, <a href="/admin/index.html">click here</a>
        </p>
      </div>
    </>
  )
}


