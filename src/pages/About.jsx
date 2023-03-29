import bugfixing from "../assets/bugfixing.jpg";
import styled from "styled-components";

const About = () => {
  return (
    <main>
      {/* <PageHero title="about" /> */}
      <Wrapper className="page section section-center">
        <img src={bugfixing} alt="about-image" />
        <article>
          <div className="title">
            <h2>about us</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus sint iure aspernatur non distinctio quasi ratione alias
            excepturi. Recusandae totam qui iure a perferendis natus voluptates
            hic unde minima illo voluptas porro, exercitationem aspernatur
            veniam nemo excepturi animi aliquid quia, eos sequi? Recusandae
            cupiditate architecto ipsum reiciendis. Sint, minus, esse officia
            quam consectetur qui quos obcaecati commodi aliquam harum, et
            assumenda adipisci sequi? Tenetur, labore? Ea delectus iste vel
            error ipsum reiciendis explicabo rerum, deserunt non officiis
            ducimus quae quisquam illum debitis earum esse. Inventore,
            perspiciatis ducimus eius assumenda, numquam quisquam cumque
            voluptatibus doloremque, eos a recusandae rem dolore commodi.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
    text-transform: normal;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default About;
