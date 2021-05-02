import { useState } from 'react';
import Head from 'next/head'
import Header from '@components/Header'

function encode(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
}

export default function Home() {
  const [hidden, setHidden] = useState('');
  const [title, setTitle] = useState('');
  const [rec, setRec] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const websiteTitle = 'techpod.recipes'

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = encode({
      hidden,
      title,
      rec,
      body
    })

    console.log(data)

    fetch("/api/add", {
      method: "POST",
      body: encode({
        hidden,
        title,
        rec,
        body
      })
    })
      .then((data) => data.json())
      .then(val => {
        console.log(val)
        setSubmitted(true)
      })
  }

  return (
    <div className="container">
      <Head>
        <title>{websiteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={websiteTitle} />

        {!submitted && (
        <form name="contact" onSubmit={handleSubmit}>
          <input type="hidden" name="name" value={hidden} onChange={({ target: { value }}) => setHidden(value)} />
          <p>
            <label>Your Name:
              <input
                type="text"
                name="title"
                value={title}
                onChange={({target: { value }}) => setTitle(value)}
              />
            </label>   
          </p>
          <p>
            <label>Recommended by: <input type="text" name="rec" value={rec} onChange={({ target: { value }}) => setRec(value)} /></label>
          </p>
          <p>
            <label>Body: <textarea name="body" value={body} onChange={({ target: { value }}) => setBody(value)}></textarea></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
        )}
        {submitted && (
          <div>Form Sent</div>
        )}
      </main>
    </div>
  )
}
