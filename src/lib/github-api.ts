// GitHub API helper for committing files directly
export async function commitToGitHub({
  path,
  content,
  message,
}: {
  path: string
  content: string
  message: string
}) {
  const token = process.env.GITHUB_TOKEN
  const repo = 'SaadMd1/portfolio'
  const branch = 'main'

  if (!token) {
    throw new Error('GitHub token not configured')
  }

  try {
    // Get current file SHA (if exists)
    const getFileUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`
    const getResponse = await fetch(getFileUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    let sha: string | undefined

    if (getResponse.ok) {
      const fileData = await getResponse.json()
      sha = fileData.sha
    }

    // Update or create file
    const updateUrl = `https://api.github.com/repos/${repo}/contents/${path}`
    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
        branch,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to commit to GitHub')
    }

    return await response.json()
  } catch (error) {
    console.error('GitHub API error:', error)
    throw error
  }
}

export async function getFileFromGitHub(path: string): Promise<string> {
  const token = process.env.GITHUB_TOKEN
  const repo = 'SaadMd1/portfolio'
  const branch = 'main'

  if (!token) {
    throw new Error('GitHub token not configured')
  }

  const url = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('File not found')
  }

  const data = await response.json()
  return Buffer.from(data.content, 'base64').toString('utf-8')
}

