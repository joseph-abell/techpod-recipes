import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const title = 'techpod.recipes'
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={title} />

        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="title" value="contact" />
          <p>
            <label>Your Name: <input type="text" name="name" /></label>   
          </p>
          <p>
            <label>Your Email: <input type="email" name="email" /></label>
          </p>
          <p>
            <label>Your Role: <select name="role[]" multiple>
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select></label>
          </p>
          <p>
            <label>Message: <textarea name="message"></textarea></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </main>

      <Footer />
    </div>
  )
}
