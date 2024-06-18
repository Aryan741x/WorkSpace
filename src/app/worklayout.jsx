'use client';
import React, { useState } from 'react';
import Works from '../components/work/work';

const ClientComponent = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <Works/>
    </div>
  );
};

export default ClientComponent;
