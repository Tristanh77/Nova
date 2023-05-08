import React from "react";
import { Container, Header } from 'semantic-ui-react';
import '../Header/Header.css'

export default function PageHeader() {
  return (
        <div id='headdiv'>
            <Header id ='head' as="h2"><header>Header Goes Here</header></Header>
        </div>
      );
}

