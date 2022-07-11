import textureList from '../../data/textureDataTrue'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export const getStaticProps = async () => {
  const data = textureList.textures
  return {
    props: { textures: data },
  }
}

const Textures = ({ textures }) => {
  return (
    <div className={styles.main}>
      <h1>List of Textures</h1>
      <div className={styles.moduleContainer}>
        {textures.map((texture) => (
          <Link href={`/texture/${texture.id}`} key={texture.id}>
            <div className={styles.listCard}>
              <div>
                <Image
                  className={styles.cardImage}
                  width="60px"
                  height="60px"
                  src={texture.image_url}
                  alt="texture preview"
                />
              </div>
              <h1>{texture.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Textures
