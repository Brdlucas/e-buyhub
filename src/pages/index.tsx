import React, { FormEventHandler, useRef } from 'react'
import Image from 'next/image'
import { newsLetters } from '../../utils/types'
import { useRouter } from "next/router"
import Link from 'next/link'


export default function Index({ props }: any) {

  const router = useRouter()

  const email = useRef<HTMLInputElement>(null)


  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    let letter: newsLetters = { email: "" };
    if (null !== email.current) {
      letter = { email: email.current.value }
    }

    await fetch('http://localhost:3000/api/newsletter', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(letter),
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error)
      })
    router.push("/")
  }


  return (
    <section className="mt-5 ">
      <div className="bg-repeat-x bg-center bg-[url('/img/ciseaux.jpg')]">
      </div>
      <div className='bg-repeat-x bg-center bg-cover bg-[url("/img/backgroundimg.jpg")] m-auto pb-5  max-md:h-[1200px] max-md:mb-5 w-[80%]  border-2 border-black max-md:flex max-md:flex-col rounded-[50px]'>
        <div className='lg:flex md:place-content-stretch max-md:h-[1100px] mb-5'>
          {props.slice(-3).map((product: any, key: any) => (
            <div key={key} className=' bg-black/70 text-white w-[250px] m-auto mt-5 h-[350px] rounded-[25px] border-2 border-neutral-500'>
              <Image className='m-auto mt-2' src='/img/sch2.png' height={0} width={150} alt='sch2.png' />
              <hr className='mt-2 border border-neutral-200' />
              <p className='ml-1 font-bold'>{product.name}</p>
              <p className='ml-2'>{product.description}</p>
              <p className=' m-auto w-[50%] text-[20px] text-center'>{product.price}€</p>
              <div className='text-center mt-2'>
                <input type="submit" value="En savoir plus" className='hover:bg-purple-800 text-center bg-purple-900 text-white rounded-[30px] h-[50px] w-[70%] m-auto cursor-pointer' />
              </div>
            </div>
          ))}
        </div>
        <Link href={"/article"} ><p className='rounded-[50px] bg-purple-900 text-center pb-3 w-[80px] mb-1 border border-black hover:bg-purple-800 text-white m-auto text-6xl cursor-pointer'>+</p></Link>
      </div>
      <p className=' w-[70%] m-auto mt-5 leading-9 justify-center bg-neutral-100 p-5 rounded-[30px] font-medium'>
        Découvrez une expérience exclusive, rejoignez notre communauté et ne manquez plus jamais les dernières actualités, offres spéciales et contenus
        captivants ! Inscrivez-vous dès maintenant à notre newsletter et plongez dans un monde d&#39;informations passionnantes.

        Notre newsletter est conçue spécialement pour les esprits curieux comme le vôtre. Vous recevrez régulièrement des articles soigneusement sélectionnés,
        des conseils pratiques, des tutoriels, des analyses approfondies et bien plus encore. Que vous soyez passionné par les voyages, la technologie, la mode,
        la santé, ou tout autre domaine, nous avons quelque chose de fascinant à vous offrir.

        En vous inscrivant, vous rejoindrez une communauté dynamique composée de personnes partageant les mêmes intérêts et d experts passionnés. Vous aurez
        également l opportunité de participer à des discussions enrichissantes, de poser des questions directement aux experts et de partager vos propres connaissances.

        Mais ce n est pas tout ! En tant qu abonné privilégié, vous bénéficierez d avantages exclusifs tels que des réductions spéciales, des invitations à des
        événements VIP, des concours passionnants et bien d autres surprises encore. Nous souhaitons récompenser votre engagement et votre fidélité en vous offrant des
        avantages uniques.

        Rejoignez-nous dès maintenant en remplissant simplement le formulaire d inscription ci-dessous. C est rapide, facile et totalement gratuit ! Ne manquez
        pas cette occasion de rester informé(e) et de vous connecter à une communauté passionnée.

        Inscrivez-vous à notre newsletter dès aujourd hui et laissez-nous vous emmener dans un voyage extraordinaire au cœur de l information. Soyez au courant
        de tout ce qui compte pour vous.
      </p>
      <form onSubmit={handleSubmit} className='text-center'>
        <input name="email" id="email" type="email" placeholder="email" ref={email} className='bg-purple-950 m-auto text-white pl-3 w-[50%] mt-5 max-md:w-[95%] h-[50px] mb-5 rounded-[20px]' required />
        <input type="submit" value="Envoyez" className='font-bold mb-5 bg-purple-900 ml-5 w-[10%] max-md:w-[50%] h-[50px] text-white rounded-[30px] hover:bg-purple-800 cursor-pointer' />
      </form>
    </section>

  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products')
  const json = await res.json()
  return { props: json.data }
}



