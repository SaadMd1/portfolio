import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'YourName Design Studio'
  const subtitle = searchParams.get('subtitle') || 'Packaging Design Excellence'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom right, #f8f9fa 0%, #e9ecef 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '80px',
            width: '100%',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#0a0a0a',
              lineHeight: 1.2,
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#666',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              paddingTop: '60px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0a0a0a',
              }}
            >
              YourName Design Studio
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

