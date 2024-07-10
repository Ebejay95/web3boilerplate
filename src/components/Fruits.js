import React from 'react';
import Fruit from './Fruit';

export default function Fruits({fruits}) {
    return (
        <ul>
            {fruits.map((fruit, index) => (
                <Fruit key={index} fruit={fruit} />
            ))}
        </ul>
    );
}