import React from 'react';

export default function Fruit({ fruit }) {
    return (
        <li>
            <strong>{fruit.name}</strong>
        </li>
    );
}
