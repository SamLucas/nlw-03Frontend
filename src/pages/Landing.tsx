import React from 'react'
import {Link } from 'react-router-dom'

import Logo from '../images/logo.svg'
import { FiArrowRight} from 'react-icons/fi'

export default function App(){
  return (
    <div id="page-landing">
      <div className="content-wraper">
        <img src={Logo} alt="Happy"/>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Guaxupé</strong>
          <span>Minas Gerais</span>
        </div> 

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  )
}