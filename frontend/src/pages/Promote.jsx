import ButtonLink from "../components/Button/ButtonLink";

export default function Promote() {
  return (
    <section className="promote_section">
      <article className="home_promote">
        <div className="container bg-grey">
          <p>Already have an account ?</p>
          <div className="flex">
            <ButtonLink href="/login" label="Login" />
            <span>or</span>
            <ButtonLink href="/signup" label="Sign up" />
          </div>
        </div>
        <img src="/promote.webp" alt="mewsic banner image" />
      </article>
      <article className="home_promote">
        <h2>
          Welcome to Mewsic, where your personal audio library comes to life!
          <br />
          Create, share, and explore your own musical universe with our music
          upload service
        </h2>
      </article>
      <article className="home_promote">
        <h2>
          Organize your sounds the way you want and access it from any connected
          device!
        </h2>
      </article>

      <div className="flex">
        <p>No more time to waste...</p>
        <ButtonLink href="/signup" label="Sign up" />
      </div>
    </section>
  );
}
