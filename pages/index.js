import { useState } from 'react';
import Head from 'next/head'
import { gql, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Header from '@components/Header'

export const getServerSideProps = async () => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    headers: {
      'x-api-key': process.env.REACT_APP_GRAPHQL_API_KEY
    },
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query {
        listFood {
          createdAt
          deleted
          author
          content
          deck
          modifiedAt
          slug
          title
          type
        }
      }  
    `
  });

  console.log(data)
  return { props: data }
}

export default function Home({listFood}) {
  console.log(listFood)
  const [hidden, setHidden] = useState('');
  const [title, setTitle] = useState('');
  const [rec, setRec] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const websiteTitle = 'techpod.recipes'

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="container">
      <Head>
        <title>{websiteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={websiteTitle} />

        {/* {!submitted && (
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
        )} */}

        {listFood.length > 0 && (
          <ul>
        {listFood.map(i => (
          <li key={i.slug}>{i.title}</li>
        ))}
          </ul>          
        )}

      </main>
    </div>
  )
}
