import React from 'react';
import './styles.css';

interface CardProps {
  title: string;
}

export default function Card({ title }: CardProps) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
    </div>
  );
}
